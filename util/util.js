module.exports =  function(buffer,length){
  if(length > buffer.length || length <= 0) return null
  let result = []
  for(let i =0;i<length;i++){
    result.push(buffer[i])
  }
  return result
}