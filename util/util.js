module.exports =  function bufferToArray(buffer,length){
  if(length > buffer.length || length <= 0) return []
  let result = []
  for(let i =0;i<length;i++){
    result.push(buffer[i])
  }
  return result
}