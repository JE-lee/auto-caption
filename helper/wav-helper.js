/**
 * 解析.wav 文件
 */
const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
let hexnumber = require('./hexnumber');
let bufferToArray = require('../util/util');

function getWAVInfo(wavFilePath){
  let buffer = []
  try {
    buffer = fs.readFileSync(wavFilePath)
    //查找到data 的位置
    let head = buffer.slice(0,0xff),
      headS = head.toString('ascii'),
      index = headS.indexOf('data'),
      pcmTotal = 0 
    if(index !== -1){
      let l = buffer.slice(index+4, index +8),
        pcmTotal = hexnumber(bufferToArray(l,4))
      //分成1/3
      let pcmBuffer = buffer.slice(index + 8 ),
        divider = Math.floor((pcmTotal/2) / 3) * 2,
        dividerBuffer = pcmBuffer.slice(divider, divider + divider),
        file = path.resolve(__dirname,'./temp.pcm')
      fs.open(file,'w',(err,fd) => {
        fs.write(fd,dividerBuffer,(err,length,b) => {
          console.log(`写入长度${length}`)
        })
      })
    }
  } catch (error) {
    return Promise.reject(error)
  }

}

module.exports = {
  getWAVInfo
}