const { Schema, model } = require('mongoose');

const cvScheme = new Schema({
    name: {
        type: String,
        required: [true, "CV Name is Required"],
        unique: true
    },
    email: String,
    user: String,
},{
    timestamps: true
})

const CV = model('CV', cvScheme);

module.exports = CV