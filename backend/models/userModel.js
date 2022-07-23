const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    type: {
        type: Number,
        default: 0, // 0 for normal user 1 for admin, might add another type later on
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    token: { type: String },
});

module.exports = mongoose.model("User", userSchema);