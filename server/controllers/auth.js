
const { catchAsync } = require('../utils/utils')

module.exports = {
  login: catchAsync(async (req, res) => {
    const { email, password } = req.body;

    res.json({status: 'success'})
  })
}
