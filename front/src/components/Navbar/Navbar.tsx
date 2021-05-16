import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.scss';

const Navbar = () => {
  return (
    <div className="Navbar">
      <NavLink to="/" exact className="Navbar__link" activeClassName="Navbar__link--active">
        Główna
      </NavLink>
      <NavLink to="/cats" exact className="Navbar__link" activeClassName="Navbar__link--active">
        Kotki
      </NavLink>
      <NavLink to="/dogs" exact className="Navbar__link" activeClassName="Navbar__link--active">
        Pieski
      </NavLink>
    </div>
  );
};

export default memo(Navbar);
