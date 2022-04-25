const habitManagementModel = require('../models/habitManageModel.js');
const { HabitResponseFn } = require('../middleware/response');

const saveHabitManageDataFn = (req, res) => {
    req.body.User = req.user;
    habitManagementModel.create(req.body).then(response => {
        return res.json(HabitResponseFn(response));
    }).catch(err => {
        return res.json({ status: false, message: 'Something went wrong' });
    });
}

const findAllHabitsManageFn = (req, res) => {
    habitManagementModel.find().populate('User', 'userName email').populate('Inspiration', 'userName email')
        .select("-createdAt -updatedAt -__v")
        .then(response => {
            return res.json(response);
        }).catch(err => {
            console.log(err.message)
            return res.json({ status: false, message: 'Something went wrong' });
        });
}

const findAllHabitManageByUserFn = (req, res) => {
    console.log(req.user);
    habitManagementModel.find({ User: req.user }).select("-User -createdAt -updatedAt -__v")
        .then(response => {
            return res.json(response);
        }).catch(err => {
            console.log(err.message)
            return res.json({ status: false, message: 'Something went wrong' });
        });
}

module.exports = { saveHabitManageDataFn, findAllHabitsManageFn, findAllHabitManageByUserFn };