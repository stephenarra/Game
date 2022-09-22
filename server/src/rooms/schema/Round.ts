import { Schema, type, MapSchema } from "@colyseus/schema";
import { RoundSchema } from "../../../../types/Game";

export class Round extends Schema implements RoundSchema {
  @type("string")
  status: string = "prompt";

  @type("string")
  leader: string;

  @type("number")
  playerCount: number;

  @type("string")
  prompt: string;

  @type({ map: "string" })
  responses = new MapSchema<string>();

  @type("number")
  responseCount: number;

  @type("string")
  winner: string;

  constructor(leader: string = "", playerCount: number) {
    super();
    this.leader = leader;
    this.playerCount = playerCount;
  }
}
