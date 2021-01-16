const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('lease connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const leaseSchema = new mongoose.Schema({
    location: mongoose.Schema.Types.ObjectId,
    name: String,
    date: Date,
    price: Number,
    bed: Number,
    bath: Number,
    contact: {
        phone: Number,
        email: String,
    },
    body: String
})

module.exports = mongoose.model('Lease', leaseSchema)