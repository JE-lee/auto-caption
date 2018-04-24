/**
 * 解析.wav 文件
 */
const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
let hexnumber = require('./hexnumber');
let bufferToArray = require('../util/util');

function getWAVInfo(wavFilePath){
  let buffer = [],
    info = { 
      fileName: path.basename(wavFilePath,'.wav'),
      filaPath: path.resolve(process.cwd, wavFilePath)
    }
  try {
    buffer = fs.readFileSync(wavFilePath)
    // .wav 文件字节数
    info.size = buffer.length
    // 位深度
    info.bitDepth = hexnumber(bufferToArray(buffer.slice(0x10, 0x10 + 4),4))
    // 是否是pcm格式的数据类别
    info.isPCM = buffer[0x14] === 1 
    // 声道数
    info.channels = hexnumber( bufferToArray(buffer.slice(0x16,0x16 + 2),2) )
    // 采样率
    info.sampleRate = hexnumber( bufferToArray(buffer.slice(0x18, 0x18 + 2),2) )
    // wav 的是否有数据
    info.isHasData = false
    //查找到data
    let index = buffer.slice(0,1024).toString('ascii').indexOf('data')
      pcmTotal = 0 
    if(index !== -1){
      info.isHasData = true
      info.pcm = {}
      // pcm数据开始的offset
      info.pcm.start = index
      // pcm数据总量
      info.pcm.total = hexnumber(bufferToArray(buffer.slice(index + 4, index + 8), 4))
      // pcm 数据buffer
      info.pcm.buffer = buffer.slice(index + 8)
      // pcm 可播放的时长
      info.pcm.duration = info.pcm.total / (info.channels * info.sampleRate * info.bitDepth / 8)
    }
    return Promise.resolve(info)
  } catch (error) {
    return Promise.reject(error)
  }

}

module.exports = {
  getWAVInfo
}