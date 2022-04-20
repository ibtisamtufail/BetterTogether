const jwt = require('jsonwebtoken');

exports.TokenResponseFn = (response) => {
    const _data = response.toObject();
    const { password, createdAt, updatedAt, __v, ...user } = _data;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const resObject = { status: true, user, token };
    return resObject;
}