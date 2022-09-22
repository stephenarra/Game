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

const Wrapper = () => {
  const router = useRouter();
  const { id } = router.query;
  const { room, error } = useRoom(id as string);

  if (error) {
    return <div>{error}</div>;
  }

  if (!room) return null;

  return (
    <StoreProvider room={room}>
      <Room />
    </StoreProvider>
  );
};

export default Wrapper;
