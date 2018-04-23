let { audioRecognize } = require('./audio-recognize');
let { getRetryPromise } = require('../util/p');

let PQueue = require('p-queue');
const CONCURRENCY = 4;
const RETRYCOUNT = 3; // 重试次数

class Recognize extends Pqueue{
  /**
   * 
   * @param {Array} pcmArray | pcm数据数组
   */
  constructor(pcmArray){
    this.queue = new PQueue({ concurrency: CONCURRENCY })
    this.pcmArray = pcmArray
    this.pcmArray.forEach(item => this.asyncAudioRecognize(item))
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

