const wavHelper = require('./wav-helper');
const getAudioPiece = require('./audio-piece');
const path = require('path');
const fs = require('fs');
const bufferToArray = require('../util/util');

//let mediaPath = path.resolve(__dirname, '../assets/myvoice.m4a')
async function getPcmArray(mediaPath){
  //得到speech信息
  let speechList = await getAudioPiece(mediaPath)
  //得到wav文件信息
  let wavInfo = await wavHelper.getWAVInfo(speechList.file)
  let result = []
  
  if(speechList.list[0].start !== 0){
    speechList.list.unshift({
      start: 0.1,
      end: speechList.list[0].start,
      duration: speechList.list[0].start 
    })
  }
  if (speechList.list[speechList.list.length-1].end != wavInfo.pcm.duration){
    speechList.list.push({
      start: speechList.list[speechList.list.length-1].end,
      end: wavInfo.pcm.duration,
      duration: wavInfo.pcm.duration - speechList.list[speechList.list.length-1].end
    })
  }
  
  speechList.list[speechList.list.length - 1].end = wavInfo.pcm.duration
  speechList.list.forEach(item => {
    let unit = wavInfo.bitDepth / 8,
      total = wavInfo.pcm.total / unit,
      duration = wavInfo.pcm.duration,
      start = Math.floor(item.start / duration * total) * unit,
      end = Math.floor(item.end / duration * total) * unit,
      buffer = wavInfo.pcm.buffer.slice(start,end)
    result.push({
      start: item.start,
      end: item.end,
      buffer
    })
  })
  return result
}

module.exports = getPcmArray
