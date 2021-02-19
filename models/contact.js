const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
})

const contactModel = mongoose.model('Contact', contactSchema)

module.exports = contactModel

