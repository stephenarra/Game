import { useStore, isGameBoardSelector } from "utils/store";

import Player from "./Player";
import Board from "./Board";

const Game = () => {
  const isGameBoard = useStore(isGameBoardSelector);

  let Scene = Player;
  if (isGameBoard) {
    Scene = Board;
  }

  return <Scene />;
};

export default Game;
