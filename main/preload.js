const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  onDeviceId: (callback) => {
    ipcRenderer.on("device-id", (event, id) => {
      console.log("Received Device ID:", id); // Debugging log
      callback(id);
    });
  },
});
