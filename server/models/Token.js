const { Schema, model } = require('mongoose');

const tokenScheme = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
},{
    timestamps: true
})

const Token = model('Token', tokenScheme);

module.exports = Token