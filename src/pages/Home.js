import React from "react";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <Header />
      <div className="home">
        <img src="./assets/img/Graphic Accueil.png" alt="Graphic Accueil" />
        <div className="home-text">
          <h1>Gérer votre argent efficacement !</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            inventore, temporibus nulla sed vel neque maxime necessitatibus
            dolor? Expedita, id.
          </p>
        </div>
        <div className="home-background"></div>
      </div>
    </>
  );
};

export default Home;
