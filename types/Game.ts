// maintaining two types so the client can used the serialized version
import { Schema, ArraySchema, MapSchema } from "@colyseus/schema";

export interface Player {
  status: "joining" | "ready";
  name: string;
  avatar: string;
  points: number;
  connected: boolean;
}

export interface PlayerSchema extends Schema, Omit<Player, "status"> {
  status: string;
}

export interface Round {
  status: "prompt" | "response" | "select_winner" | "complete";
  leader: string;
  prompt: string;
  playerCount: number;
  responses: { [key: string]: string };
  responseCount: number;
  winner: string;
}

export interface RoundSchema
  extends Schema,
    Omit<Round, "status" | "responses"> {
  status: string;
  responses: MapSchema<string>;
}

export interface Game {
  status: "lobby" | "playing" | "complete";
  players: { [key: string]: Player };
  playerList: string[];
  serverSession: string;
  leader: string;
  rounds: Round[];
  activeRound: number;
}

export interface GameSchema
  extends Schema,
    Omit<Game, "status" | "players" | "playerList" | "rounds"> {
  status: string;
  players: MapSchema<PlayerSchema>;
  playerList: ArraySchema<string>;
  rounds: ArraySchema<RoundSchema>;
}
