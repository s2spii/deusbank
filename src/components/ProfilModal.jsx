import { Input, Modal } from "@nextui-org/react";
import React, { useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setSalary, setUsername } from "../actions/user.action";

const ProfilModal = ({ visible, setVisible, setIsEdit }) => {
  const dispatch = useDispatch();
  const [selectedContent, setSelectedContent] = useState("");
  const [changedUsername, setChangedUsername] = useState("");
  const [changedEmail, setChangedEmail] = useState("");
  const userEmail = useSelector((state) => state.user.current.email);
  const userImage = useSelector((state) => state.user.current.img);
  const userBirthday = useSelector((state) => state.user.current.birthday);

  const [newSalary, setNewSalary] = useState();
  const userName = useSelector((state) => state.user.current.username);
  const [date, setDate] = useState("");

  const handleSelect = (value) => {
    if (selectedContent === value) {
      setSelectedContent("");
    } else {
      setSelectedContent(value);
    }
  };

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

  const handleDateChange = (e) => {
    const value = e.target.value;
    const formattedValue = value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})\/(\d{2})(\d)/, "$1/$2/$3")
      .substring(0, 10);

    setDate(formattedValue);
  };

  const handleChangeBirthday = () => {
    if (date === userBirthday) {
      NotificationManager.error(
        "La date de naissance doit être différente de celle définie initialement",
        "Date de naissance",
        5000
      );
      return;
    }
    if (date.length < 10) {
      NotificationManager.error(
        "La date de naissance définie est incorrecte",
        "Date de naissance",
        5000
      );
      return;
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
              <li onClick={(e) => handleSelect("profil")}>Profil</li>
              <hr color="#9BA4B4" />
              <li onClick={(e) => handleSelect("infos")}>Informations</li>
            </ul>
          </div>
          <div className="account-modal-body-content">
            {selectedContent === "profil" ? (
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
                <Input
                  status="primary"
                  value={date}
                  onChange={handleDateChange}
                  maxLength="10"
                  placeholder="JJ/MM/AAAA"
                  labelLeft={<i className="fa-solid fa-cake-candles"></i>}
                  contentRightStyling={false}
                  contentRight={
                    <i
                      className="fa-solid fa-right-long"
                      onClick={handleChangeBirthday}
                    ></i>
                  }
                />
              </>
            ) : selectedContent === "infos" ? (
              <div className="infos-modal-content">
                <Input
                  type="number"
                  labelLeft={<i className="fa-solid fa-euro-sign"></i>}
                  status="primary"
                  placeholder={"Nouveau Salaire"}
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
                <Input
                  labelLeft={<i className="fa-solid fa-house"></i>}
                  status="primary"
                  placeholder="Adresse"
                  aria-label="salary change"
                  contentRightStyling={false}
                  contentRight={<i className="fa-solid fa-right-long"></i>}
                />

                <Input
                  labelLeft={<i className="fa-solid fa-hashtag"></i>}
                  status="primary"
                  placeholder="Code Postal"
                  aria-label="salary change"
                  contentRightStyling={false}
                  contentRight={<i className="fa-solid fa-right-long"></i>}
                />
                <Input
                  labelLeft={<i className="fa-solid fa-city"></i>}
                  status="primary"
                  placeholder="Ville"
                  aria-label="salary change"
                  contentRightStyling={false}
                  contentRight={<i className="fa-solid fa-right-long"></i>}
                />
                <Input
                  labelLeft={<i className="fa-solid fa-globe"></i>}
                  status="primary"
                  placeholder="Pays"
                  aria-label="salary change"
                  contentRightStyling={false}
                  contentRight={<i className="fa-solid fa-right-long"></i>}
                />
              </div>
            ) : (
              <div>
                <h1>Bienvenue</h1>
                <p>Sur votre compte</p>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>

      <NotificationContainer />
    </>
  );
};

export default ProfilModal;
