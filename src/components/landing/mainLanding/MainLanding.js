import React, { Fragment, useState } from "react";
import { Route, Switch } from "react-router-dom";
import GameLanding from "../gameLanding/GameLanding";
import GameContainer from "../../game/gameContainer/GameContainer";
import GameConclusion from "../../alert/gameConclusion/GameConclusion";
import Notification from "../../alert/notification/Notification";
import "../mainLanding/MainLanding.scss";

const MainLanding = () => {
  const [rowCount, setRowCount] = useState();
  const [colCount, setColCount] = useState();
  const [gameStatus, setGameStatus] = useState("onGoing");
  const [gameNotificationMsg, setGameNotificationMsg] = useState("");

  /**Set rows and cols */
  const onInputChange = (type, value) => {
    if (value >= 0) type === "rows" ? setRowCount(value) : setColCount(value);
  };
  return (
    <Fragment>
      {/* Game Notification Alert */}
      {gameNotificationMsg !== "" && (
        <Notification
          gameNotificationMsg={gameNotificationMsg}
          setGameNotificationMsg={setGameNotificationMsg}
        />
      )}
      <div className="container-fluid main-landing-container">
        <h1 className="text-center">Mine Sweeper</h1>
        <div className="row">
          {/* Game conclussion Alert */}
          {(gameStatus === "over" || gameStatus === "winner") && (
            <GameConclusion
              gameStatus={gameStatus}
              setGameStatus={setGameStatus}
            />
          )}

          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                // Mine Sweeper setup Page
                <GameLanding
                  rowCount={rowCount}
                  colCount={colCount}
                  onInputChange={onInputChange}
                  setGameNotificationMsg={setGameNotificationMsg}
                />
              )}
            />
            <Route
              exact
              path="/game"
              render={() => (
                // Mine Sweeper Page
                <GameContainer
                  rowCount={rowCount}
                  colCount={colCount}
                  setGameStatus={setGameStatus}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Fragment>
  );
};

export default MainLanding;
