import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div>
        <h1 className="redux__heading">
          <Link to="/">Redux System</Link>
        </h1>
      </div>
      <div className="nav__link">
        <div className="nav__item">
          <div>
            <Link to="/">Home</Link>
          </div>
          <div>
            <Link to="/addUser">Add User</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
