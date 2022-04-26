const router = require('express').Router();
const { createHabitFn, findAllHabitsFn, findAllHabitsByUserFn } = require('../controllers/createHabitController');
const { verifyUserTokenFn } = require('../middleware/verifyUserToken');

router.post('/create', verifyUserTokenFn, createHabitFn);
router.get('/getAll', verifyUserTokenFn, findAllHabitsFn);
router.get('/getAllByUser', verifyUserTokenFn, findAllHabitsByUserFn)

module.exports = router;