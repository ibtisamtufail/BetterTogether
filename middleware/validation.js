const validator = require("email-validator");

const inputValidation = (req, res, next) => {
    const { userName, email, password } = req.body;

    if (!userName && req._parsedUrl.path === '/register') {
        return res.status(400).json({ error: 'UserName must be require' });
    }
    else if (!email) {
        return res.status(400).json({ error: 'Email must be require' });
    }
    else if (!validator.validate(email)) {
        return res.status(400).json({ error: 'Invalid email' });
    }
    else if (!password) {
        return res.status(400).json({ error: 'Password must be require' });
    }
    next();
}

module.exports = { inputValidation };