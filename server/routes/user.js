const router= require('express').Router()
const userController= require('../controllers/user')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/loginGoogle', userController.loginGoogle)

module.exports= router