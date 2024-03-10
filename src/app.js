/**
 * @author MenakiVT
 * @license CC-BY-NC 4.0 - https://creativecommons.org/licenses/by-nc/4.0
 */

const { app, ipcMain, nativeTheme } = require('electron');
const { Microsoft } = require('minecraft-java-core');
const { autoUpdater } = require('electron-updater')
const clientId = '1216217682894913626';
 const DiscordRPC = require('discord-rpc');
 const RPC = new DiscordRPC.Client({ transport: 'ipc'});
 
 DiscordRPC.register(clientId);

 async function setActivity() {
    if (!RPC) return;
     const newLocal = `link xd`;
    RPC.setActivity({
        details: 'By: Bruchita Studios',
        state: 'Instancia Contersafio 3 ',
        startTimestamp: Date.now(),
        largeImageKey: 'https://media.discordapp.net/attachments/1201597666379964579/1216219110950834176/dd_-_copia.jpg?ex=65ff9750&is=65ed2250&hm=e9c8b6089281fe5993234e758084d3e6c6f8dfca2c331befd316917b3f26c650&=&format=webp&width=473&height=473',
        largeImageText: `Contersafio 3 Launcher`,
        instance: false,
        buttons: [
{
            }
        ]
    });
 };

RPC.on('ready', async () => {
    setActivity();

    setInterval(() => {
        setActivity();
    }, 86400 * 1000);
});

RPC.login({ clientId }).catch(err => console.error(err));

const path = require('path');
const fs = require('fs');

const UpdateWindow = require("./assets/js/windows/updateWindow.js");
const MainWindow = require("./assets/js/windows/mainWindow.js");

let dev = process.env.NODE_ENV === 'dev';

if (dev) {
    let appPath = path.resolve('./data/Launcher').replace(/\\/g, '/');
    let appdata = path.resolve('./data').replace(/\\/g, '/');
    if (!fs.existsSync(appPath)) fs.mkdirSync(appPath, { recursive: true });
    if (!fs.existsSync(appdata)) fs.mkdirSync(appdata, { recursive: true });
    app.setPath('userData', appPath);
    app.setPath('appData', appdata)
}

const gotTheLock = app.requestSingleInstanceLock();

if (!app.requestSingleInstanceLock()) app.quit();
else app.whenReady().then(() => {
    if (dev) return MainWindow.createWindow()
    UpdateWindow.createWindow()
});

ipcMain.on('main-window-open', () => MainWindow.createWindow())
ipcMain.on('main-window-dev-tools', () => MainWindow.getWindow().webContents.openDevTools({ mode: 'detach' }))
ipcMain.on('main-window-dev-tools-close', () => MainWindow.getWindow().webContents.closeDevTools())
ipcMain.on('main-window-close', () => MainWindow.destroyWindow())
ipcMain.on('main-window-reload', () => MainWindow.getWindow().reload())
ipcMain.on('main-window-progress', (event, options) => MainWindow.getWindow().setProgressBar(options.progress / options.size))
ipcMain.on('main-window-progress-reset', () => MainWindow.getWindow().setProgressBar(-1))
ipcMain.on('main-window-progress-load', () => MainWindow.getWindow().setProgressBar(2))
ipcMain.on('main-window-minimize', () => MainWindow.getWindow().minimize())

ipcMain.on('update-window-close', () => UpdateWindow.destroyWindow())
ipcMain.on('update-window-dev-tools', () => UpdateWindow.getWindow().webContents.openDevTools({ mode: 'detach' }))
ipcMain.on('update-window-progress', (event, options) => UpdateWindow.getWindow().setProgressBar(options.progress / options.size))
ipcMain.on('update-window-progress-reset', () => UpdateWindow.getWindow().setProgressBar(-1))
ipcMain.on('update-window-progress-load', () => UpdateWindow.getWindow().setProgressBar(2))

ipcMain.handle('path-user-data', () => app.getPath('userData'))
ipcMain.handle('appData', e => app.getPath('appData'))

