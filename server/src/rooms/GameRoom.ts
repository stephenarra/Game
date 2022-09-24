import { Room, Client } from "colyseus";
import { Dispatcher } from "@colyseus/command";

import { Game } from "./schema/Game";
import { Message } from "../../../types/Messages";

import { PlayerUpdateCommand } from "./commands/PlayerCommands";
import {
  SetServerSessionCommand,
  NextScreenCommand,
  CreatePlayerCommand,
  RemovePlayerCommand,
} from "./commands/GameCommands";
import {
  SetPromptCommand,
  SetResponseCommand,
  SetWinnerCommand,
} from "./commands/RoundCommands";

export class GameRoom extends Room<Game> {
  private dispatcher = new Dispatcher(this);

  onCreate(options: any) {
    this.setState(new Game());

    this.onMessage(Message.NEXT, (client) => {
      this.dispatcher.dispatch(new NextScreenCommand(), { client });
    });

    this.onMessage(Message.SET_PROMPT, (client, data: { message: string }) => {
      this.dispatcher.dispatch(new SetPromptCommand(), { client, ...data });
    });

    this.onMessage(Message.SET_RESPONSE, (client, data) => {
      this.dispatcher.dispatch(new SetResponseCommand(), { client, data });
    });

    this.onMessage(
      Message.UPDATE_PLAYER,
      (client, message: { name: string; avatar: string }) => {
        this.dispatcher.dispatch(new PlayerUpdateCommand(), {
          client,
          ...message,
        });
      }
    );

    this.onMessage(Message.SET_WINNER, (client, message: { id: string }) => {
      this.dispatcher.dispatch(new SetWinnerCommand(), {
        client,
        ...message,
      });
    });
  }

  // onAuth(client, options, req) {
  //   return true;
  // }

  onJoin(client: Client, options: any) {
    console.log(client.sessionId, "joined!", options);
    if (options.server) {
      this.dispatcher.dispatch(new SetServerSessionCommand(), { client });
    } else {
      this.dispatcher.dispatch(new CreatePlayerCommand(), { client });
    }
  }

  async onLeave(client: Client, consented?: boolean) {
    console.log(client.sessionId, "left!");
    this.state.players.get(client.sessionId).connected = false;

    try {
      if (consented) {
        throw new Error("consented leave");
      }
      await this.allowReconnection(client, 30);
      this.state.players.get(client.sessionId).connected = true;
    } catch (e) {
      // time expired, remove the client
      this.dispatcher.dispatch(new RemovePlayerCommand(), { client });
    }
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
