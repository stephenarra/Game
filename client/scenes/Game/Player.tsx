import { useState } from "react";
import { useStore } from "utils/store";
import CenterLayout from "components/CenterLayout";
import Input from "components/Input";

const FullScreenMessage = ({ message }: { message: string }) => (
  <CenterLayout>
    <h3 className="mb-1 text-lg font-semibold text-gray-700">{message}</h3>
  </CenterLayout>
);

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
  const hasSubmitted = activeRound.responses[sessionId];

  // response shouldn't be keyed by id, this is a hack.
  if (hasSubmitted) {
    return <FullScreenMessage message="Response Submitted." />;
  }

  return (
    <CenterLayout>
      <h3 className="mb-1 text-xl font-bold text-gray-900">
        {activeRound.prompt}
      </h3>
      <Input
        title="Choose a Response"
        value={response}
        onChange={setResponse}
      />
      <button
        className="block w-full btn btn-primary"
        onClick={() => {
          submitResponse({ message: response });
        }}
      >
        Submit
      </button>
    </CenterLayout>
  );
};

const Winner = () => (
  <FullScreenMessage message="Leader is selecting a winner." />
);
const Complete = () => <FullScreenMessage message="Round Complete." />;

export default {
  Prompt,
  Response,
  Winner,
  Complete,
};
