const messageModel = require('../models/messageModel');

const saveMessageFn = (req, res) => {
    const { groupID, message } = req.body;
    const messageObj = { group: groupID, message, sender: req.user };

    messageModel.create(messageObj).then((response) => {
        return res.json({ status: true, data: response });
    }).catch((err) => {
        return res.json({ status: false, message: 'Something went wrong' });
    });
}

const findGroupMessageFn = (req, res) => {
    const { groupID } = req.body;
    messageModel.find({ group: groupID })
        .populate('sender', 'userName email')
        .then((response) => {
            return res.json({ status: true, data: response });
        }).catch((err) => {
            return res.json({ status: false, message: 'Something went wrong' });
        });
}

module.exports = { saveMessageFn, findGroupMessageFn }