import { useState } from "react";
import { useStore } from "utils/store";
import Input from "components/Input";
import CenterLayout from "components/CenterLayout";

const Prompt = () => {
  const [prompt, setPrompt] = useState("");
  const submitPrompt = useStore((state) => state.setPrompt);

  return (
    <CenterLayout>
      <Input title="Choose a Prompt" value={prompt} onChange={setPrompt} />
      <button
        className="block w-full btn btn-primary"
        onClick={() => {
          submitPrompt({ message: prompt });
        }}
      >
        Submit
      </button>
    </CenterLayout>
  );
};

const Response = () => (
  <CenterLayout>Users are submitting responses</CenterLayout>
);

const Winner = () => {
  const activeRound = useStore((state) => state.rounds[state.activeRound]);
  const setWinner = useStore((state) => state.setWinner);

  return (
    <CenterLayout>
      {Object.keys(activeRound.responses).map((id: string) => (
        <div
          className="p-4 my-2 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300"
          key={id}
          onClick={() => {
            // todo: this shouldn't be the player's id.
            setWinner({ id });
          }}
        >
          {activeRound.responses[id]}
        </div>
      ))}
    </CenterLayout>
  );
};

const Complete = () => <CenterLayout>Complete</CenterLayout>;

export default {
  Prompt,
  Response,
  Winner,
  Complete,
};
