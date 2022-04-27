const router = require('express').Router();
const { saveMessageFn, findGroupMessageFn } = require('../controllers/messageController');
const { verifyUserTokenFn } = require('../middleware/verifyUserToken');

router.post('/save', verifyUserTokenFn, saveMessageFn);
router.post('/find', verifyUserTokenFn, findGroupMessageFn);
// router.post('/google', googleAuthenticateFn);
// router.post('/facebook', facebookAuthenticateFn);

module.exports = router;