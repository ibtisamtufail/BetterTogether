const router = require('express').Router();
const { createHabitFn, findAllHabitsFn, findAllHabitsByUserFn } = require('../controllers/habitController');
const { verifyUserTokenFn } = require('../middleware/verifyUserToken');

router.post('/create', verifyUserTokenFn, createHabitFn);
router.get('/getAll', findAllHabitsFn);
router.get('/getAllByUser', verifyUserTokenFn, findAllHabitsByUserFn)

module.exports = router;