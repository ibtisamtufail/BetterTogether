const router = require('express').Router();
const multer = require('multer');
const { verifyUserTokenFn } = require('../middleware/verifyUserToken');
const { createGroupValidationFn } = require('../middleware/validation');
const {
    createNewGroupFn,
    findAllGroupsFn,
    updateBasicGroupFn,
    addGroupMembersFn,
    addGroupRefereeFn,
    addMemberStakesFn,
    addThresholdFn,
    addGroupReportFn
} = require('../controllers/groupController');

// Multer for Profile Upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/groupProfiles');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

// Create Group Middleware
const createGroupMiddleware = [
    verifyUserTokenFn,
    upload.single('profile'),
    createGroupValidationFn,
    createNewGroupFn
];

// Update Group Middleware
const updateGroupMiddleware = [
    verifyUserTokenFn,
    upload.single('profile'),
    updateBasicGroupFn,
];

// Routes
router.post('/create', createGroupMiddleware);
router.get('/getAll', verifyUserTokenFn, findAllGroupsFn);
router.put('/update', updateGroupMiddleware);
router.put('/addMembers', verifyUserTokenFn, addGroupMembersFn);
router.put('/addReferee', verifyUserTokenFn, addGroupRefereeFn);
router.put('/addStakes', verifyUserTokenFn, addMemberStakesFn);
router.put('/addThreshold', verifyUserTokenFn, addThresholdFn);
router.put('/addReport', verifyUserTokenFn, addGroupReportFn);

module.exports = router;