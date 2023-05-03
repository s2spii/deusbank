import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { LogoutUser } from "../actions/auth.action";
import SalarySet from "./SalarySet";
import { Avatar, Dropdown, Input, Modal } from "@nextui-org/react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import {
  setEmail,
  setPassword,
  setSalary,
  setUsername,
} from "../actions/user.action";
import ChangeSet from "./ChangeSet";

const Header = ({ isEdit, setIsEdit }) => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.current.username);
  const userEmail = useSelector((state) => state.user.current.email);
  const userImage = useSelector((state) => state.user.current.img);
  const salary = useSelector((state) => state.user.current.salary);
  const [newSalary, setNewSalary] = useState();

  const [visible, setVisible] = useState(false);
  const [selectedContent, setSelectedContent] = useState("");
  const [changedUsername, setChangedUsername] = useState("");
  const [changedEmail, setChangedEmail] = useState("");
  const [changedPassword, setChangedPassword] = useState("");

  const handleChangeUsername = () => {
    if (changedUsername === userName) {
      NotificationManager.error(
        "Veuillez entrer un nom d'utilisateur différent de celui actuel",
        "Nom d'utilisateur",
        5000
      );
      return;
    } else if (changedUsername) {
      try {
        // Dispatch action to update username
        dispatch(setUsername(changedUsername));
        setChangedUsername("");
        NotificationManager.success(
          "Votre nom d'utilisateur a bien été modifié",
          "Nom d'utilisateur",
          3000
        );
        return;
      } catch (err) {
        console.log("Erreur: " + err);
        return;
      }
    } else {
      NotificationManager.error(
        "Veuillez entrer un nom d'utilisateur",
        "Nom d'utilisateur",
        5000
      );
    }
  };

  const handleChangeEmail = () => {
    if (changedEmail === userEmail) {
      NotificationManager.error(
        "Veuillez entrer une adresse email différente de celle actuelle",
        "Adresse email",
        5000
      );
      return;
    } else if (changedEmail) {
      try {
        // Dispatch action to update email
        dispatch(setEmail(changedEmail));
        setChangedEmail("");
        NotificationManager.success(
          "Votre adresse email a bien été modifiée",
          "Adresse email",
          3000
        );
        return;
      } catch (err) {
        console.log("Erreur: " + err);
        return;
      }
    } else {
      NotificationManager.error(
        "Veuillez entrer une adresse email",
        "Adresse email",
        5000
      );
    }
  };

  const handleChangePassword = () => {
    if (changedPassword) {
      try {
        // Dispatch action to update password
        dispatch(setPassword(changedPassword));
        setChangedPassword("");
        NotificationManager.success(
          "Votre mot de passe a bien été modifié",
          "Mot de passe",
          3000
        );
        return;
      } catch (err) {
        console.log("Erreur: " + err);
        return;
      }
    } else {
      NotificationManager.error(
        "Veuillez entrer un mot de passe",
        "Mot de passe",
        5000
      );
    }
  };

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

  const handleSelect = (value) => {
    if (selectedContent === value) {
      setSelectedContent("");
    } else {
      setSelectedContent(value);
    }
  };

  const handleSalary = () => {
    try {
      if (!newSalary) {
        NotificationManager.error(
          "Veuillez entrer un salaire",
          "Salaire",
          3000
        );
      } else {
        dispatch(setSalary(newSalary));
        NotificationManager.success(
          "Votre salaire a bien été modifié",
          "Salaire",
          5000
        );
        setIsEdit(true);
      }
    } catch (err) {
      console.log("Erreur: " + err);
      NotificationManager.error(
        "Une erreur est survenue lors de la modification de votre salaire",
        "Salaire",
        5000
      );
    }
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
        <Modal
          width="800px"
          closeButton
          aria-labelledby="modal-title"
          open={visible}
          onClose={() => setVisible(false)}
        >
          <Modal.Header>
            <h1
              style={{ fontSize: "3em" }}
              className="margin-10-no-padding font-title"
              id="modal-title"
            >
              Modifier
            </h1>
          </Modal.Header>
          <Modal.Body className="account-modal-body">
            <div className="account-modal-body-navigation">
              <ul>
                <li onClick={(e) => handleSelect("infos")}>Informations</li>
                <hr color="#9BA4B4" />
                <li onClick={(e) => handleSelect("salary")}>Salaire</li>
              </ul>
            </div>
            <div className="account-modal-body-content">
              {selectedContent === "infos" ? (
                <>
                  {userImage ? (
                    <image
                      src={userImage}
                      alt="User Image"
                      className="font-title click hover-scale"
                    />
                  ) : (
                    <div className="user-logo">
                      <div>
                        <p>Changer</p>
                      </div>
                      <span>{userName.slice(0, 3)}</span>
                    </div>
                  )}
                  <Input
                    aria-label="change username"
                    labelLeft={<i className="fa-solid fa-user"></i>}
                    contentRightStyling={false}
                    contentRight={
                      <i
                        className="fa-solid fa-right-long"
                        onClick={handleChangeUsername}
                      ></i>
                    }
                    placeholder={userName}
                    status="primary"
                    value={changedUsername}
                    onChange={(e) => setChangedUsername(e.target.value)}
                  />

                  <Input
                    aria-label="change email"
                    labelLeft={<i className="fa-solid fa-envelope"></i>}
                    contentRightStyling={false}
                    contentRight={
                      <i
                        className="fa-solid fa-right-long"
                        onClick={handleChangeEmail}
                      ></i>
                    }
                    placeholder={userEmail}
                    status="primary"
                    value={changedEmail}
                    onChange={(e) => setChangedEmail(e.target.value)}
                  />

                  {/* <Input
                    aria-label="change password"
                    labelLeft={<i className="fa-solid fa-lock"></i>}
                    contentRightStyling={false}
                    contentRight={
                      <i
                        className="fa-solid fa-right-long"
                        onClick={handleChangePassword}
                      ></i>
                    }
                    type="password"
                    placeholder="Nouveau mot de passe"
                    status="primary"
                    value={changedPassword}
                    onChange={(e) => setChangedPassword(e.target.value)}
                  /> */}
                </>
              ) : selectedContent === "salary" ? (
                <>
                  <h3 className="font-title">
                    Votre salaire est actuellement: {salary.toLocaleString()}€
                  </h3>
                  <Input
                    type="number"
                    labelLeft={<i className="fa-solid fa-euro-sign"></i>}
                    status="primary"
                    placeholder="Nouveau Salaire"
                    aria-label="salary change"
                    contentRightStyling={false}
                    contentRight={
                      <i
                        className="fa-solid fa-right-long"
                        onClick={handleSalary}
                      ></i>
                    }
                    onChange={(e) => setNewSalary(e.target.value)}
                  />
                </>
              ) : (
                <div>
                  <h1>Bienvenue</h1>
                  <p>Sur votre compte</p>
                </div>
              )}
            </div>
          </Modal.Body>
        </Modal>
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
      <NotificationContainer />
      <SalarySet />
      <ChangeSet isEdit={isEdit} />
    </>
  );
};

export default Header;
