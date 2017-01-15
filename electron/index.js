const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow(){

  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      webSecurity: false
    }
  });
  win.setMenu(null);

  win.loadURL(url.format({
    pathname: path.join(__dirname, '/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  if(process.env.NODE_ENV !== 'production'){

    win.setMenu(null);
    win.webContents.openDevTools();

  }

  win.webContents.on('did-finish-load', () => {
    win.show();
    win.focus();
  });

  win.on('closed', () => {
    win = null
  });

}

app.on('ready', createWindow);

app.on('window-all-closed', () => {

  if(process.platform !== 'darwin'){

    app.quit();

  }

});

app.on('activate', () => {

  if(win === null){

    createWindow();

  }

});
