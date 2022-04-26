const habitManagementModel = require('../models/habitManageModel.js');
const { BasicResponseFn } = require('../middleware/response');

const saveHabitManageDataFn = (req, res) => {
    req.body.user = req.user;
    habitManagementModel.create(req.body).then(response => {
        return res.json(BasicResponseFn(response));
    }).catch(err => {
        return res.json({ status: false, message: 'Something went wrong' });
    });
}

const findAllHabitsManageFn = (req, res) => {
    habitManagementModel.find().populate('user', 'userName email').populate('inspiration', 'userName email')
        .select('-createdAt -updatedAt -__v')
        .then(response => {
            return res.json(response);
        }).catch(err => {
            return res.json({ status: false, message: 'Something went wrong' });
        });
}

const findAllHabitManageByUserFn = (req, res) => {
    habitManagementModel.find({ user: req.user }).select('-user -createdAt -updatedAt -__v')
        .then(response => {
            return res.json(response);
        }).catch(err => {
            return res.json({ status: false, message: 'Something went wrong' });
        });
}

module.exports = { saveHabitManageDataFn, findAllHabitsManageFn, findAllHabitManageByUserFn };