const router = require('express').Router();
const { registerUserFn, loginUserFn, googleAuthenticateFn, facebookAuthenticateFn } = require('../controllers/userController');
const { inputValidationFn } = require('../middleware/validation');

router.post('/register', inputValidationFn, registerUserFn);
router.post('/login', inputValidationFn, loginUserFn);
router.post('/google', googleAuthenticateFn);
router.post('/facebook', facebookAuthenticateFn);

module.exports = router;