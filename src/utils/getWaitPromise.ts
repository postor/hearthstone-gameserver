export const getWaitPromise = (miniseconds: number) => {

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, miniseconds)
  })
}