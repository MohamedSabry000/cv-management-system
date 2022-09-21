const { Schema, model } = require('mongoose');

const sectionScheme = new Schema({
    title: {
        type: String,
        required: [true, "Title is Required"],
    },
    cvId: String
},{
    timestamps: true
})

const Section = model('Section', sectionScheme);

module.exports = Section