let { app, BrowserWindow } = require('electron')
let mainWindow

function createMainWindow () {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
        autoHideMenuBar: true,
        title: 'CommCare for Windows Desktop',
        show: false
    })
    mainWindow.loadURL('https://commcarehq.org/accounts/login').then()
}

function createSplashWindow () {
    let splashWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
        autoHideMenuBar: true,
        title: 'CommCare for Windows Desktop'
    })
    splashWindow.loadFile('./app/index.html').then(createMainWindow())
    mainWindow.on('ready-to-show', function() {
        mainWindow.show()
        splashWindow.close()
    })

}

app.whenReady().then(createSplashWindow)
