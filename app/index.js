let { app, BrowserWindow } = require('electron')

function createMainWindow () {
    let mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    mainWindow.loadURL('https://commcarehq.org/accounts/login')
}

app.whenReady().then(createMainWindow)