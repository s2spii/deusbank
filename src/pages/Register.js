import { Button, Input } from "@nextui-org/react";
import React, { useRef, useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../actions/user.action";
import { LoginUser } from "../actions/auth.action";

const Register = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const formRef = useRef();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const checkUsernameValidity = (username) => {
    const foundUser = users.find((user) => user.username === username);

    setIsUsernameValid(foundUser ? false : true);
  };

  const checkEmailValidity = (email) => {
    const foundUser = users.find((user) => user.email === email);
    setIsEmailValid(foundUser ? false : true);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const timer = 3000;

    if (isUsernameValid && isEmailValid) {
      const data = {
        username,
        email,
        password,
      };
      dispatch(RegisterUser(data));
      dispatch(LoginUser(email, password));
      formRef.current.reset();

      NotificationManager.success(
        username,
        "Votre compte a bien été créé, vous allez être redirigé",
        timer
      );
      setTimeout(() => {
        setRedirect(true);
      }, timer);
    }
  };

  return (
    <>
      {redirect && <Navigate to="/" />}
      <form className="login-form" ref={formRef} onSubmit={handleForm}>
        <h1>Inscription</h1>
        <Input
          labelLeft={<i className="fa-solid fa-user"></i>}
          placeholder="Nom d'utilisateur"
          onChange={(e) => {
            setUsername(e.target.value);
            checkUsernameValidity(e.target.value);
          }}
          aria-label="username"
          required
          className={!isUsernameValid ? "invalid-input" : ""}
          autoComplete="off"
        />
        {!isUsernameValid ? (
          <span className="invalid-input-span">
            Nom d'utilisateur déjà utilisé
          </span>
        ) : null}
        <Input
          labelLeft={<i className="fa-solid fa-at"></i>}
          placeholder="E-mail"
          onChange={(e) => {
            setEmail(e.target.value);
            checkEmailValidity(e.target.value);
          }}
          aria-label="email"
          type="email"
          required
          className={!isEmailValid ? "invalid-input" : ""}
          autoComplete="email"
          name="email"
        />
        {!isEmailValid ? (
          <span className="invalid-input-span">E-mail déjà utilisé</span>
        ) : null}
        <Input.Password
          labelLeft={<i className="fa-solid fa-lock"></i>}
          placeholder="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
          aria-label="password"
          required
          name="password"
        />
        <Button
          color="primary"
          onPress={() => {
            if (!isEmailValid || !isUsernameValid) {
              NotificationManager.error(
                "",
                "Veuillez remplir tous les champs",
                5000
              );
            }
          }}
          auto
          ghost
          type="submit"
        >
          Créer un compte
        </Button>
        <NavLink to="/login">Se connecter</NavLink>
      </form>
      <NotificationContainer />
    </>
  );
};

export default Register;
