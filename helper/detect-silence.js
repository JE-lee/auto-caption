const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const chalk = require('chalk');
const _ = require('lodash');
const shake = 0.1

function getSilencePart(mediaPath){
  return new Promise((resolve, reject) => {
    let silenceList = [],
      filePath = path.normalize(mediaPath),
      command = ffmpeg(filePath),
      save = path.resolve(path.dirname(filePath), `./${path.basename(filePath, path.extname(filePath))}${_.random(0,10000,false)}.wav`)
    command.audioFilters([
      {
        filter: 'silencedetect', // 检测静默
        options: 'n=-20dB:d=1.4'
      },
      {
        filter: 'aresample', // 重新采样为16k
        options: '16000'
      },
      {
        filter: 'pan', // 只保留左声道
        options: '1c|c0=1.0*c0'
      }
    ])
    .on('stderr', function(line) {
      silenceList.push(line)
      //console.log(line)
    })
    .on('error', function(err, stdout, stderr) {
      reject('detect-silence fail！errMsg:' + err)
    })
    .on('end',function(e){
      let list = _normalizeSilenceList(silenceList)
      resolve({
        file: save,
        list
      })
    })
    .save(save)
  })
}

function _normalizeSilenceList(list){
  let result1 = [],
    result2 = []
  list.forEach(element => {
    if(/^\[silencedetect/.test(element)){
      result1.push(element)
    }
  })
  result1.forEach((element, index) => {
    let patternStart = /^\[silencedetect.+\].+silence_start:(.+)/ 
      patternEnd = /^\[silencedetect.+\].+silence_end:\s+(\d+\.\d+).+silence_duration:(.+)/
    if( index % 2 === 0){
      let match = element.match(patternStart),
        start = parseFloat(match[1])
      start = (start - shake) < 0 ? 0 : start - shake
      result2.push({ start })
    }else{
      let match = element.match(patternEnd)
        end = parseFloat(match[1]),
        duration = parseFloat(match[2]),
        item = result2[result2.length - 1] 
      item.end = end + shake 
      item.duration = duration
    }
  })
  return result2
}

module.exports = getSilencePart

