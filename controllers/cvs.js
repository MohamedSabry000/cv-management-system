const CV = require('../models/CV');
const Section = require('../models/Section');
const { catchAsync } = require('../utils/utils');

module.exports = {
    getCvs: catchAsync(async (req, res) => {
        console.log("Id from Token: ", req.userId)
        const cvs = await CV.find({ user: req.userId });
        res.json({status: 'success', cvs})
    }),
    createNewCv: catchAsync(async (req, res) => {
        const { name, email } = req.body;
        console.log(name, email)
        const cv = await CV.create({name, email, user: req.userId});
        console.log(cv)
        res.json({status: 'success', cv})
    }),
    deleteCv: catchAsync(async (req, res) => {
        const { cvId } = req.params;
        await Section.deleteMany({cvId});
        const cv = await CV.findByIdAndDelete(cvId);
        res.json({status: 'success', cv})
    }),
    updateCv: catchAsync(async (req, res) => {
        const { cvId } = req.params;
        console.log("==============================")

        const { name, email } = req.body;
        const cv = await CV.findByIdAndUpdate(cvId, {name, email}, {new: true});
        res.json({status: 'success', cv})
    })
}