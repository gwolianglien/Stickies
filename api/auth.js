/* Dependencies */
const express = require('express');
const { check, validationResult } = require('express-validator');
const config = require('config');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

/* Data Models */
const User = require('../models/User');

const router = express.Router();

// @route    GET api/auth
// @desc     Read current user's data
// @access   Private
router.get(
    '/',
    [
        auth
    ],
    async (req, res) => { 
        try {
            const user = await User.findById(req.user.id).select('-password');
            if(!user) {
                return res.status(404).json({ msg: 'User not found' });
            }
            res.json(user);
        } catch(err) {
            console.error(err.messasge);
            if(err.kind === 'ObjectId') {
                return res.status(404).json({ msg: 'User not found' });
            }
            res.status(500).send('Server Error');
        }
    }
);

// @route    POST api/auth
// @desc     Authenticate user and create JWT
// @access   Public
router.post(
    '/',
    [
        check('email', 'Please enter your email').not().isEmpty(),
        check('password', 'Please enter your password').isLength({ min: 8 }),
    ],
    async (req, res) => { 
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Find user with given email
            const currUser = await User.findOne({ email: req.body.email });       

            if (!currUser) {
                return res.status(422).json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            const isPasswordMatch = await bcryptjs.compare(req.body.password, currUser.password);

            if (!isPasswordMatch) {
              return res.status(422).json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            // Define 'user' param for header
            const payload = {
                user: {
                    id: currUser.id,
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: config.get('jwtExpiration') },
                (err) => {
                    if (err) throw err;
                    res.json(currUser);
                }
            );

        } catch(err) {
            console.error(err.messasge);
            if (err.kind === 'ObjectId') {
                return res.status(422).json({ errors: [{ msg: 'Invalid Credentials' }] });
            }
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
