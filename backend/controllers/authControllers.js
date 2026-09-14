/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

const bcrypt = require('bcrypt')
const User = require('../models/userModel');
const {sendEmail, resetPasswordEmail} = require('../utils/sendEmail');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
const jwt = require('jsonwebtoken');
const generateAccessToken = require('../utils/generateAccessToken');
const registerController = async (req, res) => {
    try {
        const { email, password, confrimPassword, terms, fullName } = req.body
        if (!email || !password || !terms) {
            return res.status(400).json({ success: false, message: 'Please fill in all required fields.' })
        }
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Please provide a valid email address.' })
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long.' })
        }
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ success: false, message: 'Password must contain at least one letter and one number.' })
        }
        if (password !== confrimPassword) {
            return res.status(400).json({ success: false, message: 'Passwords do not match.' })
        }

        const hashPassword = bcrypt.hashSync(password, 10)

        const user = new User({ email, terms, fullName, password: hashPassword })
        await user.save()

        const token = generateAccessToken(user)
        await sendEmail(email, token)

        return res.status(201).json({ success: true, message: 'Register success.' })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please fill in all required fields.' })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid Credential.' })
        }
        const passwordVerify = await bcrypt.compare(password, user.password)
        if (!passwordVerify) {
            return res.status(400).json({ success: false, message: 'Invalid Credential.' })
        }
        return res.status(200).json({ success: true, message: 'Login success.', data: { _id: user._id, fullName: user.fullName } })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const verifyAccountController = async (req, res) => {
    try {
        const { token } = req.params
        if (!token) {
            return res.status(400).json({ success: false, message: 'Please send token.' })
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decode._id)
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' })
        }
        if (user.isVerifed) {
            return res.status(400).json({ success: false, message: 'Account already verifed.' })
        }
        user.isVerifed = true
        await user.save()
        return res.status(200).json({ success: true, message: 'Account verify success.', data: { _id: user._id, fullName: user.fullName, isVerifed: user.isVerifed, email: user.email } })
    } catch (error) {
        return res.status(400).json({ success: false, message: 'Invalid token or token expired' })
    }
}


const forgotPasswordController = async (req,res) => {
    try {
        const {email} = req.body
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required.'})
        }
        const existingUser = await User.findOne({email})
        if (!existingUser) {
            return res.status(404).json({ success: false, message: 'User not found.'})
        }

        const token = generateAccessToken(existingUser)
        await resetPasswordEmail(email,token) 
        return res.status(200).json({ success: true, message: 'Password resset email send successfully, please check your email.' })
    } catch (error) {
        
    }
}


module.exports = { registerController, loginController, verifyAccountController, forgotPasswordController }