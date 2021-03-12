const router = require('express').Router()
const { isLogin } = require('../middlewares/auth')
const UserController = require('../controllers/UserController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(isLogin)
router.get('/user', UserController.findAll)
router.delete('/user/:id', UserController.delete)

module.exports = router