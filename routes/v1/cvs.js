const express = require('express');

const cvsRouter = express.Router();

const { getCvs, createNewCv, deleteCv, updateCv } = require('../../controllers/cvs')
const { authenticated } = require('../../controllers/auth');

cvsRouter.route('/')
  .get( authenticated, getCvs )
  .post( authenticated, createNewCv );

cvsRouter.route('/:cvId')
  .delete( authenticated, deleteCv )
  .put( authenticated, updateCv )


module.exports = cvsRouter;
