import Leaderboard from "components/LeaderBoard";
import { useStore, isGameBoardSelector } from "utils/store";
import CenterLayout from "components/CenterLayout";

const BoardComplete = () => {
  const players = useStore((state) => state.players);
  // const winner =  useStore((state) => state.winner);
  const returnToLobby = useStore((state) => state.next);

  return (
    <div className="flex flex-col h-screen min-h-full">
      <Leaderboard players={players} />
      <button className="block w-full btn btn-primary" onClick={returnToLobby}>
        Return to Game Lobby
      </button>
    </div>
  );
};

const Complete = () => {
  const isGameBoard = useStore(isGameBoardSelector);

  if (isGameBoard) {
    return <BoardComplete />;
  }

  return (
    <CenterLayout>
      <h3 className="mb-1 text-lg font-semibold text-gray-700">
        Game Complete. Click return to lobby on game board.
      </h3>
    </CenterLayout>
  );
};

export default Complete;
