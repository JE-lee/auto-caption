const getSilencePart = require('./detect-silence.js');
module.exports = function(mediaPath){
  return getSilencePart(mediaPath)
    .then((data) => {
      data.list = _normalizeAudioPiece(data.list)
      return data
    })
}

function _normalizeAudioPiece(list){
  let pieces = []
  for(let i =  0, length = list.length; i < length - 1; i++ ){
    let start = list[i].end,
      end = list[i+1].start
    pieces.push({
      start,
      end,
      audioDuration: end - start
    })
  }
  
  return pieces 
}