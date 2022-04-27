const groupModel = require('../models/groupModel');
const { BasicResponseFn } = require('../middleware/response');

const createNewGroupFn = (req, res) => {
    const { title, category, members } = req.body;
    members.push(req.user);

    const memberArray = members.map(item => {
        return { member: item };
    });

    const groupObject = {};
    if (req.user) { groupObject.creator = req.user }
    if (title) { groupObject.title = title };
    if (category) { groupObject.category = category };
    if (req.file) { groupObject.profile = req.file.path };
    if (members) { groupObject.members = memberArray };

    groupModel.create(groupObject).then((response) => {
        return res.json(BasicResponseFn(response));
    }).catch(err => {
        console.log(err.message);
        return res.json({ status: false, message: 'Something went wrong' });
    });
}

const findAllGroupsFn = (req, res) => {
    groupModel.find()
        .populate('creator', 'userName email')
        .populate('members.member', 'userName email')
        .populate('referee.member', 'userName email')
        .populate('stakes.member', 'userName email')
        .populate('stakesPercentage.member', 'userName email')
        .populate('thresHold.member', 'userName email')
        .populate('reports.member', 'userName email')
        .select('-createdAt -updatedAt -__v')
        .then((groups) => {
            return res.json({ status: true, groups });
        }).catch(err => {
            return res.json({ status: false, message: 'Something went wrong' });
        });
}

const updateBasicGroupFn = (req, res) => {
    const { title, category, groupID } = req.body;

    const groupObject = {};
    if (title) { groupObject.title = title };
    if (category) { groupObject.category = category };
    if (req.file) { groupObject.profile = req.file.path };

    groupModel.findOneAndUpdate(
        { _id: groupID },
        { $set: groupObject },
        { new: true },
    ).then((response) => {
        return res.json(BasicResponseFn(response));
    }).catch(err => {
        return res.json({ status: false, message: 'Something went wrong' });
    });
}

const addGroupMembersFn = (req, res) => {
    const { groupID, members } = req.body;

    const memberArray = members.map(item => {
        return { member: item };
    });

    groupModel.findOneAndUpdate(
        { _id: groupID },
        { $push: { members: { $each: memberArray } } },
        { new: true },
    ).then((response) => {
        return res.json(BasicResponseFn(response));
    }).catch(err => {
        return res.json({ status: false, message: 'Something went wrong' });
    });
}

const addGroupRefereeFn = (req, res) => {
    const { groupID, referee } = req.body;
    let refereeObj = null;

    if (referee.toLowerCase() === 'whole group') {
        refereeObj = referee;
    }
    else {
        refereeObj = { member: referee };
    }
    groupModel.findOneAndUpdate(
        { _id: groupID },
        { $set: { referee: refereeObj } },
        { new: true },
    ).then((response) => {
        return res.json(BasicResponseFn(response));
    }).catch(err => {
        return res.json({ status: false, message: 'Something went wrong' });
    });
}

const addMemberStakesFn = (req, res) => {
    const { groupID, stakeValue, stakePercentage } = req.body;
    const stakes = { member: req.user, stakeValue };
    const stakesPercentage = { member: req.user, percentage: stakePercentage };
    let Query = null;

    groupModel.findOne({ 'stakes.member': req.user, 'stakesPercentage.member': req.user })
        .then((response) => {
            if (response) {
                Query = { $set: { stakes, stakesPercentage } };
            }
            else {
                Query = { $push: { stakes, stakesPercentage } };
            }
            groupModel.findOneAndUpdate(
                { _id: groupID }, Query, { new: true }).then((response) => {
                    return res.json(BasicResponseFn(response));
                }).catch(err => {
                    return res.json({ status: false, message: 'Something went wrong' });
                });

        }).catch(err => {
            console.log(err.message);
            return res.json({ status: false, message: 'Something went wrong' });
        });
}

const addThresholdFn = (req, res) => {
    const { groupID, thresholdValue } = req.body;
    const thresHold = { member: req.user, thresholdValue };
    let Query = null;

    groupModel.findOne({ 'thresHold.member': req.user })
        .then((response) => {
            if (response) {
                Query = { $set: { thresHold } };
            }
            else {
                Query = { $push: { thresHold } };
            }
            groupModel.findOneAndUpdate(
                { _id: groupID }, Query, { new: true }).then((response) => {
                    return res.json(BasicResponseFn(response));
                }).catch(err => {
                    return res.json({ status: false, message: 'Something went wrong' });
                });

        }).catch(err => {
            return res.json({ status: false, message: 'Something went wrong' });
        });
}

const addGroupReportFn = (req, res) => {
    const { groupID, report } = req.body;

    groupModel.findOneAndUpdate(
        { _id: groupID },
        { $push: { reports: { member: req.user, report } } },
        { new: true }
    ).then((response) => {
        return res.json({ status: true, data: response });
    }).catch((err) => {
        return res.json({ status: false, message: 'Something went wrong' });
    });
}

module.exports =
{
    createNewGroupFn,
    findAllGroupsFn,
    updateBasicGroupFn,
    addGroupMembersFn,
    addGroupRefereeFn,
    addMemberStakesFn,
    addThresholdFn,
    addGroupReportFn
};