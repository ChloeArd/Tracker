const {contextBridge, ipcRenderer} = require("electron");
let onOpenDialogMenuItemClick = null;

contextBridge.exposeInMainWorld("menu", {
    "onOpenDialogClick": (fn) => ipcRenderer.on("open-dialog-clicked", fn)
});

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    ipcRenderer.send("show-context-menu");
});

contextBridge.exposeInMainWorld("notification", {
    show: (config, callable) => {
        ipcRenderer.send("show-notification", config);
        ipcRenderer.once("show-notification-clicked", callable);
    }
})