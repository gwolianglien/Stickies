const express = require('express');

// Middleware
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// Model
const Sticky = require('../models/Sticky');
const Profile = require('../models/Profile');

const router = express.Router();

/* User Profile APIs */

// @route    POST api/profile/create
// @desc     Create current user profile
// @access   Private
router.post(
    '/create',
    [
        auth
    ],
    async (req, res) => {
        try {

            const newProfile = new Profile({
                user: req.user.id,
                stickies: [],
            });

            await newProfile.save((err, newProfile) => {
                if (err) throw err;
                res.json(newProfile.stickies);
            });

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    GET api/profile/read
// @desc     Access current user profile
// @access   Private
router.get(
    '/read',
    [
        auth
    ],
    async (req, res) => {
        try {
            const profile = await Profile.findOne({ user: req.user.id });
            if (!profile) {
                return res.status(404).json({ msg: 'Profile not found' });
            }

            // Get all details of each sticky
            const stickies = [];
            for (var i in profile.stickies) {
                var stickyId = profile.stickies[i]._id;
                var curr = await Sticky.findById(stickyId);
                if (curr) {
                    stickies.push(curr);
                }
            }
            res.json(stickies);
            
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);


/* Profile APIs for CRUD Actions on Stickies */

// @route    POST api/profile/sticky
// @desc     Create new sticky and add to current user's list
// @access   Private
router.post(
    '/sticky',
    [
        auth,
        check('note', 'Please write a note!').not().isEmpty()
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {

            const profile = await Profile.findOne({ user: req.user.id });
            if (!profile) {
                return res.status(404).json({ msg: 'Profile not found'});
            }

            const sticky = new Sticky({
                note: req.body.note,
                status: '',
                owner: req.user.id
            });

            await sticky.save((err) => {
                if (err) throw err;
            });

            profile.stickies.unshift(sticky);
            await profile.save((err) => {
                if (err) throw err;
                res.json(profile.stickies);
            });

        } catch(err) {
            console.error(err.message);
            if (err.kind === 'ObjectId') {
                return res.status(404).json({ msg: 'Profile not found'});
            }
            res.status(500).send('Server Error');
        }
    }
);

// @route    PUT api/profile/:sticky_id
// @desc     Update an existing sticky
// @access   Private
router.put(
    '/:sticky_id',
    [
        auth,
    ],
    async (req, res) => {
        try {

            let sticky = await Sticky.findById(req.params.sticky_id);
            if (!sticky) {
                return res.status(404).json({ msg: 'Sticky not found'});
            }
            
            // Update attributes
            sticky.note = req.body.note;
            sticky.status = req.body.status;

            await sticky.save((err, sticky) => {
                if (err) throw err;
                res.json(sticky);
            });

        } catch(err) {
            console.error(err.message);
            if (err.kind === 'ObjectId') {
                return res.status(404).json({ msg: 'Sticky not found'});
            }
            res.status(500).send('Server Error');
        }
    }
);

// @route    DELETE api/profile/:sticky_id
// @desc     Remove sticky
// @access   Private
router.delete(
    '/:sticky_id',
    [
        auth,
    ],
    async (req, res) => {

        try {
            let sticky = await Sticky.findById(req.params.sticky_id);
            if (!sticky) {
                return res.status(404).json({ msg: 'Object Missing'});
            }

            let profile = await Profile.findOne({ user: req.user.id });
            if (!profile) {
                return res.status(404).json({ msg: 'Object Missing' });
            }

            var removeIndex = -1;
            for (var i = 0; i < profile.stickies.length; i++) {
                var curr = profile.stickies[i]
                var currId = String(curr._id);
                if (currId === req.params.sticky_id) {
                    removeIndex = i;
                }
            }
            if (removeIndex === -1) {
                return res.status(400).json({ msg: 'Bad Request' });
            }

            profile.stickies.splice(removeIndex, 1);
            await Sticky.findOneAndDelete({ '_id': req.params.sticky_id});
            await profile.save(
                (err) => {
                    if (err) throw err;
                    res.json({ msg: 'Sticky Removed' });
                }
            );
        } catch(err) {
            console.error(err.message);
            if (err.kind === 'ObjectId') {
                return res.status(404).json({ msg: 'Object Missing'});
            }
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
