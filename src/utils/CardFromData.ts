import CardFromEnum from './CardFromEnum'

export default class CardFromData {
  type: string
  createdBy: string

  constructor(type: string = CardFromEnum.Store, createdBy: string = '') {
    this.type = type
    this.createdBy = createdBy
  }

  toObject() {
    return {
      type: this.type,
      createdBy: this.createdBy,
    }
  }
}