const AipSpeech = requrie('baidu-aip-sdk').AipSpeech;
const SAMPLE_RATE = 8000;
const APIKEY = '37IpNMzcQwvvjHE4Dcd8CyNv';
const SECRETKEY = 'QAc3MpKTkm1S0m7gSfKXjxfX29k4OTT5';
let client = new AipSpeech(0, APIKEY, SECRETKEY);
/**
 * 
 * @param {Buffer} pcmBuffer ： pcm 数据buffer
 */
export function audioRecognize(pcmBuffer){
  return client.recognize(pcmBuffer, 'pcm', SAMPLE_RATE)
}