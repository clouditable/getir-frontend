/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "react-bootstrap";
import { logoutService } from "../../services/auth/api";

export const Header = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({
    auth: state.auth,
  }));
  const { user } = auth;

  const handleLogout = () => dispatch(logoutService());
  return (
    <Navbar>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Hoşgeldiniz {user?._doc?.username || "-"}{" "}
          <a style={{ cursor: "pointer" }} onClick={handleLogout}>
            (Çıkış Yap)
          </a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};
