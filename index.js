// Express
const express = require('express');

// Database
const mongoose = require('mongoose');
const config = require('config');
const mongoURI = config.get('mongoURI');

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
const port = process.env.port || 5000;

/* APIs */
const usersRoute = require('./api/users');
app.use('/api/users', usersRoute);

const stickiesRoute = require('./api/stickies');
app.use('/api/stickies', stickiesRoute);

const profileRoute = require('./api/profile');
app.use('/api/profile', profileRoute);

/* Entry */
app.listen(
    port, 
    () => {
        console.log(`Server live on PORT ${port}...`);
    }
);
