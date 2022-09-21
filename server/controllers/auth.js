const jwt = require('jsonwebtoken');
const { compare, hash } = require('bcryptjs')
const { catchAsync } = require('../utils/utils')
const User = require('../models/User');
const Token = require("../models/Token");
const sendEmail = require('../utils/email');

const saltRounds = 10;

module.exports = {
  login: catchAsync(async (req, res) => {
    const { email, password } = req.body;
    // find email
    console.log("email, passwor")
    console.log(email, password)
    const user = await User.findOne({email});
    console.log("user")
    console.log(user)
    // match
    if(!user || !(await compare(password, user.password)) || user.verified === false) res.json({status: 'failure', message: 'Invalid Email or Password'})
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET , {
        expiresIn: '90d'
    })

    console.log(`Token: ${token}`);

    res.json({status: 'success', token})
  }),
  signup: catchAsync(async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // find email
        const user = await User.findOne({email});
        // match
        if(user && user.verified) res.json({status: 'failure', message: 'Email already exists'})
        if(user && !user.verified) {
            await User.findByIdAndDelete(user._id);
        }
        const hashedPwd = await hash(password, saltRounds); // hash password
        const newUser = await User.create({name, email, password: hashedPwd});
        const token = jwt.sign({id: newUser.id}, process.env.JWT_SECRET , {
            expiresIn: '90d'
        })
        console.log(token)
        const tokenn = await new Token({
            userId: newUser._id,
            // token: crypto.randomBytes(32).toString("hex"),
            token: token,
        }).save();
        console.log(tokenn)
        const message = `${process.env.BASE_URL}/api/v1/verify/${newUser._id}/${tokenn.token}`;
        console.log(message)
        await sendEmail(newUser.email, "Verify Email", message);

        // res.send("An Email sent to your account please verify");
        console.log(`Token: ${tokenn}`);

        res.json({status: 'success', token})
    } catch (error) {
        res.status(400).send("An error occured");
    }
  }),
  verify: catchAsync(async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id });
        if (!user) return res.status(400).send("Invalid link");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });

        if (!token) return res.status(400).send("Invalid link");
        console.log({ _id: user._id, verified: true })

        await User.findByIdAndUpdate({ _id: user._id }, { verified: true });

        await Token.findByIdAndRemove(token._id);

        // res.send("email verified sucessfully");
        res.send(
            `<h1 style='text-align: center'>Email verified successfully</h1>
            <p style='text-align: center'>You can now login to your account</p>
            <p style='text-align: center'><a href='${process.env.HOST_URL}/'>Login</a></p>`
        );
    } catch (error) {
        res.status(400).send("An error occured");
    }
  }),
}
