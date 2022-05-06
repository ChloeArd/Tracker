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
      label: "Fichier",
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideOthers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' },
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            { role: 'delete' },
            { type: 'separator' },
            { role: 'selectAll' },
            { role: 'reload' },
            { role: 'forceReload' },
            { role: 'toggleDevTools' },
            { type: 'separator' },
            { role: 'resetZoom' },
            { role: 'zoomIn' },
            { role: 'zoomOut' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    },
    {
        label: "Actions",
        submenu: [
            {
                label: "Aller sur Google",
                accelerator: "ctrl+g",
                click: () => openBrowserContent("https://www.google.fr")
            },
            {
                label: "Afficher un message",
                accelerator: "ctrl+m",
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
                accelerator: "ctrl+s",
                click: () => {
                    const file = dialog.showSaveDialogSync(mainWindow, {
                        // blabla vos options
                    })
                },
                submenu: [
                    {
                        label: "Maintenant",
                        submenu: [
                            {
                                label: "OK",
                                type: "checkbox",
                                checked: true
                            },
                            {
                                label: "NOK",
                                type: "checkbox",
                                checked: true
                            }
                        ]
                    },
                    {label: "Demain"},
                    {label: "Si j'ai envie"},
                    {label: "On verra !"}
                ]
            },
            {
                label: "Afficher 'openDialog'",
                accelerator: "ctrl+o",
                click: () => {
                    mainWindow.webContents.send("open-dialog-clicked");
                }
            }
        ],
    }
];

const applicationMenu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(applicationMenu);

// Contextual menu
const contextualMenuTemplate = [
    {
        label: "Menu contextuel 1",
        click: () => console.log("Menu contextuel 1 clicked")
    }
];

const contextualMenu = Menu.buildFromTemplate(contextualMenuTemplate);


// Affichage du menu contextuel
ipcMain.on("show-context-menu", (event) => contextualMenu.popup(mainWindow));