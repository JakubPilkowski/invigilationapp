import express from "express";
import pg from "pg";
import { Server } from "socket.io";
import http from "http";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secretToken } from "./secretToken.js";
import cors from "cors";

const server = http.createServer();
server.listen(8000);

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8080",
  })
);
app.use("/public", express.static("public"));

app.post("/register", (req, response) => {
  const { username, email, password } = req.body;

  pool
    .query(`SELECT * from users where email = '${email}'`)
    .then((res) => {
      if (res.rows.length == 0) {
        bcrypt.hash(password, 10, (err, hash) => {
          const rand = Math.floor(Math.random() * 3 + 1);
          const avatar = `/public/avatar${rand}.png`;
          pool
            .query(
              `INSERT INTO users (username, email, password, avatar, status, last_event_date) values('${username}', '${email}', '${hash}', '${avatar}', 'Aktywny', '${new Date().toISOString()}') RETURNING *`
            )
            .then((res) => {
              const user = res.rows[0];
              const token = jwt.sign(user.id, secretToken);
              response.send({
                token,
                id: user.id,
                email: user.email,
              });
            })
            .catch((err) => console.log(err));
        });
      } else {
        callback("User already exists");
      }
    })
    .catch((err) => console.log(err));
});

app.post("/login", (req, response) => {
  const { email, password } = req.body;
  pool
    .query(`SELECT * from users where email = '${email}'`)
    .then((res) => {
      const user = res.rows[0];
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          const token = jwt.sign(user.id, secretToken);
          response.send({
            token,
            id: user.id,
            email: user.email,
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

app.listen(3000);

const pool = new pg.Pool({
  connectionString:
    "postgresql://invigilationappadmin:2DVetWjJg5st@localhost:5432/invigilationapp",
});

io.on("connection", (client) => {
  client.on("disconnecting", () => {
    const token = client.handshake.auth.token;
    if (token) {
      const id = jwt.decode(token);
      if (id) {
        pool
          .query(`UPDATE users SET status = 'Offline' where id = ${id}`)
          .then((res) => {
            pool
              .query(`SELECT * from users`)
              .then((res) => {
                io.emit(
                  "getUsers",
                  res.rows.map((row) => ({
                    id: row.id,
                    username: row.username,
                    email: row.email,
                    avatar: row.avatar,
                    status: row.status,
                    lastEventDate: row.last_event_date,
                  }))
                );
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      }
    }
  });

  client.on("addActivity", ({ userId, event, page, eventDate }) => {
    pool
      .query(
        `INSERT INTO activities(user_id, event, page, date) values(${userId}, '${event}', '${page}', '${eventDate}') RETURNING *`
      )
      .then((res) => {
        pool
          .query(
            `SELECT * from activities where user_id = ${userId} order by date desc limit 20`
          )
          .then((res) => {
            io.to(userId.toString()).emit("getActivities", { rows: res.rows });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
  client.on("updateStatus", ({ userId, date }) => {
    pool
      .query(
        `UPDATE users SET status = 'Aktywny', last_event_date = '${date}' where id = ${userId}`
      )
      .then((res) => {
        pool
          .query(`SELECT * from users`)
          .then((res) => {
            io.emit(
              "getUsers",
              res.rows.map((row) => ({
                id: row.id,
                username: row.username,
                email: row.email,
                avatar: row.avatar,
                status: row.status,
                lastEventDate: row.last_event_date,
              }))
            );
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
  client.on("fetchActivities", (id) => {
    client.join(id.toString());
    pool
      .query(
        `SELECT * from activities where user_id = ${id} order by date desc limit 20`
      )
      .then((res) => {
        client.emit("getActivities", { client: client.id, rows: res.rows });
      })
      .catch((err) => console.log(err));
  });

  client.on("leaveActivities", ({ id, client: lastClient }) => {
    const activitySocket = io.sockets.sockets.get(lastClient);
    activitySocket.leave(id.toString());
  });
});
