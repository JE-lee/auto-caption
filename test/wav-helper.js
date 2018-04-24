const wavhelper = require('../helper/wav-helper');
const chalk = require('chalk');
const path = require('path');

let mediaPath = path.resolve(__dirname, '../assets/myvoice.wav')

wavhelper.getWAVInfo(mediaPath)
  .then(info => {
    let i = 0
  }).catch( err => {
    console.log('wav info fail:',err)
  })
