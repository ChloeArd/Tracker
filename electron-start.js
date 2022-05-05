const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

const ipcDialog = require('./main/dialog');
const ipcFile = require('./main/files');
const ipcLogger = require('./main/logger');

// Create the Browser Window and load the main html entry point.
let mainWindow = null;
const makeWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 600,
        center: true,
        title: "CTrack",
        icon: path.resolve(__dirname + "/assets/icon.png"),
        webPreferences: {
            preload: `${__dirname}/preload.js`
        }
    });

    mainWindow.webContents.openDevTools();
    mainWindow.loadFile('src/index.html');
};

// Create app when electron is ready.
app.whenReady().then(() => {
    makeWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            makeWindow()
        }
    })
});

// Closing app if all windows are closed BUT MacOs.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

ipcDialog.init(mainWindow, ipcMain);
ipcFile.init(mainWindow, ipcMain);
ipcLogger.init(ipcMain);

const openBrowserContent = (url) => {
    const browser = new BrowserWindow({parent: mainWindow});
    browser.loadURL(url);
}

const menuTemplate = [
    {
        label: "Actions",
        submenu: [
            {
                label: "Aller sur Google",
                click: () => openBrowserContent("https://www.google.fr")
            },
            {
                label: "Afficher un message",
                click: () =>  {
                    dialog.showMessageBox(mainWindow, {
                        title: "Hello World !",
                        message: "Ceci est un simple Hello world"
                    })
                }
            }
        ],
    },
    {
        label: "Réactions",
        submenu: [
            {
                label: "Afficher 'saveDialog'",
                click: () => {
                    const file = dialog.showSaveDialogSync(mainWindow, {
                        // blabla vos options
                    })
                }
            },
            {
                label: "Afficher 'openDialog'",
                click: () => console.log("hello world")
            }
        ],
    }
];

const applicationMenu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(applicationMenu);