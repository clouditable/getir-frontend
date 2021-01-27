import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Card, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginService } from "../services/auth/api";
export const LoginScreen = () => {
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => ({
    auth: state.auth,
  }));
  const { error, isLoading } = auth;

  useEffect(() => {
    if (error) {
      toast.error("Lütfen girdiğiniz bilgileri kontrol edin.", {
        position: "top-right",
        closeOnClick: true,
      });
    }
  }, [error]);
  const [data, setData] = useState({ username: "user", password: "123456" });

  const isButtonEnabled = () =>
    !isLoading &&
    data.username.trim() &&
    data.password.trim() &&
    data.password.trim().length > 4;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = data;
    dispatch(loginService({ username, password }));
  };
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card style={{ width: "50%" }}>
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>Hoş Geldiniz</Card.Title>

          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Kullanıcı adı</Form.Label>
              <Form.Control
                placeholder="Kullanıcı adını giriniz"
                name="username"
                onChange={handleChange}
                value={data.username}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Şifre</Form.Label>
              <Form.Control
                type="password"
                placeholder="Şifre"
                name="password"
                onChange={handleChange}
                value={data.password}
              />
            </Form.Group>

            <Button
              block={true}
              onClick={handleSubmit}
              disabled={!isButtonEnabled()}
              variant={isButtonEnabled() ? "primary" : "secondary"}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
