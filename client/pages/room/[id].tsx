import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useClient } from "utils/clientContext";
import { StoreProvider, useStore } from "utils/store";

import Lobby from "scenes/Lobby";
import Game from "scenes/Game";
import Complete from "scenes/Complete";

const useRoom = (id: string) => {
  const [error, setError] = useState();
  const { room, join } = useClient();

  useEffect(() => {
    (async () => {
      if (!room && id) {
        try {
          await join(id);
        } catch (e) {
          setError(e.message);
        }
      }
    })();
  }, [room, join, id]);

  return { error, room };
};

const Room = () => {
  const serverSession = useStore((state) => state.serverSession);
  const status = useStore((state) => state.status);

  // // joining a room doesn't start with full data
  if (!serverSession) return null;

  return (
    <>
      {status === "lobby" && <Lobby />}
      {status === "playing" && <Game />}
      {status === "complete" && <Complete />}
    </>
  );
};

const BackHome = ({ error }: { error: string }) => {
  const { leave } = useClient();
  return (
    <div className="flex items-center justify-center h-full min-h-full px-4 py-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <h3 className="mb-1 text-xl font-bold text-center text-gray-900">
          {error}
        </h3>
        <button className="block w-full btn btn-primary" onClick={leave}>
          Back Home
        </button>
      </div>
    </div>
  );
};

const Wrapper = () => {
  const router = useRouter();
  const { id } = router.query;
  const { room, error } = useRoom(id as string);

  if (error) {
    return <BackHome error={error} />;
  }

  if (!room) return null;

  return (
    <StoreProvider room={room}>
      <Room />
    </StoreProvider>
  );
};

export default Wrapper;
