import { fork } from 'child_process'
import { join } from 'path'

const filePath = join(__dirname, 'for-fork.js')
const subProcess = fork(filePath)
subProcess.on('message', (data) => {
  if (data.error) {
    console.log(data)
  } else {
    console.log(data)
  }
})
