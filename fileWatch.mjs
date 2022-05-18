import CheapWatch from "cheap-watch";
import * as settings from "./settings.mjs";

function fileFilter(event) {
    if(settings.allowedFiletypes.some(extension => event.path.endsWith(extension)))
        return true;
}

export async function setupWatch(signaller) {

    const watch = new CheapWatch({
        dir: settings.scriptsFolder,
        filter: fileFilter
    });

    watch.on('+', fileEvent => signaller.emit("fileChange", fileEvent));
    watch.on('-', fileEvent => signaller.emit("fileDeletion", fileEvent));

    // Wait 'till filewatcher is ready to go
    await watch.init();

    return watch;
}