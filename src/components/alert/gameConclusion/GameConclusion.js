import React, { useEffect } from "react";
import "./GameConclusion.scss";
import UIfx from "uifx";
import explosionSound from "../../../game-sounds/explosion.mp3";
import synthSound from "../../../game-sounds/synth.mp3";
import PropTypes from "prop-types";

const GameConclusion = ({ gameStatus, setGameStatus }) => {
  const explosion = new UIfx(explosionSound);
  const synth = new UIfx(synthSound);
  useEffect(() => {
    let main = document.querySelector(".fa-window-close");
    if (main !== undefined && main !== null) {
      main.focus();
    }
    if (gameStatus === "over") explosion.play();
    else if (gameStatus === "winner") synth.play();
  }, []);

  const closeConclusion = (e) => {
    let key = e.which || e.keyCode || "click";
    // Accepts only Click and the enter Key
    const acceptedInputs = [13, 32, "click"];
    if (acceptedInputs.includes(key)) {
      setGameStatus("completed");
    }
  };

  return (
    <div className="game-conclusion-container">
      <div className="container-fluid">
        <div className="row close-alert-container">
          <span
            onClick={(e) => closeConclusion(e)}
            onKeyDown={(e) => closeConclusion(e)}
            tabIndex="0"
          >
            <i className="fas fa-window-close"></i>
          </span>
        </div>
        <h2 className="row">
          {gameStatus === "over" ? "Game Over" : "Winner"}
        </h2>
        <div className="row justify-content-center">
          <i
            className={
              gameStatus === "over" ? "fas fa-bomb" : "far fa-check-circle"
            }
          ></i>
        </div>
      </div>
    </div>
  );
};

GameConclusion.propTypes = {
  gameStatus: PropTypes.string.isRequired,
  setGameStatus: PropTypes.func.isRequired,
};

export default GameConclusion;
