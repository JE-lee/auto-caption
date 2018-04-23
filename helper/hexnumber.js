const _ = require('lodash')
/**
 * 
 * @param {Array} array 
 * @param {Number} formatLength | 格式化长度
 * @param {Number} type 0：小端，1：大端
 */
function hexnumber(array = [], formatLength = 4,type = 0){
  let length = array.length,
    _array = []
  // 补0
  if(length < formatLength){
    _array = (new Array(length)).fill(0)
    Object.assign(_array, array)
  }else{
    _array = _.cloneDeep(array)
  }
  _array = _array.slice(0,length)
  //小端结构 翻转
  if(type == 0){
    _array = _array.reverse()
  }
  let number = +_array[0]
  for(let i = 1,length = _array.length; i < length; i++){
    number = ( number << 8 ) | +_array[i]
  }
  return number
}

module.exports = hexnumber