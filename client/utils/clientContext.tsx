import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
} from "react";
import Router from "next/router";
import { Client, Room } from "colyseus.js";

interface ClientContextInterface {
  client: Client | undefined;
  room: Room | undefined;
  join: (roomId: string) => Promise<Room>;
  leave: () => void;
  create: () => Promise<Room>;
}

const ROOM_NAME = "game";
const API_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "wss://gif-game-server.fly.dev"; // ws://localhost:3002
const SESSION_KEY = "roomSession";

const ClientContext = createContext<ClientContextInterface>(
  {} as ClientContextInterface
);

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [room, setRoom] = useState<ClientContextInterface["room"]>(undefined);
  const client = useMemo(() => new Client(API_URL), []);

  const output = {
    room,
    client,
    join: async (roomId: string) => {
      let room: Room;
      if (localStorage.getItem(SESSION_KEY)) {
        try {
          room = await client.reconnect(
            roomId,
            localStorage.getItem(SESSION_KEY)
          );
        } catch (e) {
          // reconnect may not be successful, try to join with new session.
          room = await client.joinById(roomId);
        }
      } else {
        room = await client.joinById(roomId);
      }

      localStorage.setItem(SESSION_KEY, room.sessionId);
      setRoom(room);
      return room;
    },
    create: async () => {
      const room = await client.create(ROOM_NAME, { server: true });
      localStorage.setItem(SESSION_KEY, room.sessionId);
      setRoom(room);
      return room;
    },
    leave: async () => {
      localStorage.removeItem(SESSION_KEY);
      if (room?.leave) {
        await room.leave(true);
      }
      setRoom(null);
      Router.push("/");
    },
  };

  return (
    <ClientContext.Provider value={output}>{children}</ClientContext.Provider>
  );
};

export const useClient = () => useContext(ClientContext);
