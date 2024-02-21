const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the CORS middleware

// Import User model
const User = require('./models/User');

const UserRoute = require('./routes/Userroutes');
const FileRoute = require('./routes/Userfileroutes');
const AdminRoute = require('./routes/Adminroute');

mongoose.connect('mongodb://127.0.0.1:27017/DocumentTracking');
const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
});

db.once('open', () => {
    console.log('Database Connection Established');
});

const app = express();

app.use(cors()); // Enable CORS
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use('/api/user', UserRoute);
app.use('/api/admin', AdminRoute);
app.use('/api/file', FileRoute);

app.get('/api/users', (req, res) => {
    // Use User model to fetch users from the database
    User.find()
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.json({ error: 'An error occurred' });
        });
});
