const CV = require('../models/CV');
const { catchAsync } = require('../utils/utils');

module.exports = {
    getCvs: catchAsync(async (req, res) => {
        const cvs = await CV.find({ user: req.userId });
        res.json({status: 'success', cvs})
    }),
    createNewCv: catchAsync(async (req, res) => {
        const { name, email } = req.body;
        console.log(name, email)
        const cv = await CV.create({name, email, user: req.userId});
        console.log(cv)
        res.json({status: 'success', cv})
    })
}