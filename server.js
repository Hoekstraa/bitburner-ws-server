import { setupWatch } from "./fileWatch.mjs";
import * as settings from "./settings.mjs";
import { setupSocket } from "./webSocket.mjs";
import signal from "signal-js";
import { fileChangeEventToMsg, fileRemovalEventToMsg } from "./messageGenerators.mjs";

const watch = await setupWatch(signal);
const socket = setupSocket(signal);

signal.on("socket message received", msg => signal.emit("send socket message", "Server received " + msg));
signal.on("fileChange", fileEvent => console.log(fileEvent.path + " changed"));
signal.on("fileChange", fileEvent => signal.emit("send socket message", fileChangeEventToMsg(fileEvent)));


if(settings.allowDeletingFiles)
    signal.on("fileDeletion", fileEvent => 
        signal.emit("send socket message", fileRemovalEventToMsg(fileEvent)));

console.log(`Server is ready, running on ${settings.port}!`)

process.on('SIGINT', function() {
    console.log("Shutting down!");

    watch.close();
    socket.close();
    process.exit();
});
