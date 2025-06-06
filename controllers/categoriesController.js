const db = require('../models/db/queries')

module.exports = {
  getPage: async (req, res) => {
    const id = [Number(req.params.categoryId)];
    const category = await db.getCategory(id);
    const items = await db.getAllItems(id);
    res.render('categories/categoryPage.ejs', { category, items });
  },
  getForm: (req, res) => {
    res.render('categories/categoryForm.ejs')
  },
  createCategory: (req, res) => {
    console.log('Category will be created at the database.')
  },
};
