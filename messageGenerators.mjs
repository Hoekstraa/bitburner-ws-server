import * as fs from "fs";

export function fileChangeEventToMsg({path, stats, isNew}){
    const message = {
        "context":"file",
        "action":"push",
        "filename":path,
        "content":fs.readFileSync(path).toString(),
    }
    return JSON.stringify(message);
}

export function fileRemovalEventToMsg({path, stats}){
    const message = {
        "context":"file",
        "action": "remove",
        "filename": path,
    }
    return JSON.stringify(message);
}

