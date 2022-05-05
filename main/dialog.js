const {dialog} = require('electron');

const ipcDialog = {

    init: (mainWindow, ipcMain) => {

        // Simple message dialog.
        ipcMain.handle('showMessageBox', (event, arg) => dialog.showMessageBox(mainWindow, arg));

        // Error dialog.
        ipcMain.handle('showErrorBox', (event, arg) => {
            if ('title' in arg && 'content' in arg) {
                return dialog.showErrorBox(arg.title, arg.content)
            }
        });
    }
}

module.exports = ipcDialog;

