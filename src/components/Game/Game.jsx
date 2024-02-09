import classes from "./Game.module.css";
import Button from "../Button/Button";
import Card from "../Card/Card";
import FinishScreen from "../FinishScreen/FinishScreen";
import { useState, Fragment, useEffect } from "react";

export default function Game({ media_root }) {
  const [game, setGame] = useState({
    score: 0,
    finished: false,
  });
  const [openCards, setOpenCards] = useState(0); // Состояние для отслеживания количества открытых карт

  const numberOfUniqueCards = 9;
  const startShownSeconds = 5;

  //   function handleClick(event) {
  //     onStopGame(false);
  //   }

  function winGame(event) {
    // Открываем страницу с итогами
    setGame((prev) => ({
      ...prev,
      finished: true,
    }));
  }

  function setNewScore(newScore) {
    // TODO: число баллов увеличивается на количество нераскрытых пар
    setGame((prev) => ({
      ...prev,
      score: newScore,
    }));
  }

  function changeScoreLower(newScore) {
    // TODO:  то число баллов уменьшается на количество раскрытых пар
    if (game.score - newScore >= 0) {
      setGame((prev) => ({
        ...prev,
        score: prev.score - newScore,
      }));
    } else {
      setGame((prev) => ({
        ...prev,
        score: 0,
      }));
    }
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function getCards() {
    let cardsArray = [];
    let availableCards = [];
    // На сервере карты от 00 до 08
    for (let index = 0; index < numberOfUniqueCards; index++) {
      availableCards.push("images/0" + index + ".gif");
    }
    for (let index = 0; index < numberOfUniqueCards * 2; index += 2) {
      // Создаем 2 одинаковые карты
      let cardImg = availableCards.pop();
      cardsArray.push({
        id: index,
        shown: true,
        card_image_url: cardImg,
        found: false,
      });
      cardsArray.push({
        id: index + 1,
        shown: true,
        card_image_url: cardImg,
        found: false,
      });
    }
    return shuffleArray(cardsArray); // Перемешиваем массив перед возвратом
  }

  const [cards, setCards] = useState(getCards());

  function replayGame(event) {
    setGame((prevGame) => ({
      ...prevGame,
      score: 0,
      finished: false,
    }));
    setCards(getCards());
    setOpenCards(0);
  }

  function toggleCard(id, found) {
    if (!found) {
      if (openCards < 2) {
        let needToUpdateOpenedCardsNum = false;
        const newCards = cards.map((card) => {
          if (card.id === id && !card.shown) {
            needToUpdateOpenedCardsNum = true;
            return {
              ...card,
              shown: true,
            };
          }
          return card;
        });
        setCards(newCards);
        if (needToUpdateOpenedCardsNum) {
          setOpenCards(openCards + 1);
        }
        const openShownCards = newCards.filter(
          (card) => card.shown && !card.found
        ); // Фильтруем открытые и не найденные карты
        if (
          openShownCards.length === 2 &&
          openShownCards[0].card_image_url === openShownCards[1].card_image_url
        ) {
          // Подсчитываем количество нераскрытых пар
          const remainingPairs =
            newCards.filter((card) => !card.found && !card.shown).length / 2;
          // Увеличиваем количество баллов на количество нераскрытых пар
          setNewScore(game.score + remainingPairs);

          // Если открыты две карты с одинаковыми изображениями, устанавливаем found = true
          const updatedCards = newCards.map((card) => {
            if (card.shown && !card.found) {
              return {
                ...card,
                found: true,
              };
            }
            return card;
          });
          setCards(updatedCards);
          setOpenCards(0); // Сбрасываем счетчик открытых карт
        } else if (openShownCards.length === 2) {
          // Подсчитываем количество раскрытых пар
          const remainingPairs =
            newCards.filter((card) => card.found).length / 2;
          // Уменьшаем количество баллов на количество раскрытых пар
          changeScoreLower(remainingPairs);
        }
      } else {
        const newCards = cards.map((card) => ({
          ...card,
          shown: false,
        }));
        setCards(newCards);
        setOpenCards(0);
      }
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      // После истечения времени переворачиваем все карты
      const newCards = cards.map((card) => ({
        ...card,
        shown: false,
      }));
      setCards(newCards);
    }, startShownSeconds * 1000);

    return () => clearTimeout(timer); // Очищаем таймер при размонтировании компонента или изменении состояния
  }, [game.finished]); // Добавляем finished в зависимости, чтобы useEffect сработал

  useEffect(() => {
    if (cards.every((card) => card.found)) {
      winGame();
    }
  }, [cards]);
  if (game.finished) {
    return (
      <FinishScreen
        score={game.score}
        media_root={media_root}
        replayGame={replayGame}
      />
    );
  } else {
    return (
      <Fragment>
        <div className={classes.Score}>Баллов: {game.score}</div>
        <div className={classes.GamingTable}>
          {cards.map((card) => (
            <Card
              {...card}
              media_root={media_root}
              key={card.id}
              onClick={() => toggleCard(card.id, card.found)}
            />
          ))}
        </div>
        <Button
          className={classes.button + " " + classes.FinishGame}
          onClick={winGame}
        >
          Завершить игру
        </Button>
      </Fragment>
    );
  }
}
