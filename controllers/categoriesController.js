const db = require('../models/db/queries');
const asyncHandler = require('express-async-handler');
const { getUpdateForm } = require('./itemsController');

module.exports = {
  getPage: asyncHandler(async (req, res) => {
    const id = [Number(req.params.categoryId)];
    const category = await db.getCategory(id);
    const items = await db.getAllItems(id);
    res.render('categories/categoryPage.ejs', { category, items });
  }),
  getForm: asyncHandler( (req, res) => {
    res.render('categories/categoryForm.ejs')
  }),
  createCategory: asyncHandler( async (req, res) => {
    const values = req.body;
    await db.createUserCategory(values)
    res.redirect('/')
  }),
  deleteCategory: asyncHandler( async (req, res) => {
    const id = req.params.categoryId;
    await db.deleteCategory(id);
    res.redirect('/');
  }),
  getUpdateForm: asyncHandler( async (req, res) => {
    const id = req.params.categoryId;
    const category = await db.getCategory([Number(id)]);
    res.render('categories/updateCategory', {category})
  }),
  updateCategory: asyncHandler( async (req, res) => {
    const id = req.params.categoryId;
    const inputObj = verifyData(req.body);
    const category = await db.getCategory([Number(id)]);
    inputObj.previousName = (category.name).toLowerCase();
    await db.updateCategory(inputObj);
    res.redirect('/');
  }),
};

function verifyData(body) {
  if(body.newCol === '') {
    delete body.newCol;
    delete body.dataType;
  }
  if(body.delCol === '') {
    delete body.delCol;
  }
  return body;
}