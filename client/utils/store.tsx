import { createStore, StoreApi, useStore as useZustandStore } from "zustand";
import { useContext, createContext, useRef, useMemo } from "react";
import { Message } from "game-types/Messages";
import { Game } from "game-types/Game";

import { Room } from "colyseus.js";

interface GameState extends Game {
  roomId: string;
  sessionId: string;
  next: () => void;
  updatePlayer: (data: { name: string; avatar: string }) => void;
  setPrompt: (data: { message: string }) => void;
  setResponse: (data: { message: string }) => void;
  setWinner: (data: { id: string }) => void;
}

const createGameStore = (room: Room) => {
  const initialState = {
    roomId: room.id,
    sessionId: room.sessionId,
    ...room.state.toJSON(),
  };

  const store = createStore<GameState>()((set, get) => ({
    next: () => {
      room.send(Message.NEXT);
    },
    updatePlayer: (data: { name: string; avatar: string }) => {
      room.send(Message.UPDATE_PLAYER, data);
    },
    setPrompt: (data: { message: string }) => {
      room.send(Message.SET_PROMPT, data);
    },
    setResponse: (data: { message: string }) => {
      room.send(Message.SET_RESPONSE, data);
    },
    setWinner: (data: { player: string }) => {
      room.send(Message.SET_WINNER, data);
    },
    ...initialState,
  }));

  room.onStateChange((newState) => {
    store.setState({
      ...store.getState(),
      ...newState.toJSON(),
    });
  });

  room.onError((code, message) => {
    console.error("SOCKET ERROR", code, message);
  });

  room.onLeave((code) => {
    console.log("Left Room", code);
  });

  return store;
};

export const StoreContext = createContext<StoreApi<GameState> | null>(null);

export const StoreProvider = ({ room, children }) => {
  const store = useMemo(() => createGameStore(room), [room]);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export function useStore(): GameState;
export function useStore<T>(
  selector: (store: GameState) => T,
  equalityFn?: (left: T, right: T) => boolean
): T;
export function useStore<T>(
  selector?: (store: GameState) => T,
  equalityFn?: (left: T, right: T) => boolean
) {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("StoreContext is not provided");
  }
  return useZustandStore(store, selector as any, equalityFn);
}

// selectors
export const isGameBoardSelector = (state: GameState) =>
  state.sessionId === state.serverSession;

export const isGameLeaderSelector = (state: GameState) =>
  state.sessionId === state.leader;
