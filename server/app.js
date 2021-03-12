const express = require('express')
const { connect } = require('./config/mongodb')
const cors = require('cors')
const router = require('./routes')
const app = express()
const PORT = process.env.PORT || 3000


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:false }))
app.use(router)

connect()
  .then(async (db) => {
    app.listen(PORT, () => {
      console.log(`listening on port: ${PORT}`);
    })
  })
  .catch(console.log)