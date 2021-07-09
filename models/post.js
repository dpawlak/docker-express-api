const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    job: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    supplies: {
        type: String,
        required: true
    },
    appointment: {
        type: String,
        required: true
    },
    operator: {
        type: String,
        required: true
    }
},
    {timestamps: true}
)

module.exports = mongoose.model('Post', postSchema)