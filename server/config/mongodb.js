const { MongoClient } = require('mongodb')

let database = null

async function connect() {
  try {
    const uri = process.env.MONGODB || 'mongodb://localhost:27017'

    const client = new MongoClient(uri, { useUnifiedTopology: true })
    await client.connect()

    const db = client.db('sprout')
    database = db
    return db
  } catch (err) {
    console.log(err);
  }
}

function getDatabase() {
  return database
}

module.exports = {
  connect,
  getDatabase
}