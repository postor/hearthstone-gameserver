export default class Base {
  message: string
  type: string
  data: any

  constructor(message: string, type: string, data: any) {
    this.message = message
    this.type = type
    this.data = data
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
    }
  }
}