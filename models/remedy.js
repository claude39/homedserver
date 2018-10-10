const mongoose = require('mongoose')
const Schema = mongoose.Schema

const remedySchema = new Schema({
    name: String,
    relatedillnessid: [String],
    remedytypeid: String
})

module.exports = mongoose.model('Remedy', remedySchema)