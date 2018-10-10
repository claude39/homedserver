const mongoose = require('mongoose')
const Schema = mongoose.Schema

const remedyWithIllnessesSchema = new Schema({
    remedyid: String,
    illnessesid: [String]
})

module.exports = mongoose.model('RemedyWithIllnesses', remedyWithIllnessesSchema)