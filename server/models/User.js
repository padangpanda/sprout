const { getDatabase } = require('../config/mongodb')
const { ObjectId } = require('mongodb')

class User {
  static userDb() {
    return getDatabase().collection('Users')
  }

  static find() {
    return this.userDb().find().toArray()
  }

  static findOne(data) {
    return this.userDb().findOne(data)
  }

  static create(data) {
    return this.userDb().insertOne(data)
  }

  static delete(id) {
    return this.userDb().deleteOne({ _id: ObjectId(id) })
  }
}

module.exports = User