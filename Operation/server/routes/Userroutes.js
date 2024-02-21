const express = require('express')
const router = express.Router()
const User = require('../models/User'); // Assuming the User model is needed in this file


const UserController = require('../Controllers/Usercontroller')

router.get('/', UserController.index)
router.post('/show', UserController.show)
router.post('/register', UserController.register)
router.put('/update', UserController.update)
router.post('/delete', UserController.destroy)

module.exports = router