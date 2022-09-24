import { useState } from "react";
import { useStore } from "utils/store";
import Input from "components/Input";
import CenterLayout from "components/CenterLayout";
import FullScreenMessage from "components/FullScreenMessage";
import ResponseGallery from "components/ResponseGallery";

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
  <FullScreenMessage message="Users are submitting responses" />
);

const SelectWinner = () => {
  const activeRound = useStore((state) => state.rounds[state.activeRound]);
  const setWinner = useStore((state) => state.setWinner);

  return (
    <CenterLayout>
      <h3 className="mb-1 text-xl font-bold text-gray-900">
        {activeRound.prompt}
      </h3>
      <ResponseGallery
        responses={activeRound.responses}
        onClick={(id) => {
          setWinner({ id });
        }}
      />
    </CenterLayout>
  );
};

const Complete = () => (
  <FullScreenMessage message="Please wait for next round to begin." />
);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Prompt,
  Response,
  Winner: SelectWinner,
  Complete,
};
