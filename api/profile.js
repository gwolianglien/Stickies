const express = require('express');

// Middleware
const auth = require('../middleware/auth');
const expressValidator = require('express-validator');

// Model
const Sticky = require('../models/Sticky');
const Profile = require('../models/Profile');

const router = express.Router();

module.exports = router;