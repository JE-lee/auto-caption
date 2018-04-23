//let { audioRecognize } = require('./audio-recognize');
let PQueue = require('p-queue');
const _ = require('lodash');
const chalk = require('chalk');
const CONCURRENCY = 3;
const RETRYCOUNT = 3; // 重试次数

function getMessage(msg){
  return new Promise((resolve, reject) => {
    let timer = setTimeout(() => {
      if(_.random(0,1,true) > 0.75){
        resolve(msg)
      }else{
        reject()
      }
    },1000)
  })
}
function getRetryPromise(getPromise, retry, ...T){
  let retryCount = 0
  let f = () => {
    return getPromise(...T).catch(() => {
      if(retryCount < retry){
        retryCount ++
        console.log('重试次数' + retryCount)
        return f()
      }else{
        return Promise.reject('重试3次之后依然失败')
      }
    })
  }
  return f() 
}
class Recognize extends PQueue{
  /**
   * 
   * @param {Array} pcmArray | pcm数据数组
   */
  constructor(pcmArray){
    super({ concurrency: CONCURRENCY })
    this.pcmArray = pcmArray
    this.pcmArray.forEach((item ,index) => {
      this.add(this.asyncAudioRecognize(index))
        .then((data) => {
          console.log(chalk.green(`success: ${data}`))
        })
        .catch((err) => {
          console.log(chalk.red(`err: ${err}`))
        })
    })
  }
  /**
   * 
   * @param {pcmBuffer} pcmBuffer | 一段pcm数据
   */
  asyncAudioRecognize(pcmBuffer){
    return async () => {
      return await getRetryPromise(getMessage, RETRYCOUNT,pcmBuffer)
    }
  }

}
new Recognize((new Array(15)).fill(12))


