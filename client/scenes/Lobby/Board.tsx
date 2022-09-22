import PlayerCard from "components/PlayerCard";
import { useStore } from "utils/store";

const Lobby = () => {
  const players = useStore((state) => state.players);
  const leader = useStore((state) => state.leader);
  const roomId = useStore((state) => state.roomId);

  const readyPlayers = Object.keys(players)
    .map((id) => ({ ...players[id], id }))
    .filter((player) => player.status === "ready");

  return (
    <div className="flex items-center justify-center w-screen min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full">
        <h3 className="mb-4 text-2xl font-bold text-center text-gray-700">
          GIF Game
        </h3>
        <div className="my-6 text-center">
          <div className="mb-2 text-xl text-gray-700">Join from your phone</div>
          <div className="mb-2 text-gray-500">Your room code is</div>
          <div className="mb-2 text-3xl font-bold text-indigo-700">
            {roomId}
          </div>
        </div>
        <div>
          {!!readyPlayers.length && (
            <div className="flex flex-wrap items-start justify-center w-full">
              {readyPlayers.map((player) => (
                <PlayerCard
                  key={player.id}
                  name={player.name}
                  avatar={player.avatar}
                  isLeader={player.id === leader}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lobby;
