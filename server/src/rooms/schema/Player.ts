import { Schema, type } from "@colyseus/schema";
import { PlayerSchema } from "../../../../types/Game";

export class Player extends Schema implements PlayerSchema {
  @type("string")
  status: string;

  @type("boolean")
  connected: boolean;

  @type("string")
  name: string;

  @type("string")
  avatar: string;

  @type("number")
  points: number;

  constructor(name: string = "", avatar: string = "") {
    super();
    this.status = "joining";
    this.name = name;
    this.avatar = avatar;
    this.points = 0;
  }
}
