import { WebSocketServer } from 'ws';
import * as settings from "./settings.mjs";

export function setupSocket(signaller){

    const wss = new WebSocketServer({ port: settings.port });

    wss.on('connection', function connection(ws) {
      ws.on('message', function message(data) {
        signaller.emit("socket message received", data);
      });

      signaller.on("send socket message", data => ws.send(data));
    });

    return wss;
}