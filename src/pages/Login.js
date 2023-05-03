import { Button, Input } from "@nextui-org/react";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { LoginUser } from "../actions/auth.action";

const Login = () => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const email = useRef();
  const password = useRef();

  const handleForm = (e) => {
    e.preventDefault();

    dispatch(LoginUser(email.current.value, password.current.value));
  };

  return (
    <form className="login-form" onSubmit={handleForm} ref={formRef}>
      <h1>Connexion</h1>
      <Input
        labelLeft={<i className="fa-solid fa-user"></i>}
        autoComplete="email"
        placeholder="E-mail ou Nom d'utilisateur"
        aria-label="email"
        ref={email}
      />
      <Input.Password
        labelLeft={<i className="fa-solid fa-lock"></i>}
        placeholder="Mot de passe"
        aria-label="password"
        ref={password}
      />

      <Button color="primary" auto type="submit" ghost>
        Se connecter
      </Button>
      <NavLink to="/register">Créer un compte</NavLink>
    </form>
  );
};

export default Login;
