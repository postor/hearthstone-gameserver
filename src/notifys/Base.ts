export class Notify {
  message: string
  type: string
  data: any
  userId: number

  constructor(message: string, type: string, userId: number, data: any = undefined) {
    this.message = message
    this.type = type
    this.data = data
    this.userId = userId
  }

  fromObject(obj: any) {
    this.message = obj.message
    this.type = obj.type
    this.data = obj.data
  }

  toObject() {
    const data = (this.data && this.data.toObject) ? this.data.toObject() : this.data
    return {
      type: this.type,
      message: this.message,
      data,
      userId: this.userId,
    }
  }
}