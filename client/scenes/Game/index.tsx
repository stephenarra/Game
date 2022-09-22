import { useStore, isGameBoardSelector } from "utils/store";
import Leader from "./Leader";
import Player from "./Player";
import Board from "./Board";

const Game = () => {
  const isGameBoard = useStore(isGameBoardSelector);
  const sessionId = useStore((state) => state.sessionId);
  const activeRound = useStore((state) => state.rounds[state.activeRound]);
  const isLeader = activeRound.leader === sessionId;

  let Scene = Player;
  if (isGameBoard) {
    Scene = Board;
  } else if (isLeader) {
    Scene = Leader;
  }

  if (activeRound.status === "prompt") {
    return <Scene.Prompt />;
  }
  if (activeRound.status === "response") {
    return <Scene.Response />;
  }
  if (activeRound.status === "select_winner") {
    return <Scene.Winner />;
  }
  if (activeRound.status === "complete") {
    return <Scene.Complete />;
  }
};

export default Game;
