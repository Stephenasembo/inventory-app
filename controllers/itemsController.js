const db = require('../models/db/queries');

module.exports = {
  getPage: async (req, res) => {
    const id = [Number(req.params.itemId)];
    const item = await db.getItem(id);
    res.render('items/itemPage.ejs', {item})
  },
  getForm: async (req, res) => {
    const id = [Number(req.params.categoryId)];
    const category = await db.getCategory(id);
    res.render('items/itemForm.ejs', { category })
  },
  createItem: async (req, res) => {
    const id = req.params.categoryId;
    const name = req.body.itemName;
    await db.createItem([name, id]);
    res.redirect(`/categories/${id}/page`);
  },
  getUpdateForm: async (req, res) => {
    const id = [req.params.itemId];
    const item = await db.getItem(id);
    res.render('items/updateItem.ejs', {item})
  },
  updateItem: async (req, res) => {
    const id = [req.params.itemId];
    const item = await db.getItem(id);
    const newValue = req.body.newItemName;
    await db.updateItem(newValue, item.name);
    res.redirect(`/categories/${Number(item.categories_id)}/page`);
  },
};
