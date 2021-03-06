import React, { memo, useContext, useEffect, useState } from 'react';
import { IconButton } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import { useHistory } from 'react-router';

import { SocketContext } from 'utils/SocketProvider';

import User from './User';
import { UserType } from './User/UserTypes';

import './Users.scss';

const Users = () => {
  const history = useHistory();
  const socket = useContext(SocketContext);

  const [users, setUsers] = useState<UserType[]>([]);

  const handleLogout = () => {
    localStorage.clear();
    socket?.close();
    history.replace('/login');
  };

  const handleFetchUsers = (resp: UserType[]) => {
    setUsers(
      resp.filter((usr) => usr.id !== Number.parseInt(localStorage.getItem('userId') || '0'))
    );
  };

  // const handleChangeStatus = useCallback((resp) => {
  //   console.log(resp);
  //   setUsers((lastUsers) =>
  //     lastUsers.map((user) =>
  //       user.id !== resp.id
  //         ? {
  //             ...user,
  //             status: resp.status,
  //           }
  //         : user
  //     )
  //   );
  // }, []);

  useEffect(() => {
    socket?.on('getUsers', handleFetchUsers);
    return () => {
      // socket?.off('getUsers', handleFetchUsers);
    };
  }, [socket]);

  return (
    <div className="Users">
      <header className="Users__header">
        <IconButton className="header__logout" onClick={handleLogout}>
          <ExitToApp />
        </IconButton>
        <h2>Użytkownicy</h2>
      </header>
      {users?.map((user: UserType) => {
        return <User user={user} key={user.id} />;
      })}
    </div>
  );
};

export default memo(Users);
