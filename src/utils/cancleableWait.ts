const arr: any[] = []
let i = 0

export const cancleableWait = (timeout: number) => {
  let id = i
  i++
  let _cancle = () => { }
  const promise = new Promise((resolve, reject) => {
    const _timeout = setTimeout(() => {
      arr[id] = {
        start: new Date(),
        duration: timeout,
      }
      resolve()
    }, timeout)

    _cancle = () => {
      clearTimeout(_timeout)
      arr[id] = new Date()
      reject()
    }

  })

  return {
    promise,
    cancle: () => _cancle
  }
}

export const getArr = () => arr