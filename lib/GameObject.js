class GameObject {
  /**
   * @param {string} name
   * @param {Player} owner
   */
  constructor(name,owner){
    this.name = name
    this.owner = owner
  }
}

module.exports = GameObject