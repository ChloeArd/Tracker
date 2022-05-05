const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('dialog', {
    showMessageBox: async config => {
        const defaultCfg = {
            title: 'Message',
            type: 'question',
            buttons: ['Ok'],
            cancelId: 0,
            defaultId: 0,
        };
        return ipcRenderer.invoke('showMessageBox', {...defaultCfg, ...config});
    },

    showWarningBox: async config => {
        const defaultCfg = {
            title: 'Attention',
            type: 'warning',
        };
        return ipcRenderer.invoke('showMessageBox', {...defaultCfg, ...config});
    },

    showInfoBox: async config => {
        const defaultCfg = {
            title: "Information",
            type: 'info'
        }
        return ipcRenderer.invoke('showMessageBox', {...defaultCfg, ...config});
    },

    showErrorBox: async (title, content) => ipcRenderer.invoke('showErrorBox', {title, content})
})
