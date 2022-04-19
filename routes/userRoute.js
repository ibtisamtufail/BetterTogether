const router = require('express').Router();
const { registerUserFn, loginUserFn, googleAuthenticateFn } = require('../controllers/userController');
const { inputValidation } = require('../middleware/validation');

router.post('/register', inputValidation, registerUserFn);
router.post('/login', inputValidation, loginUserFn);
router.post('/google', googleAuthenticateFn);

module.exports = router;