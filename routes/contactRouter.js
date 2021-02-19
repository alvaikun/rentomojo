const express = require('express')
const bodyParser = require('body-parser')
const Contact = require('../models/contact')

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

contactRouter.route('/:userEmail')
.get((req, res, next) => {
    Contact.findOne({ email: req.params.userEmail })
    .then(foundContact => {
        if (foundContact) {
            res.status(200).json(foundContact)
        } else {
            res.status(404).json({ msg: 'Contact with this email address not found' })
        }
    })
    .catch(err => {
        next(err)
    })
})
.post((req, res, next) => {
    res.sendStatus(405)
})
.put((req, res, next) => {
    Contact.findOne({ email: req.params.userEmail} )
    .then(foundContact => {
        if (foundContact) {
            if (req.body.name) {
                foundContact.name = req.body.name
            }
            if (req.body.phone) {
                foundContact.phone = req.body.phone
            }
            if (req.body.email) {
                foundContact.email = req.body.email
            }
            foundContact.save()
            .then(modifiedFoundContact => {
                res.status(200).json(modifiedFoundContact)
            })
            .catch(err => {
                next(err)
                res.status(500).json({ msg: 'There was an error in modifying the contact' })
            })
        } else {
            res.status(404).json({ msg: 'Contact with this email address not found' })
        }
    })
})
.delete((req, res, next) => {
    Contact.findOneAndDelete({ email: req.params.userEmail} )
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        next(err)
    })
})

module.exports = contactRouter