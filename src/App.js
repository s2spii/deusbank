import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MySpace from "./pages/MySpace";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { isLoggedIn } from "./actions/auth.action";
import ContactUs from "./pages/ContactUs";

const App = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.isLogged);

  useEffect(() => {
    dispatch(isLoggedIn());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      {isLogged ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mon-espace" element={<MySpace />} />
          <Route path="/nous-contacter" element={<ContactUs />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
