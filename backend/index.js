import express from "express";
import pg from "pg";
import { Server } from "socket.io";
import http from "http";
import bcrypt from "bcrypt";
import socketioAuth from "socketio-auth";
import jwt from "jsonwebtoken";

const server = http.createServer();
server.listen(8000);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (client) => {
  client.on("disconnect", () => console.log("closed connection"));
});

const pool = new pg.Pool({
  connectionString:
    "postgresql://invigilationappadmin:2DVetWjJg5st@localhost:5432/invigilationapp",
});

// 260c9735448fb4ab63a1e97a9e613b6e85f34af10142952945ddd997a5dfc497fa42651ff0f8966f48c4360c296bdf5642ca13cd8f92e9fc24bdab4cc9069fa0

const authenticate = async (client, data, callback) => {
  const { username, email, password, register } = data;

  try {
    if (register) {
      pool
        .query(`SELECT * from users where email = '${email}'`)
        .then((res) => {
          if (res.rows.length == 0) {
            bcrypt.hash(password, 10, (err, hash) => {
              console.log(hash);
              pool
                .query(
                  `INSERT INTO users (username, email, password) values('${username}', '${email}', '${hash}') RETURNING *`
                )
                .then((res) => {
                  console.log(res);
                  // const token = jwt.sign()
                  callback(null, true);
                })
                .catch((err) => console.log(err));
            });
          } else {
            callback("User already exists");
          }
        })
        .catch((err) => console.log(err));
    } else {
      pool
        .query(`SELECT password from users where email = ${email}`)
        .then((res) => {
          console.log(res.rows);
          // bcrypt.compare(password, )
        })
        .catch((err) => {
          console.log(err);
        });
      callback(null, true);
    }
  } catch (err) {
    console.log(err);
    callback(err);
  }
};

const postAuthenticate = (client) => {
  client.on("addActivity", () => {
    console.log("addActivity");
  });
  client.on("updateStatusState", () => {
    console.log("updateStatus");
  });
  client.on("updateStatusDate", () => {
    console.log("updateStatusDate");
  });
  client.on("fetchUsers", () => {
    console.log("fetchUsers");
  });
  client.on("fetchActivities", () => {
    console.log("fetchActivites");
  });
};

socketioAuth(io, { authenticate, postAuthenticate, timeout: "none" });

// pool
//   .query({
//     text: "SELECT * from users where id != $1",
//     name: "get users",
//     values: [1],
//   })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// pool
//   .query("SELECT * from statuses")
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// pool
//   .query({
//     text: "SELECT * from activities where user_id = $1 order by date desc limit 20",
//     name: "get activities",
//     values: [1],
//   })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// pool
//   .query(
//     `INSERT INTO statuses (user_id, status, interaction_time) values (1, 'ACTIVE', '${new Date().toISOString()}')`
//   )
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// pool
//   .query({
//     text: "INSERT INTO activities(user_id, event, page, date) values($1, $2, $3, $4)",
//     name: "insert new activity",
//     values: [1, "event", "main", new Date()],
//   })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// pool.query({
//   text: "UPDATE statuses SET status = $1 where user_id = $2",
//   name: "Update status",
//   values: ["OFFLINE", 1],
// });

// const app = express();

// app.get("/", (req, res) => {
// res.send("hello");
// });

// app.listen(8000);
