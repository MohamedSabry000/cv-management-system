const express = require('express');

const cvsRouter = express.Router();

const { getCvs, createNewCv } = require('../../controllers/cvs')
const { authenticated } = require('../../controllers/auth');

cvsRouter.route('/')
  .get( authenticated, getCvs )
  .post( authenticated, createNewCv );


module.exports = cvsRouter;
