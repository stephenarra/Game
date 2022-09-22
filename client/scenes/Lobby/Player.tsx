import { useState } from "react";
import Image from "next/image";
import Input from "components/Input";
import { useStore, isGameLeaderSelector } from "utils/store";

import LeaderControls from "components/LeaderControls";

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const getAvatar = () =>
  `https://avatars.dicebear.com/api/bottts/user${randomIntFromInterval(
    1,
    20
  )}.svg`;

const PlayerForm = () => {
  const updatePlayer = useStore((state) => state.updatePlayer);
  const user = useStore((state) => state.players[state.sessionId]);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [avatar, setAvatar] = useState(user.avatar || getAvatar());

  async function updateProfile() {
    setLoading(true);
    updatePlayer({ name, avatar });
    setLoading(false);
  }

  if (!user) return null;

  return (
    <div>
      <div className="flex justify-center">
        <Image
          src={avatar}
          alt=""
          width={100}
          height={100}
          onClick={() => {
            setAvatar(getAvatar());
          }}
        />
      </div>
      <Input title="Name" value={name} onChange={setName} placeholder="" />
      <div>
        <button
          className="block w-full btn btn-primary"
          onClick={() => updateProfile()}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Join"}
        </button>
      </div>
    </div>
  );
};

const PlayerInfo = () => {
  const { name, avatar } = useStore((state) => state.players[state.sessionId]);
  return (
    <div className="flex flex-col items-center p-4 m-2">
      <Image src={avatar} alt="" width={100} height={100} />
      <h3 className="my-2 text-xl font-bold text-gray-900">{name}</h3>
    </div>
  );
};

const Lobby = () => {
  const isGameLeader = useStore(isGameLeaderSelector);
  const userStatus = useStore((state) => state.players[state.sessionId].status);

  if (userStatus === "joining") {
    return <PlayerForm />;
  }

  // todo: show info with edit button
  if (userStatus === "ready") {
    return (
      <div>
        <PlayerInfo />
        {!!isGameLeader && <LeaderControls />}
      </div>
    );
  }
};

const Wrapper = () => (
  <div className="flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
    <div className="w-full max-w-md">
      <Lobby />
    </div>
  </div>
);

export default Wrapper;
