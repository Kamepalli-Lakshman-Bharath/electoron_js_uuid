const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const os = require("os");
const macaddress = require("macaddress");

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  if (!app.isPackaged) {
    mainWindow.loadURL("http://localhost:3000");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, "../out/index.html")}`);
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // Send device ID once window is loaded
  mainWindow.webContents.on("did-finish-load", () => {
    macaddress.one((err, mac) => {
      if (err) {
        console.error("Failed to retrieve MAC address:", err);
      } else {
        const hostname = os.hostname();
        const platform = os.platform();
        const deviceId = `${hostname}-${mac}-${platform}`;
        console.log("Generated Device ID:", deviceId);
        mainWindow.webContents.send("device-id", deviceId);
      }
    });
  });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
