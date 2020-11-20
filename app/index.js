// CommCare Desktop Client for Windows
// Developed by Ryan Barber for the New York State Department Of Health

let { app, BrowserWindow } = require('electron'),
    mainWindow,
    splashWindow

function createMainWindow () {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
        autoHideMenuBar: true,
        show: false,
        icon: __dirname + './assets/commcare_QJL_icon.ico'
    })
    mainWindow.loadURL('https://commcarehq.org/accounts/login').then()
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.setTitle('CommCare Desktop Client (Version 0.4.0)')
    })
}
function createSplashWindow () {
    splashWindow = new BrowserWindow({
        width: 600,
        height: 200,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
        resizable: false,
        frame: false,
        icon: __dirname + './assets/commcare_QJL_icon.ico'
    })
    splashWindow.loadFile('./app/index.html').then(createMainWindow())
    mainWindow.on('ready-to-show', function() {
        mainWindow.show()
        mainWindow.focus()
        splashWindow.hide()
        console.log('Application has finished loading.')
        console.log('Exit State: 0')
    })
    mainWindow.on('close', function () {
        splashWindow.close()
    })
}
app.whenReady().then(createSplashWindow)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow()
    }
})