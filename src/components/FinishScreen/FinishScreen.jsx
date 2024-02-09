import classes from "./FinishScreen.module.css";
import Button from "../Button/Button";
import { Fragment } from "react";

export default function FinishScreen({ score, media_root, replayGame }) {
  return (
    <Fragment>
      <img
        src={media_root + "images/finish-flag.png"}
        className={classes.Flag}
      />
      <h1>Игра завершена!</h1>
      <div className={classes.Score}>
        Вы набрали <span className={classes.Bold}>{score}</span> баллов
      </div>
      <Button className="button ReplayGame" onClick={replayGame}>
        Повторить игру
      </Button>
    </Fragment>
  );
}
