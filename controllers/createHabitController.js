const habitModel = require('../models/createHabitModel');
const { BasicResponseFn } = require('../middleware/response');

const createHabitFn = (req, res) => {
    req.body.user = req.user;
    habitModel.create(req.body).then(response => {
        return res.json(BasicResponseFn(response));
    }).catch(err => {
        return res.json({ status: false, message: 'Something went wrong' });
    });
}

const findAllHabitsFn = (req, res) => {
    habitModel.find().populate('user', 'userName email').select('-createdAt -updatedAt -__v')
        .then(response => {
            return res.json(response);
        }).catch(err => {
            return res.json({ status: false, message: 'Something went wrong' });
        });
}

const findAllHabitsByUserFn = (req, res) => {
    habitModel.find({ user: req.user }).select('-user -createdAt -updatedAt -__v')
        .then(response => {
            return res.json(response);
        }).catch(err => {
            return res.json({ status: false, message: 'Something went wrong' });
        });
}

module.exports = { createHabitFn, findAllHabitsFn, findAllHabitsByUserFn };