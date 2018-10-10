const mongoose = require('mongoose')
const Schema = mongoose.Schema

const illnessWithRemediesSchema = new Schema({
    illnessid: String,
    remediesid: [String]
})

module.exports = mongoose.model('IllnessWithRemedies', illnessWithRemediesSchema)