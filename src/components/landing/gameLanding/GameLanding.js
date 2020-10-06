import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import "./GameLanding.scss";

const GameLanding = ({
  history,
  colCount,
  rowCount,
  onInputChange,
  setGameNotificationMsg,
}) => {
  const startGame = () => {
    if (rowCount > 99 || colCount > 99)
      setGameNotificationMsg("Please Enter A value less than 99");
    else if (!colCount || !rowCount || rowCount === "0" || colCount === "0")
      setGameNotificationMsg("Please enter a valid value to continue");
    else {
      setGameNotificationMsg("");
      history.push("/game");
    }
  };
  return (
    <div className="container game-landing-container">
      <div className="row">
        <div className="col-12">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="rows">
                Rows
              </span>
            </div>
            <input
              type="number"
              className="form-control"
              placeholder="No of Rows"
              aria-label="Rows"
              aria-describedby="rows"
              value={rowCount}
              onChange={(e) => onInputChange("rows", e.target.value)}
            />
          </div>
        </div>
        <div className="col-12">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="cols">
                Columns
              </span>
            </div>
            <input
              type="number"
              className="form-control"
              placeholder="No of Columns"
              aria-label="Columns"
              aria-describedby="cols"
              value={colCount}
              onChange={(e) => onInputChange("cols", e.target.value)}
            />
          </div>
        </div>
        <div className="col-12 d-flex justify-content-center start-game-container">
          <button
            type="button"
            className="btn btn-lg btn-outline-warning"
            onClick={() => startGame()}
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};
GameLanding.propTypes = {
  colCount: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  setGameNotificationMsg: PropTypes.func.isRequired,
};

export default withRouter(GameLanding);
