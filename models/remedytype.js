const mongoose = require('mongoose')
const Schema = mongoose.Schema

const remedyTypeSchema = new Schema({
    name: String,
})

module.exports = mongoose.model('RemedyType', remedyTypeSchema)