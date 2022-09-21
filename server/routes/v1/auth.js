const { Router } = require('express');
const {login, signup, verify, resetPassword, reset, resetPasswordConfirm} = require('../../controllers/auth')

const router = Router();

router.post('/login', login)
router.post('/signup', signup)
router.get('/verify/:id/:token', verify)
router.post('/reset-password', resetPassword)
router.get('/reset/:id/:token', reset)
router.post('/reset-password-confirm/:id/:token', resetPasswordConfirm)

module.exports = router;
