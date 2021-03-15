const { app, BrowserWindow, globalShortcut } = require('electron');
/**
 * Creates the main window
 */
function createMainWindow () {
  const win = new BrowserWindow({
    width: 770,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });
  globalShortcut.register('CommandOrControl+R', function() {
		console.log('CommandOrControl+R is pressed')
		win.reload();
	})
  win.loadFile('index.html');

  const contents = win.webContents;

  contents.on('will-navigate', (event) => {
    event.preventDefault();
    win.reload();
  })
}

app.allowRendererProcessReuse = true;

app.whenReady().then(createMainWindow);

// When all windows are closed exit the app, except in macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

// When the application gets activated create the main window if one does not exist
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
  }
});

