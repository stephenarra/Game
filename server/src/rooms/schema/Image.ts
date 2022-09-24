import { Schema, type, filter } from "@colyseus/schema";
import { Client } from "colyseus";
import { ImageSchema, GameSchema, BaseImage } from "../../../../types/Game";

export class Image extends Schema implements ImageSchema {
  @type("string")
  id: string;

  @type("string")
  title: string;

  @type("string")
  url: string;

  @type("number")
  width: number;

  @type("number")
  height: number;

  @type("number")
  round: number;

  // this is an image response
  // no one should know the owner, until a winner is selected
  @filter(function (
    this: Image,
    _client: Client,
    _value: Image["owner"],
    root: GameSchema
  ) {
    const round = root.rounds[this.round];
    return round.status === "complete";
  })
  @type("string")
  owner: string;

  constructor(
    { id, title, url, width, height }: BaseImage,
    round: number,
    owner: string
  ) {
    super();
    this.id = id;
    this.title = title;
    this.url = url;
    this.width = width;
    this.height = height;
    this.round = round;
    this.owner = owner;
  }
}
