const chalk = require('chalk');
const path = require('path');
const getPcmArray = require('./helper/pcm-piece');
const Recognize = require('./recognize/index');

async function getCaption(mediaPath){
  let pcmList = await getPcmArray(mediaPath)
  let audioRecognize = new Recognize(pcmList)
  audioRecognize.onIdle().then((result) => {
    //排序
    let list = audioRecognize.result
    list.sort((a, b) => a.start - b.start)
    list.forEach(item => {
      console.log('[start: ' + chalk.green(item.start) + '--- end: ' + chalk.green(`${item.end}`) + ']:' + chalk.green(item.result) )
    })
  })
}

let mediaPath = path.resolve(__dirname, './assets/baiyang.mp3')

getCaption(mediaPath)