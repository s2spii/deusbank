import React, { useRef, useState } from "react";
import Header from "../components/Header";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useSelector } from "react-redux";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const [objet, setObjet] = useState("");
  const [content, setContent] = useState("");
  const email = useSelector((state) => state.user.current.email);
  const username = useSelector((state) => state.user.current.username);
  const formRef = useRef();

  const handleForm = (e) => {
    e.preventDefault();

    const template_params = {
      username,
      email,
      objet,
      content,
    };

    try {
      emailjs
        .send(
          "service_ui700c8",
          "template_68vwbnd",
          template_params,
          "ecjf-G1cut-YX7tiU"
        )
        .then(() => {
          formRef.current.reset();
          NotificationManager.success(
            "Votre mail a bien été envoyé",
            "Contact",
            5000
          );
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Header />
      <div className="contact-us">
        <form className="email-form" ref={formRef} onSubmit={handleForm}>
          <h2>Nous envoyer un e-mail</h2>
          <Input
            bordered
            label="Objet:"
            status="primary"
            helperText="Entrer l'objet du mail"
            aria-label="object"
            value={objet}
            onChange={(e) => setObjet(e.target.value)}
          />
          <Textarea
            bordered
            helperText="Détailler votre demande"
            status="primary"
            label="Message:"
            rows={6}
            aria-label="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button auto ghost type="submit">
            Envoyer
          </Button>
        </form>
        <div className="right-side-contact">
          <figure>
            <img
              src="./assets/img/Graphic complete.png"
              alt="Un graphique montrant ce qu'on peut faire avec DeusBank"
              draggable="false"
            />
            <figcaption>DeusBank</figcaption>
          </figure>
        </div>
      </div>
      <div className="background-angle top"></div>
      <div className="background-angle bottom"></div>

      <NotificationContainer />
    </>
  );
};

export default ContactUs;
