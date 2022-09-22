import PlayerCard from "components/PlayerCard";
import React, { useEffect } from "react";
import { useStore } from "utils/store";

const Board = ({ children }: { children: React.ReactNode }) => {
  const activeRoundIndex = useStore((state) => state.activeRound);
  const activeRound = useStore((state) => state.rounds[state.activeRound]);
  const players = useStore((state) => state.players);

  return (
    <div className="flex flex-col h-screen min-h-full">
      <div className="flex justify-center py-4">
        <h3 className="mb-1 text-xl font-bold text-gray-900">
          Round: {activeRoundIndex + 1}
        </h3>
      </div>
      <div className="flex-grow px-4 py-12 bg-gray-200 sm:px-6 lg:px-8">
        <div className="w-full space-y-10">{children}</div>
      </div>
      <div>
        <div className="flex justify-center">
          {Object.keys(players)
            .map((id) => ({ ...players[id], id }))
            .map((player) => (
              <PlayerCard
                format="compact"
                key={player.id}
                name={player.name}
                avatar={player.avatar}
                isLeader={player.id === activeRound.leader}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

const Prompt = () => {
  const leader = useStore(
    (state) => state.players[state.rounds[state.activeRound].leader]
  );
  return <>{leader.name} is selecting a prompt</>;
};

const Response = () => {
  const activeRound = useStore((state) => state.rounds[state.activeRound]);

  return (
    <>
      <h3 className="mb-1 text-xl font-bold text-gray-900">
        {activeRound.prompt}
      </h3>
      <div>Users are submitting responses</div>
    </>
  );
};

const Winner = () => {
  const activeRound = useStore((state) => state.rounds[state.activeRound]);

  return (
    <>
      <div>Responses:</div>
      {Object.keys(activeRound.responses).map((id: string) => (
        <div
          className="p-4 my-2 bg-gray-200 border border-gray-300 rounded-md"
          key={id}
        >
          {activeRound.responses[id]}
        </div>
      ))}
      <div>Leader is selecting winner</div>
    </>
  );
};

const Complete = () => {
  const winner = useStore(
    (state) => state.players[state.rounds[state.activeRound].winner]
  );
  const startRound = useStore((state) => state.next);

  useEffect(() => {
    setTimeout(() => {
      startRound();
    }, 4000);
  }, []);

  return (
    <>
      <div>Round Complete</div>
      <h3 className="mb-1 text-xl font-bold text-gray-900">
        {winner.name} Wins!
      </h3>
    </>
  );
};

const withBoard = (Component: React.FunctionComponent) => () =>
  (
    <Board>
      <Component />
    </Board>
  );

export default {
  Prompt: withBoard(Prompt),
  Response: withBoard(Response),
  Winner: withBoard(Winner),
  Complete: withBoard(Complete),
};
