const db = require('../models/db/queries');
const asyncHandler = require('express-async-handler');

module.exports = {
  getPage: asyncHandler(async (req, res) => {
    const id = [Number(req.params.itemId)];
    const item = await db.getItem(id);
    // These details should not be rendered
    delete item.id;
    delete item.name;
    delete item.categories_id;
    res.render('items/itemPage.ejs', {item})
  }),
  getForm: asyncHandler(async (req, res) => {
    const id = [Number(req.params.categoryId)];
    const category = await db.getCategory(id);
    const fields = await db.getCategoryFields(category.name);
    res.render('items/itemForm.ejs', { category, fields })
  }),
  createItem: asyncHandler(async (req, res) => {
    const id = req.params.categoryId;
    const values = new Map(Object.entries(req.body));
    await db.createItem(id, values);
    res.redirect(`/categories/${id}/page`);
  }),
  getUpdateForm: asyncHandler(async (req, res) => {
    const id = [req.params.itemId];
    const item = await db.getItem(id);
    res.render('items/updateItem.ejs', {item})
  }),
  updateItem: asyncHandler(async (req, res) => {
    const id = [req.params.itemId];
    const item = await db.getItem(id);
    const category = await db.getCategory([item.categories_id])
    const newValue = req.body.newItemName;
    await db.updateItem(category.name, newValue, item.name);
    res.redirect(`/categories/${Number(category.id)}/page`);
  }),
  deleteItem: asyncHandler(async (req, res) => {
    const itemId = [Number(req.params.itemId)];
    const item = await db.getItem(itemId);
    const category = await db.getCategory([Number(item.categories_id)]);
    await db.deleteItem(itemId, item.name, category.name);
    res.redirect(`/categories/${Number(item.categories_id)}/page`);
  }),
};
