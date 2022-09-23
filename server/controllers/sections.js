const Section = require('../models/Section');
const { catchAsync } = require('../utils/utils');

module.exports = {
    getSections: catchAsync(async (req, res) => {
        const { cvId } = req.params;
        const sections = await Section.find({cvId});
        res.json({status: 'success', sections})
    }),
    createNewSection: catchAsync(async (req, res) => {
        const { title, cvId } = req.body;
        console.log(title, cvId)
        const section = await Section.create({title, cvId});
        console.log(section)
        res.json({status: 'success', section})
    }),
    deleteSection: catchAsync(async (req, res) => {
        const { sectionId } = req.params;
        const section = await Section.findByIdAndDelete(sectionId);
        res.json({status: 'success', section})
    }),
    updateSection: catchAsync(async (req, res) => {
        const { sectionId } = req.params;
        const { title } = req.body;
        const section = await Section.findByIdAndUpdate(sectionId, {title}, {new: true});
        res.json({status: 'success', section})
    })
}