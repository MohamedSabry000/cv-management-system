module.exports = {
  catchAsync: (fn) => async (req, res, next) => {
    console.log(req.body);
    try {
      await fn(req, res, next);
    } catch (error) {
      console.log('catchAsync error', error);
      next(error);
    }
  },
};
