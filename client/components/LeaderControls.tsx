import { useStore } from "utils/store";

const LeaderControls = () => {
  const startRound = useStore((state) => state.next);
  const players = useStore((state) => Object.values(state.players));
  const readyPlayers = players.filter((player) => player.status === "ready");
  const canStart = players.length === readyPlayers.length && players.length > 2;

  return (
    <button
      disabled={!canStart}
      className="block w-full btn btn-primary"
      onClick={startRound}
    >
      Start Game
    </button>
  );
};

export default LeaderControls;
