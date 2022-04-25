const habitModel = require('../models/habitModel');
const { HabitResponseFn } = require('../middleware/response');

const createHabitFn = (req, res) => {
    req.body.User = req.user;
    habitModel.create(req.body).then(response => {
        return res.json(HabitResponseFn(response));
    }).catch(err => {
        return res.json({ status: false, message: 'Something went wrong' });
    });
}

const findAllHabitsFn = (req, res) => {
    habitModel.find().populate('User', 'userName email').select("-createdAt -updatedAt -__v")
        .then(response => {
            return res.json(response);
        }).catch(err => {
            console.log(err.message)
            return res.json({ status: false, message: 'Something went wrong' });
        });
}

const findAllHabitsByUserFn = (req, res) => {
    habitModel.find({ User: req.user }).select("-User -createdAt -updatedAt -__v")
        .then(response => {
            return res.json(response);
        }).catch(err => {
            console.log(err.message)
            return res.json({ status: false, message: 'Something went wrong' });
        });
}

module.exports = { createHabitFn, findAllHabitsFn, findAllHabitsByUserFn };