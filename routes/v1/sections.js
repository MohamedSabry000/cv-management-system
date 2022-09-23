const express = require('express');

const sectionsRouter = express.Router();

const { getSections, createNewSection, deleteSection, updateSection } = require('../../controllers/sections')
const { authenticated } = require('../../controllers/auth');

sectionsRouter.route('/')
  .post( authenticated, createNewSection );

sectionsRouter.route('/:cvId')
  .get( authenticated, getSections )

sectionsRouter.route('/:sectionId')
  .put( authenticated, updateSection)
  .delete( authenticated, deleteSection )



module.exports = sectionsRouter;
