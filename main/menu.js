import {contextBridge, ipcRenderer} from "electron";

contextBridge.exposeInMainWorld("menu", {
    "onOpenDialogClick": (fn) => ipcRenderer.on("open-dialog-clicked", fn)
});

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    ipcRenderer.send("show-context-menu");
})