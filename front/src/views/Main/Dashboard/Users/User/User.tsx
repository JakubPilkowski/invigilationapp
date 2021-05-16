import React, { memo, useEffect, useMemo, useState } from 'react';
import { ButtonBase } from '@material-ui/core';
import classNames from 'classnames';

import useToggle from 'hooks/useToggle';

import Activities from './Activities';
import { UserType } from './UserTypes';

import getDynamicStatus from 'utils/getDynamicStatus';

import './User.scss';

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomBorderRadius() {
  const top = `${getRandomInt(10, 30)}px`;
  const right = `${getRandomInt(10, 30)}px`;
  const bottom = `${getRandomInt(10, 30)}px`;
  const left = `${getRandomInt(10, 30)}px`;

  return {
    borderRadius: `${top} ${right} ${bottom} ${left}`,
  };
}

const User = ({ user: { id, username, email, avatar, status } }: { user: UserType }) => {
  const [isExpanded, toggleExpand] = useToggle(false);
  const [dynamicStatus, setDynamicStatus] = useState('');
  const borderStyle = useMemo(getRandomBorderRadius, []);
  const classes = classNames('User', { 'User--active': isExpanded });

  const imgSrc =
    avatar !== '' ? `http://localhost:8000/${avatar}` : '/static/images/img-placeholder.png';

  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicStatus(getDynamicStatus(status.state, status.lastInteraction));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [status]);

  return (
    <div className={classes}>
      <div className="User__heading">
        <div className="avatar" style={borderStyle}>
          <img src={imgSrc} width="40" height="40" />
        </div>
        <div className="info">
          <h3 className="typography">{username} </h3>
          <h3 className="typography">{email} </h3>
        </div>
        <h3 className="typography">{dynamicStatus}</h3>
      </div>
      <ButtonBase className="more_button" onClick={toggleExpand}>
        Więcej
      </ButtonBase>
      <Activities isExpanded={isExpanded} id={id} />
    </div>
  );
};

export default memo(User);
