const db = require('../config/db')

class Item {
  constructor(item) {
    this.id = item.id
    this.name = item.name
    this.description = item.description
    this.ownerId = item.ownerId
  }

  static getAllItems(callback) {
    db.query('SELECT * FROM items', (error, results) => {
      if (error) {
        return callback(error, null)
      }
      const items = results.map((result) => new Item(result))
      return callback(null, items)
    })
  }
}

module.exports = Item
