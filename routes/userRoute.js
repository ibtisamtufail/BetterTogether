const router = require('express').Router();
const { registerUserFn, loginUserFn, googleAuthenticateFn, facebookAuthenticateFn } = require('../controllers/userController');
const { inputValidation } = require('../middleware/validation');

router.post('/register', inputValidation, registerUserFn);
router.post('/login', inputValidation, loginUserFn);
router.post('/google', googleAuthenticateFn);
router.post('/facebook', facebookAuthenticateFn);

module.exports = router;