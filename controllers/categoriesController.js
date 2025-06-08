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
  createCategory: async (req, res) => {
    const values = req.body;
    await db.createUserCategory(values)
    res.redirect('/')
  },
};
