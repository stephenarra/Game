import { useState } from "react";
import { useClient } from "utils/clientContext";
import Router from "next/router";
import Input from "components/Input";

const Home = () => {
  const [error, setError] = useState("");
  const [roomId, setRoomId] = useState("");
  const { create, join } = useClient();

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <h3 className="mb-4 text-2xl font-bold text-center text-gray-700">
          GIF Game
        </h3>
        <Input title="Room Code" value={roomId} onChange={setRoomId} />
        <button
          disabled={!roomId}
          onClick={async () => {
            try {
              const room = await join(roomId);
              Router.push(`/room/${room.id}`);
            } catch (e) {
              setError(e.message);
            }
          }}
          className="block w-full btn btn-primary"
        >
          Join
        </button>
        <hr className="my-10" />
        <div>
          <button
            className="w-full btn btn-white"
            onClick={async () => {
              const room = await create();
              Router.push(`/room/${room.id}`);
            }}
          >
            Create New Party
          </button>
        </div>
        <div>{!!error && <div>{error}</div>}</div>
      </div>
    </div>
  );
};

export default Home;
