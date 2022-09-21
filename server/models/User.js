const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');
const { hash } = require('bcryptjs');

const userScheme = new Schema({
    name: {
        type: String,
        required: [true, "Name is Required"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: isEmail,
            message: "Enter valid email"
        }
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    avatar: String,
    verified: {
        type: Boolean,
        default: false,
    },
},{
    timestamps: true
})

userScheme.pre('save', async function(next){
    this.password = await hash(this.password, 12);
    next();
})

const User = model('User', userScheme);

module.exports = User