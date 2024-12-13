import React from "react";
import AppWelcomeImg from "../assets/AppWelcome.png";

const Welcome = () => {
  return (
    <div>
      <img src={AppWelcomeImg} alt="Illustrated image of the weather" />
      <p className="">Find your city or select a favorite to start</p>
    </div>
  );
};

export default Welcome;
