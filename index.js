// Express
const express = require('express');

// Database
const mongoose = require('mongoose');
const config = require('config');
const mongoURI = config.get('mongoURI');

// Dependencies
const path = require('path');

/* DB Connection */
const connection = async () => {
    try {
        await mongoose.connect(
            mongoURI, 
            {
                useNewUrlParser: true,
                useCreateIndex: true,
            }
        );
        console.log('MongoDB Connected...');
    } catch(err) {
        console.error(err.message);
        process.exit(1);
    }
}

/* App */
const app = express();
connection();
app.use(express.json({ extended: false }));

/* APIs */
app.use('/api/users', require('./api/users'));
app.use('/api/stickies', require('./api/stickies'));
app.use('/api/profile', require('./api/profile'));
app.use('/api/auth', require('./api/auth'));

/* Serve static assets in production */
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));  // Set static folder
    app.get(
        '*', 
        (req, res) => {
            res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
        }
    );
}

const port = process.env.port || 5000;

/* Entry */
app.listen(
    port, 
    () => {
        console.log(`Server live on PORT ${port}...`);
    }
);
