const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    }
},{timestamps: true});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordMatch = async function (password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAuthToken = function (){
    return jwt.sign(
    {
        id: this._id,
        email:this.email,
    },
    config.JWT_SECRET,
    {
        expiresIn: config.JWT_EXPIRES_IN,
    }
)
}

userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
    {
        id: this._id,
    },
    config.JWT_SECRET,
    {
        expiresIn: config.REFRESH_TOKEN_EXPIRES_IN,
    }
    )
}

const User = mongoose.model('User', userSchema);
module.exports = User;