const userModel = require('../models/userModel');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const GOOGLE_CLIENT_ID = '425955384574-itgctjobrmjl0jiciutgvv9ge4b043jg.apps.googleusercontent.com';
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const registerUserFn = (req, res) => {
    const { email, password } = req.body;
    req.body.password = passwordHash.generate(password);

    userModel.findOne({ email }).exec((err, data) => {
        if (err) {
            return res.status(400).json({ status: false, message: 'Something went wrong' });
        }
        else if (data) {
            return res.status(400).json({ status: false, message: 'User already registered with this email' });
        }
        else if (data === null) {
            userModel.create(req.body).then(response => {
                const _data = response.toObject();
                const { password, createdAt, updatedAt, __v, ...user } = _data;
                var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
                return res.status(200).json({ status: true, user, token });
            }).catch(err => {
                console.log(err.message)
                return res.status(400).json({ status: false, message: "Something went wrong" });
            });
        }
    });
}

const loginUserFn = (req, res) => {
    const { email, password } = req.body;

    userModel.findOne({ email }).exec((err, data) => {
        if (err) {
            return res.status(400).json({ status: false, message: 'Something went wrong' });
        }
        else if (data) {
            const verifyPassword = passwordHash.verify(password, data.password);
            if (verifyPassword) {
                const _data = data.toObject();
                const { password, createdAt, updatedAt, __v, ...user } = _data;
                var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
                return res.status(200).json({ status: true, user, token });
            }
            else if (!verifyPassword) {
                return res.status(400).json({ status: false, message: 'Invalid Password' });
            }
        }
        else if (data === null) {
            return res.status(400).json({ status: false, message: `Can't find any user with this email` });
        }
    });
}

const googleAuthenticateFn = (req, res) => {
    const { tokenId } = req.body;

    client.verifyIdToken({ idToken: tokenId, audience: GOOGLE_CLIENT_ID }, (response) => {
        const { email_verified, name, email } = response.payload;
        console.log(response);
    });
}

module.exports = { registerUserFn, loginUserFn, googleAuthenticateFn };