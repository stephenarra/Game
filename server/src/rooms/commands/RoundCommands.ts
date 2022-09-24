import { Command } from "@colyseus/command";
import { Client } from "colyseus";
import { GameRoom } from "../GameRoom";
import { Image } from "../schema/Image";
import { BaseImage } from "../../../../types/Game";
import { uniqueId } from "lodash";

type Payload = {
  client: Client;
  message: string;
};

type SetResponsePayload = {
  client: Client;
  data: BaseImage;
};

type SetWinnerPayload = {
  client: Client;
  id: string;
};

const POINTS_TO_WIN = 2;

export class SetPromptCommand extends Command<GameRoom, Payload> {
  execute(data: Payload) {
    const { client, message } = data;
    const activeRound = this.state.rounds[this.state.activeRound];

    if (!activeRound) {
      throw new Error("no active round.");
    }

    if (activeRound.leader !== client.sessionId) {
      throw new Error("round leader must set prompt");
    }

    activeRound.prompt = message;
    activeRound.status = "response";
  }
}

export class SetResponseCommand extends Command<GameRoom, SetResponsePayload> {
  execute(payload: SetResponsePayload) {
    const { client, data } = payload;
    const activeRound = this.state.rounds[this.state.activeRound];

    if (!activeRound) {
      throw new Error("no active round.");
    }

    if (activeRound.leader === client.sessionId) {
      throw new Error("round leader can't set response");
    }

    if (activeRound.playerResponses.has(client.sessionId)) {
      throw new Error("user has already submitted a response");
    }

    activeRound.playerResponses.add(client.sessionId);
    activeRound.responses.set(
      uniqueId("res"),
      new Image(data, this.state.activeRound, client.sessionId)
    );
    if (activeRound.responses.size === activeRound.playerCount - 1) {
      activeRound.status = "select_winner";
    }
  }
}

export class SetWinnerCommand extends Command<GameRoom, SetWinnerPayload> {
  execute(data: SetWinnerPayload) {
    const { client, id } = data;
    const activeRound = this.state.rounds[this.state.activeRound];

    if (!activeRound) {
      throw new Error("no active round.");
    }

    if (activeRound.leader !== client.sessionId) {
      throw new Error("round leader must set winner.");
    }

    const response = activeRound.responses.get(id);

    // user or response? // response.owner;
    activeRound.winner = id;
    activeRound.status = "complete";

    // hack to run filters on images
    // see: https://github.com/colyseus/schema/issues/102
    activeRound.responses.forEach((img) => {
      img["$changes"].touch(0);
    });

    const winner = this.state.players.get(response.owner);
    winner.points += 1;

    if (winner.points >= POINTS_TO_WIN) {
      this.state.status = "complete";
    }
  }
}
