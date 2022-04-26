const validator = require('email-validator');

const inputValidationFn = (req, res, next) => {
    const { userName, email, password } = req.body;

    if (!userName && req._parsedUrl.path === '/register') {
        return res.status(400).json({ status: false, error: 'UserName must be required' });
    }
    else if (!email) {
        return res.status(400).json({ status: false, error: 'Email must be required' });
    }
    else if (!validator.validate(email)) {
        return res.status(400).json({ status: false, error: 'Invalid email' });
    }
    else if (!password) {
        return res.status(400).json({ status: false, error: 'Password must be required' });
    }
    next();
}

const createGroupValidationFn = (req, res, next) => {
    const { title, category, members } = req.body;

    if (!title) {
        return res.status(400).json({ status: false, error: 'Group title must be required' });
    }
    else if (!category) {
        return res.status(400).json({ status: false, error: 'Group category must be required' });
    }
    else if (!members || members.length === 0) {
        return res.status(400).json({ status: false, error: 'One group member must be selected' });
    }
    next();
}

module.exports = { inputValidationFn, createGroupValidationFn };