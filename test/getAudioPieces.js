/**
 * 测试 ../helper/ausio-piece
 */

const getAudioPieces = require('../helper/audio-piece');
const chalk = require('chalk');
const path = require('path');

let mediaPath = path.resolve(__dirname, '../assets/myvoice.m4a')

getAudioPieces(mediaPath)
  .then(({ list }) => {
    console.log(chalk.green('get Audio Pieces success'))
    console.log(chalk.green(JSON.stringify(list)))
  })
  .catch((err) => {
    console.log(chalk.red('get Audio Pieces fail:'+err))
  })