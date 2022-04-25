const jwt = require('jsonwebtoken');

const TokenResponseFn = (response) => {
    const _data = response.toObject();
    const { password, createdAt, updatedAt, __v, ...user } = _data;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const resObject = { status: true, user, token };
    return resObject;
}

const HabitResponseFn = (response) => {
    const _data = response.toObject();
    const { createdAt, updatedAt, __v, ...habit } = _data;
    const resObject = { status: true, habit };
    return resObject;
}

module.exports = { TokenResponseFn, HabitResponseFn };