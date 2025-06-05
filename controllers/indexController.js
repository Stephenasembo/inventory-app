const db = require('../models/db/queries')

module.exports = {
  getIndex: async (req, res) => {
    const categories = await db.getAllCategories();
    res.render('index', {categories})
  }
};
