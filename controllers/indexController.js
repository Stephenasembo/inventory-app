const db = require('../models/db/queries')
const asyncHandler = require('express-async-handler');

module.exports = {
  getIndex: asyncHandler( async (req, res) => {
    const categories = await db.getAllCategories();
    res.render('index', {categories})
  }),
};
