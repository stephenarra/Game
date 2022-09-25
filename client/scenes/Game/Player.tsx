import { useState } from "react";
import { useStore } from "utils/store";
import FullScreenMessage from "components/FullScreenMessage";
import GifSearch from "components/GifSearch";
import { pick } from "lodash";

const Prompt = () => {
  const currentLeader = useStore(
    (state) => state.players[state.rounds[state.activeRound].leader]
  );

  return (
    <FullScreenMessage message={`${currentLeader.name} is setting a prompt`} />
  );
};

const Response = () => {
  const [response, setResponse] = useState("");
  const submitResponse = useStore((state) => state.setResponse);
  const activeRound = useStore((state) => state.rounds[state.activeRound]);
  const sessionId = useStore((state) => state.sessionId);
  const hasSubmitted = activeRound.playerResponses.includes(sessionId);

  if (hasSubmitted) {
    return <FullScreenMessage message="Response Submitted." />;
  }

  return (
    <div className="flex flex-col items-center w-full h-full">
      <h3 className="pt-4 mb-1 text-xl font-bold text-gray-900">
        {activeRound.prompt}
      </h3>
      <GifSearch
        className="flex-1 w-full max-w-md"
        placeholder="Search for a GIF"
        onClick={(d) => {
          const image = {
            id: d.id as string,
            title: d.title,
            ...pick(d.images.original, ["url", "width", "height"]),
          };
          submitResponse(image);
        }}
      />
    </div>
  );
};

const Winner = () => (
  <FullScreenMessage message="Leader is selecting a winner." />
);

const Complete = () => (
  <FullScreenMessage message="Please wait for next round to begin." />
);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Prompt,
  Response,
  Winner,
  Complete,
};
