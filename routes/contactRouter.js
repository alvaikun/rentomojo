const express = require('express')
const bodyParser = require('body-parser')
const Contact = require('../models/contact')
// const { put, delete } = require('../app')

const contactRouter = express.Router()
contactRouter.use(bodyParser.json())

contactRouter.route('/')
.get((req, res, next) => {
    Contact.find()
    .then(allContacts => {
        if (allContacts) {
            res.statusCode = 200
            res.contentType('application/json')
            res.send(allContacts)
        } else {
            res.status(404).json({ msg: 'No contact found' })
        }
    })
    .catch(err => {
        next(err)
    })
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
.put((req, res, next) => {
    res.sendStatus(405)
})
.delete((req, res, next) => {
    Contact.remove({})
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        next(err)
    })
})

module.exports = contactRouter