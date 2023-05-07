import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { LogoutUser } from "../actions/auth.action";
import SalarySet from "./SalarySet";
import { Avatar, Dropdown } from "@nextui-org/react";
import "react-notifications/lib/notifications.css";
import ChangeSet from "./ChangeSet";
import ProfilModal from "./ProfilModal";

const Header = ({ isEdit, setIsEdit }) => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.current.username);

  const [visible, setVisible] = useState(false);

  const handleAction = (item) => {
    if (item === "logout") {
      handleLogout();
    } else if (item === "myAccount") {
      setVisible(true);
    }
  };

  const handleLogout = () => {
    dispatch(LogoutUser());
  };

  return (
    <>
      <div className="header">
        <Dropdown>
          <Dropdown.Trigger>
            <Avatar
              squared
              as="button"
              text={userName.slice(0, 3)}
              className="font-title click hover-scale"
              zoomed
            />
          </Dropdown.Trigger>
          <Dropdown.Menu aria-label="User Actions" onAction={handleAction}>
            <Dropdown.Item key="myAccount">Mon compte</Dropdown.Item>
            <Dropdown.Item key="logout" color="error">
              Se déconnecter
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <ProfilModal
          visible={visible}
          setVisible={setVisible}
          setIsEdit={setIsEdit}
        />
        <h2 className="title">Bienvenue {userName}</h2>
        <ul className="navigation">
          <NavLink
            to="/"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            Accueil
          </NavLink>
          <NavLink
            to="/mon-espace"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            Mon espace
          </NavLink>
          <NavLink
            to="/nous-contacter"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            Nous contacter
          </NavLink>
        </ul>
      </div>
      <SalarySet />
      <ChangeSet isEdit={isEdit} />
    </>
  );
};

export default Header;
