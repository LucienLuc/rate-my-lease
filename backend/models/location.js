const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('location connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const locationSchema = new mongoose.Schema({
    address: String,
    reviews: [{
        rating: Number,
        date: Date,
        body: String
    }],
    avg_rating: Number
})

module.exports = mongoose.model('Location', locationSchema)