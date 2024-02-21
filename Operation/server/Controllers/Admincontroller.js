const { response } = require('express')
const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res, next) => {
    const { userId, username, password, fullname, contact, email, doj } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ $or: [{ email }, { userId }] })

        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newAdmin = new Admin({
            userId,
            username,
            password: hashedPassword,
            fullname,
            contact,
            email,
            doj: new Date(doj) // Use the date sent from frontend
        });

        const savedAdmin = await newAdmin.save()

        const token = jwt.sign({ userId: savedAdmin.userId }, 'your-secret-key', { expiresIn: '1h' });

        return res.status(201).json({ message: 'Admin registered successfully', token });

    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while registering the admin' });
    }
};

const login = async (req, res, next) => {
    const adminname = req.body.adminname;
    const password = req.body.password;

    try {
        const admin = await Admin.findOne({ $or: [{ email: adminname }, { userId: adminname }] })

        if (admin) {
            const result = await bcrypt.compare(password, admin.password)

            if (result) {
                const token = jwt.sign({ userId: admin.userId }, 'your-secret-key', { expiresIn: '1h' });
                return res.json({ message: 'Login Successful!', token });
            } else {
                return res.json({ message: 'Password does not match!' });
            }
        } else {
            return res.json({ message: 'No admin found!' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while logging in the admin' });
    }
};

module.exports = { register, login };