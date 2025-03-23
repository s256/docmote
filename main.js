const { app, BrowserWindow, shell, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

let win;

const settingsPath = path.join(
  app.getPath("userData"),
  "docmote-settings.json"
);

function getStoredURL() {
  if (fs.existsSync(settingsPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(settingsPath, "utf-8"));
      return config.instanceUrl;
    } catch (e) {
      return null;
    }
  }
  return null;
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (win) {
      if (win.isMinimized()) win.restore();
      win.show();
      win.focus();
    }
  });

  function createWindow() {
    const storedUrl = getStoredURL();
    let baseOrigin = null;

    if (storedUrl) {
      try {
        baseOrigin = new URL(storedUrl).origin;
      } catch (e) {
        baseOrigin = null;
      }
    }

    win = new BrowserWindow({
      width: 1200,
      height: 800,
      minWidth: 600,
      minHeight: 600,
      icon: path.join(__dirname, "assets", "docmost.icns"),
      frame: false,
      titleBarStyle: "hidden",
      trafficLightPosition: { x: 10, y: 13 },
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        contextIsolation: true,
        nodeIntegration: false,
      },
    });

    if (storedUrl) {
      win.loadURL(storedUrl);
    } else {
      win.loadFile(path.join(__dirname, "dist/index.html"));
    }

    win.webContents.setWindowOpenHandler(({ url }) => {
      if (baseOrigin && url.startsWith(baseOrigin)) {
        return { action: "allow" };
      } else {
        shell.openExternal(url);
        return { action: "deny" };
      }
    });

    win.webContents.on("will-navigate", (event, url) => {
      if (baseOrigin && !url.startsWith(baseOrigin)) {
        event.preventDefault();
        shell.openExternal(url);
      }
    });

    win.on("close", (e) => {
      if (!app.isQuitting) {
        e.preventDefault();
        win.hide();
      }
    });
  }

  ipcMain.handle("save-instance-url", (event, url) => {
    fs.writeFileSync(settingsPath, JSON.stringify({ instanceUrl: url }));
    if (win) {
      win.close();
      createWindow();
    }
  });

  app.whenReady().then(createWindow);

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });

  app.on("activate", () => {
    if (win) {
      win.show();
    } else {
      createWindow();
    }
  });

  app.on("before-quit", () => {
    app.isQuitting = true;
  });
}
