const jwt = require('jsonwebtoken');

const verifyUserTokenFn = (req, res, next) => {
    const { token } = req.headers;
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verify.id;
        next();
    } catch (error) {
        return res.json({ status: false, message: 'User authentication failed' });
    }
}

module.exports = { verifyUserTokenFn };