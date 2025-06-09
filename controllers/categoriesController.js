const db = require('../models/db/queries');
const { getUpdateForm } = require('./itemsController');

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
  deleteCategory: async (req, res) => {
    const id = req.params.categoryId;
    await db.deleteCategory(id);
    res.redirect('/');
  },
  getUpdateForm: async (req, res) => {
    const id = req.params.categoryId;
    const category = await db.getCategory([Number(id)]);
    res.render('categories/updateCategory', {category})
  },
  updateCategory: async (req, res) => {
    const id = req.params.categoryId;
    const inputObj = req.body;
    const category = await db.getCategory([Number(id)]);
    inputObj.previousName = (category.name).toLowerCase();
    await db.updateCategory(inputObj);
    res.redirect('/');
  },
};
