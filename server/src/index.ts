import { Server } from "colyseus";
import { createServer } from "http";
import express from "express";
import cors from "cors";
import { GameRoom } from "./rooms/GameRoom";
import dotenv from "dotenv";
dotenv.config();
import { WebSocketTransport } from "@colyseus/ws-transport";
import path from "path";

const port = Number(process.env.PORT) || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.send({ status: true });
});

app.get("/health", (req, res) => {
  res.json({ status: true });
});

const gameServer = new Server({
  transport: new WebSocketTransport({
    server: createServer(app),
    // presence: new RedisPresence()
    // pingInterval: ...,
    // pingMaxRetries: ...,
    // verifyClient: ...
  }),
});

console.log("Listening on port:", port);
gameServer.listen(port);
gameServer.onShutdown(() => {
  console.log("Server Shutdown");
});

gameServer
  .define("game", GameRoom)
  .on("create", (room) => console.log("room created:", room.roomId))
  .on("dispose", (room) => console.log("room disposed:", room.roomId))
  .on("join", (room, client) => console.log(client.id, "joined", room.roomId))
  .on("leave", (room, client) => console.log(client.id, "left", room.roomId));
