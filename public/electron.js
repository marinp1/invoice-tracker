const {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  Menu,
  TouchBar,
  Tray,
  session,
} = require('electron');

const {
  TouchBarButton,
  TouchBarLabel,
  TouchBarSpacer
} = TouchBar;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;
let tray;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    backgroundColor: '#F7F7F7',
    minWidth: 880,
    show: false,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + '/preload.js',
    },
    height: 860,
    width: 1280,
    icon: path.join(__dirname, 'assets/icons/main/logo.png'),
  });

  mainWindow.loadURL(
    isDev ?
    'http://localhost:3000' :
    `file://${path.join(__dirname, '../build/index.html')}`,
  );

  if (isDev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS,
    } = require('electron-devtools-installer');

    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => {
        console.log(`Added Extension: ${name}`);
      })
      .catch(err => {
        console.log('An error occurred: ', err);
      });

    installExtension(REDUX_DEVTOOLS)
      .then(name => {
        console.log(`Added Extension: ${name}`);
      })
      .catch(err => {
        console.log('An error occurred: ', err);
      });
  }

  mainWindow.once('ready-to-show', () => {

    mainWindow.show();

    ipcMain.on('open-external-window', (event, arg) => {
      shell.openExternal(arg);
    });
  });
};

const generateMenu = () => {
  const template = [{
      label: 'File',
      submenu: [{
        role: 'about'
      }, {
        role: 'quit'
      }],
    },
    {
      label: 'Edit',
      submenu: [{
          role: 'undo'
        },
        {
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          role: 'cut'
        },
        {
          role: 'copy'
        },
        {
          role: 'paste'
        },
        {
          role: 'pasteandmatchstyle'
        },
        {
          role: 'delete'
        },
        {
          role: 'selectall'
        },
      ],
    },
    {
      label: 'View',
      submenu: [{
          role: 'reload'
        },
        {
          role: 'forcereload'
        },
        {
          role: 'toggledevtools'
        },
        {
          type: 'separator'
        },
        {
          role: 'resetzoom'
        },
        {
          role: 'zoomin'
        },
        {
          role: 'zoomout'
        },
        {
          type: 'separator'
        },
        {
          role: 'togglefullscreen'
        },
      ],
    },
    {
      role: 'window',
      submenu: [{
        role: 'minimize'
      }, {
        role: 'close'
      }],
    },
    {
      role: 'help',
      submenu: [{
          click() {
            require('electron').shell.openExternal(
              'https://getstream.io/winds',
            );
          },
          label: 'Learn More',
        },
        {
          click() {
            require('electron').shell.openExternal(
              'https://github.com/GetStream/Winds/issues',
            );
          },
          label: 'File Issue on GitHub',
        },
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
};

const generateTray = () => {
  tray = new Tray(path.join(__dirname, 'assets/icons/menu/logo_bar.png'));
  const contextMenu = Menu.buildFromTemplate([{
      label: 'Item1',
      type: 'radio'
    },
    {
      label: 'Item2',
      type: 'radio'
    },
    {
      label: 'Item3',
      type: 'radio',
      checked: true
    },
    {
      label: 'Item4',
      type: 'radio'
    }
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
}

app.on('ready', async () => {
  await createWindow();
  await generateMenu();
  await generateTray();

  const filter = {
    urls: ['https://patrikmarin.fi/placeholder-callback*']
  };

  session.defaultSession.webRequest.onBeforeRequest(filter, function (details, callback) {
    callback({
      cancel: true
    });

    let end = '';

    try {
      end = details.url.substr(details.url.indexOf('#'));
    } catch {
      end = '#access_token=OAUTH_FAILED'
    } finally {
      mainWindow.loadURL(
        isDev ?
        `http://localhost:3000${end}` :
        `file://${path.join(__dirname, '../build/index.html')}${end}`,
      );
    }

  })

});

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('load-page', (event, arg) => {
  mainWindow.loadURL(arg);
});