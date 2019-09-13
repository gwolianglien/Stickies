const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// Middleware
const { check, validationResult } = require('express-validator');

// Model
const User = require('../models/User');

const router = express.Router();

// @route     POST api/users
// @desc      Create user
// @access    Public
router.post(
    '/',
    [
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'Please enter a password of 8 or more characters').isLength({min: 8}),
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ msg: 'User already exists.' });
            }

            const newUser = new User({
                email: req.body.email,
                password: req.body.password
            });

            // Generate SALT using BcryptJS and hash password 
            const salt = await bcryptjs.genSalt(10);
            newUser.password = await bcryptjs.hash(newUser.password, salt);

            // Define and sign JWT Payload
            const payload = {
                user: {
                    id: newUser.id,  // Grab user ID from newUser object
                }
            }
            
            var obj = {}

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { 
                    expiresIn: config.get('jwtExpiration'),
                },
                (err, token) => {
                    if (err) {
                        return console.error(err);
                    }
                    obj.token = token;
                }
            );
            
            // Save user
            await newUser.save((err) => {
                if (err) throw err;
                res.json(obj);
            });

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    }
);

module.exports = router;
