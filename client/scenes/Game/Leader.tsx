import { useState } from "react";
import { useStore } from "utils/store";
import Input from "components/Input";
import CenterLayout from "components/CenterLayout";
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
  <CenterLayout>Users are submitting responses</CenterLayout>
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

const Complete = () => <CenterLayout>Complete</CenterLayout>;

export default {
  Prompt,
  Response,
  Winner: SelectWinner,
  Complete,
};
