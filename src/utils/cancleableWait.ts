const arr: any[] = []
let i = 0

export const cancleableWait = (timeout: number) => {
  let id = i
  i++
  let _cancle: any = false
  const promise = new Promise((resolve, reject) => {

    arr[id] = {
      start: new Date(),
      duration: timeout,
    }
    const _timeout = setTimeout(() => {
      arr[id].resolve = new Date()
      resolve()
    }, timeout)

    _cancle = () => {
      clearTimeout(_timeout)
      arr[id].reject = new Date()
      reject()
    }

  })

  return {
    promise,
    cancle,
  }

  function cancle() {
    if (!_cancle) {
      setTimeout(cancle, 100)
    } else {
      _cancle()
    }
  }
}

export const getArr = () => arr