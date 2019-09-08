const express = require('express');

// Middleware
const expressValidator = require('express-validator')

// Model
const User = require('../models/User');

const router = express.Router();

// @route     POST api/user
// @desc      Create user
// @access    Public
router.post(
    '/',
    [
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'Please enter a password of 8 or more characters').length({min: 8}),
    ],
    async (req, res) => {
        const errors = expressValidator(req);
        if(!errors.array()) {
            return res.status(400).json({ errors: errors.array()});
        }

        try {
            const { email, password } = req.body;


            // Check if user already exists in database
            let user = await User.findOne({ email: newUser.email });
            if (user) {
                return res.status(400).json({ msg: 'User already exists.' });
            }

            user = new User({
                email: email,
                password: password
            });

            // Generate SALT using BcryptJS and hash password 
            const salt = await bcryptjs.genSalt(10);
            user.password = await bcryptjs.hash(user.password, salt);

            // Define JWT Payload
            const payload = {
                user: {
                    id: user.id,  // Grab user ID from newUser object
                }
            }

            // Sign JWT token
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { 
                    expiresIn: config.get('jwtExpiration') 
                },
                (err, token) => {
                    if (err) {
                        return console.error(err);
                    }
                    user.token = token;
                }
            );

            // Save user
            await user.save((err, user) => {
                if (err) throw err;
                res.json(user);
            });

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    }
);

module.exports = router;
