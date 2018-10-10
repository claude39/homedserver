const mongoose = require('mongoose')
const Schema = mongoose.Schema

const illnessSchema = new Schema({
    name: String,
    description: String,
    causes: String
})

module.exports = mongoose.model('Illness', illnessSchema)