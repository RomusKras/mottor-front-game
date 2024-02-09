import React from "react";
import "./styles.css";
import Header from "./components/Header";
import Button from "./components/Button/Button";
import Game from "./components/Game/Game";
import { useState } from "react";
import { Fragment } from "react";

export default function App(props) {
  const [gameRunning, setGameRunning] = useState(false);

  const gameParameters = {
    media_root: "https://romuskras.net/mottor/",
    game_name: "Memory",
    game_logo_url: "images/05.gif",
  };

  function handleClick(event) {
    setGameRunning(true);
  }

  // function handleStopGame(event) {
  //   setGameRunning(false);
  // }

  return (
    <div className={"App " + (gameRunning && "GameBlock")}>
      {gameRunning ? (
        <Game media_root={gameParameters.media_root} />
      ) : (
        <Fragment>
          <Header {...gameParameters} />
          <Button className="StartGame" onClick={handleClick}>
            Начать игру!
          </Button>
        </Fragment>
      )}
    </div>
  );
}
