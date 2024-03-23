import path from "path";
import { app, BrowserView, BrowserWindow, ipcMain, Menu } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";

const isProd = process.env.NODE_ENV === "production";

var WINDOW_WIDTH = 1280;
var WINDOW_HEIGHT = 720;
const ADDRESSBAR_HEIGHT = 50;

var mainWindow;

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  mainWindow = createWindow("main", {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    title: "Browser",
    autoHideMenuBar: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
      disableHtmlFullscreenWindowResize: true,
    },
  });

  Menu.setApplicationMenu(Menu.buildFromTemplate([]));

  const view = new BrowserView();
  mainWindow.setBrowserView(view);
  view.setBounds({
    x: 0,
    y: ADDRESSBAR_HEIGHT,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT - ADDRESSBAR_HEIGHT,
  });
  view.webContents.loadURL("https://google.com");

  if (isProd) {
    await mainWindow.loadURL("app://./home");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    // mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("setAddress", async (event, arg) => {
  if (!arg) return;
  const view = mainWindow.getBrowserView();
  view.webContents.loadURL(arg);
});

ipcMain.on("setProxy", async (event, arg) => {
  const view = mainWindow.getBrowserView();
  const session = view.webContents.session;
  await session.closeAllConnections();
  await session.setProxy({ proxyRules: arg });
  await session.forceReloadProxyConfig();
});
