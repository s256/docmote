const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("docmoteAPI", {
  saveUrl: (url) => ipcRenderer.invoke("save-instance-url", url),
});

window.addEventListener("DOMContentLoaded", () => {
  const style = document.createElement("style");
  style.innerText = `
    header {
      -webkit-app-region: drag;
    }
    header button,
    header a,
    header input {
      -webkit-app-region: no-drag;
    }
    header {
      padding-left: 80px !important;
    }
  `;
  document.head.appendChild(style);
});
