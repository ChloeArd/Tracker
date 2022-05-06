const {contextBridge, ipcRenderer} = require("electron");

const logError = (message, level) => {
    ipcRenderer.send('log', { type: 'error', message: message });
};

const logSuccess = (message) => {
    ipcRenderer.send('log', { type: 'success', message: message });
}



contextBridge.exposeInMainWorld('logger', {
    'error': logError,
    'success': logSuccess,
});