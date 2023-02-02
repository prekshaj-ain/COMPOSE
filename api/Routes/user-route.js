const express = require('express');
const { check } = require('express-validator');
const { login, signup, logout, getUsers, getUser } = require('../Controllers/User-controller');
const upload = require('../Middleware/fileUpload');
const router = express.Router();


router.post('/login',[
    check('email').normalizeEmail().toUpperCase()
],login);
router.post('/signup',upload.single('image'),[
    check('username')
        .not()
        .isEmpty(),
    check('email')
        .isEmail()
        .normalizeEmail()
        .toUpperCase(),
    check('password')
        .trim()
        .isLength({min:8, max:16})
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[@/$/!/%/*/#/?/&/-/_])(?=.*\d)[A-Za-z\d@$!%*#?&-_]{8,16}$/,'i')
],signup);
router.post('/logout',logout);
router.get('/',getUsers)
router.get('/:uid',getUser)

module.exports = router;