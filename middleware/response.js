const jwt = require('jsonwebtoken');

const TokenResponseFn = (response) => {
    const _data = response.toObject();
    const { password, createdAt, updatedAt, __v, ...user } = _data;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const resObject = { status: true, user, token };
    return resObject;
}

const BasicResponseFn = (response, name) => {
    const _data = response.toObject();
    const { createdAt, updatedAt, __v, ...data } = _data;
    const resObject = { status: true, data };
    return resObject;
}

module.exports = { TokenResponseFn, BasicResponseFn };