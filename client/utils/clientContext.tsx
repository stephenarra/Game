import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
} from "react";
import { Client, Room } from "colyseus.js";

interface ClientContextInterface {
  client: Client | undefined;
  room: Room | undefined;
  connect: () => Promise<Room>;
  join: (roomId: string) => Promise<Room>;
  reconnect: (roomId: string, sessionId: string) => Promise<Room>;
  create: () => Promise<Room>;
}

const ROOM_NAME = "game";

const ClientContext = createContext<ClientContextInterface>(
  {} as ClientContextInterface
);

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [room, setRoom] = useState<ClientContextInterface["room"]>(undefined);
  const client = useMemo(() => new Client("ws://localhost:3002"), []);

  const output = {
    room,
    client,
    connect: async () => {
      const room = await client.joinOrCreate(ROOM_NAME);
      localStorage.setItem("roomId", room.id);
      localStorage.setItem("sessionId", room.sessionId);
      setRoom(room);
      return room;
    },
    // join: async (roomId: string) => {
    //   const room = await client.joinById(roomId);
    //   localStorage.setItem("roomId", room.id);
    //   localStorage.setItem("sessionId", room.sessionId);
    //   setRoom(room);
    //   return room;
    // },
    join: async (roomId: string) => {
      let room: Room;
      const key = `roomSession${roomId}`;
      if (localStorage.getItem(key)) {
        try {
          room = await client.reconnect(roomId, localStorage.getItem(key));
        } catch (e) {
          // reconnect may not be successful, try to join with new session.
          room = await client.joinById(roomId);
        }
      } else {
        room = await client.joinById(roomId);
      }

      localStorage.setItem(key, room.sessionId);
      setRoom(room);
      return room;
    },
    reconnect: async (roomId: string, sessionId: string) => {
      const room = await client.reconnect(roomId, sessionId);
      setRoom(room);
      return room;
    },
    create: async () => {
      const room = await client.create(ROOM_NAME, { server: true });
      setRoom(room);
      return room;
    },
  };

  return (
    <ClientContext.Provider value={output}>{children}</ClientContext.Provider>
  );
};

export const useClient = () => useContext(ClientContext);
