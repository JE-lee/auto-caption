const AipSpeech = require('baidu-aip-sdk').speech;
const SAMPLE_RATE = 16000;
const APIKEY = '37IpNMzcQwvvjHE4Dcd8CyNv';
const SECRETKEY = 'QAc3MpKTkm1S0m7gSfKXjxfX29k4OTT5';
let client = new AipSpeech(0, APIKEY, SECRETKEY);
/**
 * 
 * @param {Buffer} pcmBuffer ： pcm 数据buffer
 */
module.exports =  function audioRecognize(pcmBuffer){
  return client.recognize(pcmBuffer, 'pcm', SAMPLE_RATE)
}