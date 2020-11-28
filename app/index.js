/*                Copyright (C) 2020 Ryan Barber
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.
    You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

let { app, BrowserWindow } = require('electron'),
    mainWindow,
    splashWindow

function createMainWindow () {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
        autoHideMenuBar: true,
        show: false,
        icon: __dirname + './assets/cc.ico'
    })
    mainWindow.loadURL('https://commcarehq.org/accounts/login').then()
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.setTitle('CommCare Desktop Client')
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
        icon: __dirname + './assets/cc.ico'
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