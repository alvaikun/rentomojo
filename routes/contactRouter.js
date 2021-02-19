const express = require('express')
const bodyParser = require('body-parser')
const Contact = require('../models/contact')

const contactRouter = express.Router()
contactRouter.use(bodyParser.json())

contactRouter.route('/')
.get((req, res, next) => {
    res.status(200).json( {msg: 'Route is working' })
})
.post((req, res, next) => {
    if (req.body) {
        Contact.create(req.body)
        .then(newContact => {
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            res.send(newContact)
        })
        .catch(err => {
            next(err)
            res.statusCode = 500
            res.setHeader('content-type', 'application/json')
            res.send({ msg: 'There was an error in creating new contact'} )
        })
    } else {
        res.statusCode(400).json({ msg: 'Please send a request body to create new contact' })
    }

})

module.exports = contactRouter