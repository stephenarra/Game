import { Command } from "@colyseus/command";
import { Client } from "colyseus";
import { GameRoom } from "../GameRoom";

type Payload = {
  client: Client;
  message: string;
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

export class SetResponseCommand extends Command<GameRoom, Payload> {
  execute(data: Payload) {
    const { client, message } = data;
    const activeRound = this.state.rounds[this.state.activeRound];

    if (!activeRound) {
      throw new Error("no active round.");
    }

    if (activeRound.leader === client.sessionId) {
      throw new Error("round leader can't set response");
    }

    activeRound.responses.set(client.sessionId, message);
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

    activeRound.winner = id;
    activeRound.status = "complete";

    const winner = this.state.players.get(id);
    winner.points += 1;

    if (winner.points >= POINTS_TO_WIN) {
      this.state.status = "complete";
    }
  }
}
