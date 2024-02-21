const express  = require('express')
const router = express.Router()

const Authcontroller = require('../Controllers/Admincontroller')
const UserAuthcontroller = require('../Controllers/Usercontroller')
const authenticate = require('../middleware/authenticate')
const User = require('../models/User');



router.post('/register',  Authcontroller.register)
router.post('/adminlogin',  Authcontroller.login)

router.post('/userlogin', authenticate, UserAuthcontroller.login)

router.get('/users', (req, res) => {
    User.find()
      .then(users => {
        res.json({ users })
      })
      .catch(error => {
        res.json({ error: 'An error occured' })
      })
  })

module.exports = router