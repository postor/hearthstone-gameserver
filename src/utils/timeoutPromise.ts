/**
 * 产生一个定时的Promise
 */
export default (timeout: number, result: any = undefined) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(result)
    }, timeout)
  })
}