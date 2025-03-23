const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 600,
    minHeight: 600,
    frame: false, // removes default top bar
    titleBarStyle: "hidden", // smooth macOS look
    trafficLightPosition: { x: 10, y: 13 }, // optional, moves macOS traffic lights
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL("https://docs.mupende.com");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
