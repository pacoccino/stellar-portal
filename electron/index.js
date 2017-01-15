const { app, BrowserWindow, protocol, Menu } = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow(){

  win = new BrowserWindow({
    width: 1500,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      webSecurity: true,
    }
  });

  const template = [{
    label: "Application",
    submenu: [
      { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
      { type: "separator" },
      { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
    ]}, {
    label: "Edit",
    submenu: [
      { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
      { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
      { type: "separator" },
      { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
      { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
      { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
      { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
    ]}
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));

  // win.setMenu(null);

  protocol.interceptFileProtocol('file', function(req, callback) {
    const url = req.url.substr(7);
    callback({path: path.normalize(path.join(__dirname, 'app', url))})
  });

  win.loadURL(url.format({
    pathname: 'index.html',
    protocol: 'file:',
    slashes: true
  }));

  // win.webContents.openDevTools();

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
