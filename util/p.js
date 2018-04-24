module.exports =  function getRetryPromise(getPromise, retry, ...T){
  let retryCount = 0
  let f = () => {
    return getPromise(...T).catch((err) => {
      if(retryCount < retry){
        retryCount ++
        return f()
      }else{
        return Promise.reject(err)
      }
    })
  }
  return f() 
}