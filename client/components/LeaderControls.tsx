import { useStore } from "utils/store";

const LeaderControls = () => {
  const startRound = useStore((state) => state.next);
  const players = useStore((state) => Object.values(state.players));
  const readyPlayers = players.filter((player) => player.status === "ready");
  const canStart = players.length === readyPlayers.length && players.length > 2;

  return (
    <>
      {!canStart && (
        <div className="mb-4 text-center text-gray-500">
          Need 3 players to start
        </div>
      )}
      <button
        disabled={!canStart}
        className="block w-full btn btn-primary"
        onClick={startRound}
      >
        Start Game
      </button>
    </>
  );
};

export default LeaderControls;
