/* global DMCore */
'use strict';
importScripts('dm-core.js');

self.onmessage = function (event) {
  const message = event.data || {};
  try {
    const result = DMCore.runMonteCarlo(message.params, (fraction) => {
      self.postMessage({ type: 'progress', fraction });
    });
    self.postMessage({ type: 'result', result });
  } catch (error) {
    self.postMessage({ type: 'error', message: error && error.message ? error.message : String(error) });
  }
};
