const userModel = require('../models/userModel');
const passwordHash = require('password-hash');
const { TokenResponseFn } = require('../middleware/response');
const fetch = require('node-fetch');
const { OAuth2Client } = require('google-auth-library');

const GOOGLE_CLIENT_ID = '425955384574-itgctjobrmjl0jiciutgvv9ge4b043jg.apps.googleusercontent.com';
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const registerUserFn = (req, res) => {
    const { email, password } = req.body;
    req.body.password = passwordHash.generate(password);

    userModel.findOne({ email }).exec((err, response) => {
        if (err) {
            return res.status(400).json({ status: false, message: 'Something went wrong' });
        }
        else if (response) {
            return res.status(400).json({ status: false, message: 'User already registered with this email' });
        }
        else if (response === null) {
            userModel.create(req.body).then(response => {
                return res.status(200).json(TokenResponseFn(response));
            }).catch(err => {
                return res.status(400).json({ status: false, message: 'Something went wrong' });
            });
        }
    });
}

const loginUserFn = (req, res) => {
    const { email, password } = req.body;

    userModel.findOne({ email }).exec((err, response) => {
        if (err) {
            return res.status(400).json({ status: false, message: 'Something went wrong' });
        }
        else if (response) {
            const verifyPassword = passwordHash.verify(password, response.password);
            if (verifyPassword) {
                return res.status(200).json(TokenResponseFn(response));
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
    client.verifyIdToken({ idToken: tokenId, audience: GOOGLE_CLIENT_ID }).then(response => {
        const { email_verified, email, name } = response.payload;
        if (email_verified) {
            userModel.findOne({ email }).exec((err, response) => {
                if (err) return res.status(400).json({ status: false, message: `Something went wrong` });
                if (response) {
                    return res.status(200).json(TokenResponseFn(response));
                }
                else if (response === null) {
                    userModel.create({ userName: name, email }).then(response => {
                        return res.status(200).json(TokenResponseFn(response));
                    });
                }
            });
        }
    });
}

const facebookAuthenticateFn = (req, res) => {
    const { accessToken, userID } = req.body;
    const urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=name,email&access_token=${accessToken}`;
    fetch(urlGraphFacebook, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(data => {
            const { name, id } = data;
            userModel.findOne({ email: id }).exec((err, response) => {
                if (err) return res.status(400).json({ status: false, message: `Something went wrong` });
                if (response) {
                    return res.status(200).json(TokenResponseFn(response));
                }
                else if (response === null) {
                    userModel.create({ userName: name, email: id }).then(response => {
                        return res.status(200).json(TokenResponseFn(response));
                    });
                }
            });
        });

}

module.exports = { registerUserFn, loginUserFn, googleAuthenticateFn, facebookAuthenticateFn };