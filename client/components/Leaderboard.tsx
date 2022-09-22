import { orderBy } from "lodash";
import { useMemo } from "react";
import { Game } from "game-types/Game";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";

const Leaderboard = ({ players }: { players: Game["players"] }) => {
  const playerList = useMemo(
    () =>
      orderBy(
        Object.keys(players).map((id) => ({ ...players[id], id })),
        ["points"],
        ["desc"]
      ),
    [players]
  );

  return (
    <table className="w-full table-auto">
      <thead>
        <tr>
          <th className="ml-6">Player</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {playerList.map((player, i) => (
          <tr key={player.id}>
            <td className="flex flex-row items-center">
              {i === 0 ? (
                <StarIcon className="w-4 h-4 mr-2 text-blue-500" />
              ) : (
                <div className="mr-6"></div>
              )}
              <Image src={player.avatar} alt="" width={40} height={40} />
              <div className="ml-2">{player.name}</div>
            </td>
            <td>{player.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Leaderboard;
