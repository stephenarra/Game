import PlayerCard from "components/PlayerCard";
import React, { useEffect, useMemo, useState } from "react";
import { useStore } from "utils/store";
import ResponseGallery, { getImages } from "components/ResponseGallery";
import Image from "next/future/image";
import { useCountdown } from "usehooks-ts";
import useSlideShow from "./useSlideshow";

const Title = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mb-1 text-xl font-bold text-center text-gray-900">
    {children}
  </h3>
);

const Subtitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mb-1 text-lg font-bold text-center text-gray-700">
    {children}
  </h3>
);

const Board = ({ children }: { children: React.ReactNode }) => {
  const activeRoundIndex = useStore((state) => state.activeRound);
  const activeRound = useStore((state) => state.rounds[state.activeRound]);
  const players = useStore((state) => state.players);

  return (
    <div className="flex flex-col h-screen min-h-full bg-gray-200">
      <div className="flex justify-center py-4">
        <h3 className="text-xl text-gray-500">Round {activeRoundIndex + 1}</h3>
      </div>
      <div className="flex-grow px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full h-full">{children}</div>
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
  return <Title>{leader.name} is selecting a prompt</Title>;
};

const Response = () => {
  const activeRound = useStore((state) => state.rounds[state.activeRound]);
  const players = useStore((state) => state.players);
  const playerResponses = activeRound.playerResponses;

  return (
    <>
      <Title>{activeRound.prompt}</Title>
      <Subtitle>Users are submitting responses</Subtitle>
      <div>
        <div className="flex justify-center">
          {Object.keys(players)
            .map((id) => ({ ...players[id], id }))
            .filter((player) => player.id !== activeRound.leader)
            .map((player) => (
              <PlayerCard
                format="compact"
                key={player.id}
                name={player.name}
                avatar={player.avatar}
                subtitle={playerResponses.includes(player.id) ? "ready" : ""}
              />
            ))}
        </div>
      </div>
    </>
  );
};

const SelectWinner = () => {
  const activeRound = useStore((state) => state.rounds[state.activeRound]);
  const images = useMemo(
    () => getImages(activeRound.responses),
    [activeRound.responses]
  );
  const {
    image,
    isAnimating,
  }: { image: typeof images[0]; isAnimating: boolean } = useSlideShow({
    images,
  });

  if (isAnimating) {
    return (
      <>
        <Title>{activeRound.prompt}</Title>
        <div className="flex justify-center flex-1 w-full">
          <Image
            className="w-auto h-full text-center rounded"
            src={image.src}
            alt=""
            width={0}
            height={0}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Title>{activeRound.prompt}</Title>
      <ResponseGallery responses={activeRound.responses} />
      <Subtitle>Leader is selecting winner</Subtitle>
    </>
  );
};

const Complete = () => {
  const activeRound = useStore((state) => state.rounds[state.activeRound]);
  const winner = useStore((state) => {
    const activeRound = state.rounds[state.activeRound];
    const response = activeRound.responses[activeRound.winner];
    return { response, player: state.players[response.owner] };
  });
  const startRound = useStore((state) => state.next);

  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 5,
      intervalMs: 1000,
    });

  // start countdown on load
  useEffect(() => {
    startCountdown();
  }, [startCountdown]);
  useEffect(() => {
    if (count === 0) {
      startRound();
    }
  }, [startRound, count]);

  return (
    <>
      {!!winner.player && <Title>{winner.player.name} Wins!</Title>}
      <Subtitle>{activeRound.prompt}</Subtitle>
      <div className="flex justify-center w-full">
        <Image
          className="text-center"
          src={winner.response.url}
          width={winner.response.width}
          height={winner.response.height}
          alt=""
        />
      </div>
      <Subtitle>Next round starts in: {count}</Subtitle>
    </>
  );
};

const withBoard = (Component: React.FunctionComponent) => {
  const BoardWrapper = () => (
    <Board>
      <Component />
    </Board>
  );
  return BoardWrapper;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Prompt: withBoard(Prompt),
  Response: withBoard(Response),
  Winner: withBoard(SelectWinner),
  Complete: withBoard(Complete),
};
