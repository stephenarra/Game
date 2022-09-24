import Leaderboard from "components/Leaderboard";
import { useStore, isGameBoardSelector } from "utils/store";
import CenterLayout from "components/CenterLayout";

const BoardComplete = () => {
  const players = useStore((state) => state.players);
  const returnToLobby = useStore((state) => state.next);

  return (
    <div className="h-full bg-gray-200">
      <div className="flex flex-col px-4 py-12 sm:px-6 lg:px-8">
        <Leaderboard players={players} />
        <button
          className="block w-full mt-8 btn btn-primary"
          onClick={returnToLobby}
        >
          Return to Game Lobby
        </button>
      </div>
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
