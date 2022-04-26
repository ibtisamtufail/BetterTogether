const router = require('express').Router();
const { saveHabitManageDataFn, findAllHabitsManageFn, findAllHabitManageByUserFn } = require('../controllers/habitManageController');
const { verifyUserTokenFn } = require('../middleware/verifyUserToken');

router.post('/save', verifyUserTokenFn, saveHabitManageDataFn);
router.get('/getAll', verifyUserTokenFn, findAllHabitsManageFn);
router.get('/getAllByUser', verifyUserTokenFn, findAllHabitManageByUserFn);

module.exports = router;