ipcMain.on('main-window-hide', () => MainWindow.getWindow().hide())
ipcMain.on('main-window-show', () => MainWindow.getWindow().show())

ipcMain.handle('Microsoft-window', async (_, client_id) => {
    return await new Microsoft(client_id).getAuth();
})

ipcMain.handle('is-dark-theme', (_, theme) => {
    if (theme === 'dark') return true
    if (theme === 'light') return false
    return nativeTheme.shouldUseDarkColors;
})

app.on('window-all-closed', () => app.quit());

const rpc = require('discord-rpc');
let client = new rpc.Client({ transport: 'ipc' });
const pkg = require('../package.json');

let startedAppTime = Date.now();

ipcMain.on('new-status-discord', async () => {
    client.login({ clientId: '1207516304857235546' });
    client.on('ready', () => {
        client.request('SET_ACTIVITY', {
            pid: process.pid,
            activity: {
                details: 'By: Luxfiro Client',
                state: 'En el Menú principal',
                assets: {
                    large_image: 'https://media.discordapp.net/attachments/1201597666379964579/1202481017689210940/Screenshot_20240129_030525_KineMaster.jpg?&format=webp&width=491&height=408',
                    large_text: 'Luxfiro Client',
                },
                timestamps: {
                    start: startedAppTime
                }
            },
        });
    });
});


ipcMain.on('new-status-discord-jugando', async (event, status) => {
    console.log(status)
    if(client) await client.destroy();
    client.login({ clientId: '1207516304857235546' });
    client.on('ready', () => {
        client.request('SET_ACTIVITY', {
            pid: process.pid,
            activity: {
                details: 'By: Luxfiro Client',
                state: status,
                assets: {
                    large_image: 'https://media.discordapp.net/attachments/1201597666379964579/1202481017689210940/Screenshot_20240129_030525_KineMaster.jpg?&format=webp&width=491&height=408',
                    large_text: 'Luxfiro Client',
                },
                timestamps: {
                    start: startedAppTime
                }
            },
        });
    });
});

ipcMain.on('delete-and-new-status-discord', async () => {
    if(client) client.destroy();
    client = new rpc.Client({ transport: 'ipc' });
    client.login({ clientId: '1207516304857235546' });
    client.on('ready', () => {
        client.request('SET_ACTIVITY', {
            pid: process.pid,
            activity: {
                details: 'By: Contersafio 3',
                state: 'Jugando Contersafio 3 Remake',
                assets: {
                    large_image: 'https://media.discordapp.net/attachments/1201597666379964579/1202481017689210940/Screenshot_20240129_030525_KineMaster.jpg?&format=webp&width=491&height=408',
                    large_text: 'Contersafio Launcher',
                },
                    timestamps: {
                        start: startedAppTime
                    }
            },
        });
    });
});

autoUpdater.autoDownload = false;

ipcMain.handle('update-app', async () => {
    return await new Promise(async (resolve, reject) => {
        autoUpdater.checkForUpdates().then(res => {
            resolve(res);
        }).catch(error => {
            reject({
                error: true,
                message: error
            })
        })
    })
})

autoUpdater.on('update-available', () => {
    const updateWindow = UpdateWindow.getWindow();
    if (updateWindow) updateWindow.webContents.send('updateAvailable');
});

ipcMain.on('start-update', () => {
    autoUpdater.downloadUpdate();
})

autoUpdater.on('update-not-available', () => {
    const updateWindow = UpdateWindow.getWindow();
    if (updateWindow) updateWindow.webContents.send('update-not-available');
});

autoUpdater.on('update-downloaded', () => {
    autoUpdater.quitAndInstall();
});

autoUpdater.on('download-progress', (progress) => {
    const updateWindow = UpdateWindow.getWindow();
    if (updateWindow) updateWindow.webContents.send('download-progress', progress);
})

autoUpdater.on('error', (err) => {
    const updateWindow = UpdateWindow.getWindow();
    if (updateWindow) updateWindow.webContents.send('error', err);
});