// Logger events.

const ipcLogger = {
    init: ipcMain => {
        ipcMain.on('log', (event, arg) => {
            if ('type' in arg && 'message' in arg) {
                console.table(arg);
                console.log(`Type: ${arg.type} => message: ${arg.message}`);
            } else {
                console.error('Une erreur inconnue a été reportée par un des Render process');
            }
        });
    }
}

module.exports = ipcLogger;
