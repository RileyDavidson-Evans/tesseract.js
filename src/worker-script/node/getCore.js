const { simd } = require('wasm-feature-detect');
const OEM = require('../../constants/OEM');
const tcsl = require('tesseract.js-core/tesseract-core-simd-lstm');
const tcs = require('tesseract.js-core/tesseract-core-simd');
const tcl = require('tesseract.js-core/tesseract-core-lstm');
const tc = require('tesseract.js-core/tesseract-core');

let TesseractCore = null;
/*
 * getCore is a sync function to load and return
 * TesseractCore.
 */
module.exports = async (oem, _, res) => {
  if (TesseractCore === null) {
    console.log('Here running')
    const statusText = 'loading tesseract core';

    const simdSupport = await simd();
    res.progress({ status: statusText, progress: 0 });
    if (simdSupport) {
      if ([OEM.DEFAULT, OEM.LSTM_ONLY].includes(oem)) {
        TesseractCore = tcsl;
      } else {
        TesseractCore = tcs;
      }
    } else if ([OEM.DEFAULT, OEM.LSTM_ONLY].includes(oem)) {
      TesseractCore = tcl;
    } else {
      TesseractCore = tc;
    }
    res.progress({ status: statusText, progress: 1 });
  }
  return TesseractCore;
};
