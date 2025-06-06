const db = require('../models/db/queries');

module.exports = {
  getPage: (req, res) => {
    res.render('items/itemPage.ejs')
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
  }
};
