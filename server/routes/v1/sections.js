const express = require('express');

const sectionsRouter = express.Router();

const { getSections, createNewSection } = require('../../controllers/sections')
const { authenticated } = require('../../controllers/auth');

sectionsRouter.route('/')
  .post( authenticated, createNewSection );

sectionsRouter.route('/:cvId')
  .get( authenticated, getSections )


module.exports = sectionsRouter;
