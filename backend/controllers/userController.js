const User = require('../models/userModel')
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body

        if (!(email && password && first_name && last_name)) {
            return res.status(400).json({ msg: "All input is required" })
        }

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).json({ msg: "User Already Exist. Please Login" })
        }

        encryptedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
            type: 0
        });

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        )
        user.token = token;
        user.password = undefined
        res.status(201).json(user)
    } catch (err) {
        console.log(err);
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!(email && password)) {
            return res.status(400).json({ msg: "All input is required" })
        }

        const user = await User.findOne({ email })

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            )

            user.token = token
            console.log(user)
            user.password = undefined
            return res.status(200).json(user)
        }

        return res.status(400).json({ msg: "Invalid Credentials" })
    } catch (err) {
        console.log(err)
    }
}

module.exports = { register, login}