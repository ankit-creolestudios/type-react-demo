import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/store";
import { logout } from "../../feature/authSlice";
const Header = () => {
  const [login, setLogin] = useState(false);
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const userDetail: object | null | boolean = JSON.parse(
      localStorage.getItem("login") || "false"
    );
    if (userDetail) {
      setLogin(true);
    }
  }, []);
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
            <Link to="/add-record">Add User</Link>
          </div>
          {!login ? (
            <div>
              <div>
                <Button>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
              <div>
                <Button>
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <Button
                onClick={() => {
                  dispatch(logout());
                  navigation("/login");
                  window.location.reload();
                }}
              >
                <Link to={"#"}>Logout</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
