const { Router } = require('express');
const {login, signup, verify} = require('../../controllers/auth')

const router = Router();

router.post('/login', login)
router.post('/signup', signup)
router.get('/verify/:id/:token', verify)


module.exports = router;
