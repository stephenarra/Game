import { Schema, type, MapSchema, SetSchema } from "@colyseus/schema";
import { RoundSchema } from "../../../../types/Game";
import { Image } from "./Image";

export class Round extends Schema implements RoundSchema {
  @type("string")
  status: string = "prompt";

  @type("string")
  leader: string;

  @type("number")
  playerCount: number;

  @type("string")
  prompt: string;

  // set of players that have responded
  @type({ set: "string" })
  playerResponses = new SetSchema<string>();

  @type({ map: Image })
  responses = new MapSchema<Image>();

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
