const { contextBridge } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  // Inject CSS for draggable + space for window controls
  const style = document.createElement('style');
  style.innerText = `
    /* Make header draggable */
    header {
      -webkit-app-region: drag;
    }

    /* Prevent drag in buttons/controls */
    header button,
    header a,
    header input {
      -webkit-app-region: no-drag;
    }

    /* Optional: add padding for traffic light buttons */
    header {
      padding-left: 80px !important;
    }
  `;
  document.head.appendChild(style);

  // Optional: log for debugging
  console.log('[Docmote] Injected draggable header styling');
});