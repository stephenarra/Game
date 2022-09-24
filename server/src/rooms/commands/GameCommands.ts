import { Command } from "@colyseus/command";
import { Client } from "colyseus";
import { GameRoom } from "../GameRoom";

import { Player } from "../schema/Player";
import { Round } from "../schema/Round";

type Payload = {
  client: Client;
};

export class CreatePlayerCommand extends Command<GameRoom, Payload> {
  execute(data: Payload) {
    const { client } = data;

    this.state.players.set(client.sessionId, new Player());
    this.state.playerList.push(client.sessionId);

    // set user to leader if first to join room
    if (this.state.players.size === 1) {
      this.state.leader = client.sessionId;
    }
  }
}

export class RemovePlayerCommand extends Command<GameRoom, Payload> {
  execute(data: Payload) {
    const { client } = data;

    this.state.players.delete(client.sessionId);
    this.state.playerList = this.state.playerList.filter(
      (id) => id !== client.sessionId
    );

    // reassign leader
    if (this.state.leader === client.sessionId) {
      this.state.leader = this.state.playerList[0];
    }
  }
}

// general command to move game state forward, representing some sort of confirmation dialog
// eg. start round, finish game
export class NextScreenCommand extends Command<GameRoom, Payload> {
  execute(data: Payload) {
    const { client } = data;

    // just allow all actions for gameboard or leader for now
    if (
      client.sessionId !== this.state.leader &&
      client.sessionId !== this.state.serverSession
    ) {
      throw new Error("access denied: leader or game board only");
    }

    const isGameComplete = this.state.status === "complete";
    if (isGameComplete) {
      // return to lobby and clear rounds and scores
      this.state.status = "lobby";
      this.state.rounds.clear();
      this.state.activeRound = null;
      this.state.players.forEach((player) => {
        player.points = 0;
      });
      return;
    }

    // start next round
    const existingRound =
      this.state.rounds.length && this.state.rounds[this.state.activeRound];
    if (existingRound && existingRound.status !== "complete") {
      throw new Error("current round is not complete");
    }

    let nextLeaderIndex = 0;
    if (existingRound?.leader) {
      nextLeaderIndex =
        this.state.playerList.findIndex((id) => id === existingRound.leader) +
        1;
      if (nextLeaderIndex >= this.state.playerList.length) {
        nextLeaderIndex = 0;
      }
    }
    const nextLeader = this.state.playerList[nextLeaderIndex];

    this.state.rounds.push(new Round(nextLeader, this.state.players.size));
    this.state.activeRound = this.state.rounds.length - 1;
    this.state.status = "playing";
  }
}

export class SetServerSessionCommand extends Command<GameRoom, Payload> {
  execute(data: Payload) {
    const { client } = data;

    this.state.serverSession = client.sessionId;
  }
}
