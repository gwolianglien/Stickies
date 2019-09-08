const express = require('express');

// Middleware
const auth = require('../middleware/auth');
const expressValidator = require('express-validator');

// Model
const Sticky = require('../models/Sticky');
const Profile = require('../models/Profile');

const router = express.Router();

// @route     POST api/stickies
// @desc      Create sticky
// @access    Private
router.post(
    '/',
    [
        auth,
        check('note', 'Enter a note for your sticky').not().isEmpty()
    ],
    async (req, res) => {
        const errors = expressValidator(req);
        if(!errors.array()) {
            return res.status(400).json({ errors: errors.array()});
        }

        try {
            
            const profile = await Profile.findOne({ user: req.user.id });
            if (!profile) {
                return res.status(404).json({ msg: 'Profile of current user cannot be found' });
            }

            const sticky = new Sticky({
                note: note,
                status: '',
            });

            // Save sticky
            await sticky.save((err) => {
                if (err) throw err;
            });

            // Update profile
            profile.stickies.unshift({ sticky: sticky.id });
            await profile.save((err, sticky) => {
                if (err) throw err;
                res.json(sticky);
            });

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route     PUT api/stickies/:id
// @desc      Create sticky
// @access    Private
router.put(
    '/:id',
    [
        auth
    ],
    async (req, res) => {

        // const errors = expressValidator(req);
        // if(!errors.array()) {
        //     return res.status(400).json({ errors: errors.array()});
        // }

        try {
            // Find
            let sticky = await Sticky.findById(req.params.id);
            if (!sticky) {
                return res.status(404).json({ msg: 'Sticky cannot be found' });
            }

            // Change status
            sticky.status = req.body.status;

            // Overwrite existing sticky
            await sticky.save((err, sticky) => {
                if (err) throw err;
                res.json(sticky);
            });

        } catch(err) {
            console.error(err.message);
            if(err.kind === 'ObjectId') {
                return res.status(404).json({ msg: 'Sticky cannot be found' });
            }
            res.status(500).send('Server Error');
        }
    }
);


// @route     DELETE api/stickies/:id
// @desc      Delete sticky
// @access    Private
router.delete(
    '/:id',
    [
        auth
    ],
    async (req, res) => {

        // const errors = expressValidator(req);
        // if(!errors.array()) {
        //     return res.status(400).json({ errors: errors.array()});
        // }

        try {
            // Find
            let sticky = await Sticky.findById(req.params.id);
            if (!sticky) {
                return res.status(404).json({ msg: 'Sticky cannot be found' });
            }

            // Remove
            await sticky.findOneAndDelete(req.params.id);
            res.json('Sticky removed');

        } catch(err) {
            console.error(err.message);
            if(err.kind === 'ObjectId') {
                return res.status(404).json({ msg: 'Sticky cannot be found' });
            }
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
