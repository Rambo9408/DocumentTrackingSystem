const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    userid: {
        type: String, // Changed type to String
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    fullname: {
        type: String,
    },
    contact: {
        type: String, // Changed type to String
    },
    email: {
        type: String,
    },
    doj: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true });

const Admin = mongoose.model('admin', adminSchema); // Changed model name to 'Admin'
module.exports = Admin; // Changed export name to 'Admin'
