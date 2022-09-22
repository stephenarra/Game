import { Command } from "@colyseus/command";
import { Client } from "colyseus";
import { GameRoom } from "../GameRoom";

type Payload = {
  client: Client;
  name: string;
  avatar: string;
};

export class PlayerUpdateCommand extends Command<GameRoom, Payload> {
  execute(data: Payload) {
    const { client, name, avatar } = data;

    const player = this.room.state.players.get(client.sessionId);
    if (!player) return;
    player.name = name;
    player.avatar = avatar;
    player.status = "ready";
  }
}
