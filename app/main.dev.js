/* eslint global-require: 1, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 */
import { app, BrowserWindow, Tray, ipcMain } from 'electron';

const windowSize = {
  width: 245,
  height: 180,
};

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS',
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.error);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  let mainWindow = new BrowserWindow({
    alwaysOnTop: true,
    transparent: true,
    frame: false,
    show: false,
    width: windowSize.width,
    height: windowSize.height,
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  let mainTray = new Tray(`${__dirname}/assets/images/tray@2x.png`);

  mainWindow.once('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }

    mainTray.on('click', (e, bounds) => {
      const computedBoundX = Math.round(bounds.x - ((windowSize.width / 2) - (bounds.width / 2)));

      mainWindow.setPosition(computedBoundX, bounds.y);

      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
      }
    });
  });

  mainWindow.on('show', () => {
    mainWindow.webContents.send('_cryptowatch-shown');
  });

  mainWindow.on('hide', () => {
    mainWindow.webContents.send('_cryptowatch-hidden');
  });

  ipcMain.on('_cryptowatch-update-rates', (event, values) => {
    const trayTitles = values.map(x => {
      const key = Object.keys(x)[0];

      return `${key} : ${x[key]}`;
    });

    mainTray.setTitle(trayTitles.join(' | '));
  });


  mainWindow.on('closed', () => {
    mainWindow = null;
    mainTray = null;
  });
});