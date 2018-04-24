let  audioRecognize  = require('./audio-recognize');
let  getRetryPromise  = require('../util/p');

let PQueue = require('p-queue');
const CONCURRENCY = 4;
const RETRYCOUNT = 3; // 重试次数

class Recognize extends PQueue{
  /**
   * 
   * @param {Array} pcmArray | pcm数据数组
   */
  constructor(pcmArray){
    super({ concurrency: CONCURRENCY })
    this.pcmArray = pcmArray
    this.result = []
    this.pcmArray.forEach(item => {
      this.add(this.asyncAudioRecognize(item.buffer))
        .then(res => {
          if(res.err_no == 0){
            this.result.push({
              start: item.start,
              end: item.end,
              result: res.result[0]
            })
            console.log(res.result[0])
          }else{
            return Promise.reject(res.err_no)
          }
        }).catch(err => {
          console.log('识别err',err)
        }) 
    })
  }
  /**
  * 
  * @param {pcmBuffer} pcmBuffer | 一段pcm数据
  */
  asyncAudioRecognize(pcmBuffer){
    return async () => {
      return await getRetryPromise(audioRecognize, RETRYCOUNT, pcmBuffer)
    }
  }
}

module.exports = Recognize
