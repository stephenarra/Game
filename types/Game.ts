// maintaining two types so the client can used the serialized version
import { Schema, ArraySchema, MapSchema, SetSchema } from "@colyseus/schema";

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
  responses: { [key: string]: Image };
  playerResponses: string[];
  responseCount: number;
  winner: string;
}

export interface RoundSchema
  extends Schema,
    Omit<Round, "status" | "responses" | "playerResponses"> {
  status: string;
  responses: MapSchema<ImageSchema>;
  playerResponses: SetSchema<string>;
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

export interface BaseImage {
  id: string;
  title: string;
  url: string;
  width: number;
  height: number;
}

export interface Image extends BaseImage {
  round: number;
  owner: string;
}

export interface ImageSchema extends Schema, Image {}
