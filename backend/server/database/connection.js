const mongoose = require('mongoose')
const databaseUrl =
  process.env.DATABASE_URL || 'mongodb://localhost/argentBankDB'

module.exports = async () => {
  try {
    console.log("Trying to connect to:", databaseUrl)
    await mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('Database successfully connected')
  } catch (error) {
    console.error(`Database Connectivity Error: ${error}`)
    throw new Error(error)
  }
}

