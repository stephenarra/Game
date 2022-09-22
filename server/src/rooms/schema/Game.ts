import { Schema, type, MapSchema, ArraySchema } from "@colyseus/schema";
import { Player } from "./Player";
import { Round } from "./Round";
import { GameSchema } from "../../../../types/Game";

export class Game extends Schema implements GameSchema {
  @type("string")
  status: string = "lobby";

  @type({ map: Player })
  players = new MapSchema<Player>();

  @type(["string"])
  playerList = new ArraySchema<string>();

  @type("string")
  serverSession: string; // session of shared game board

  @type("string")
  leader: string; // session of leader (can start game)

  @type([Round])
  rounds = new ArraySchema<Round>();

  @type("number")
  activeRound: number;
}
