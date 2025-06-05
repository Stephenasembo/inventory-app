module.exports = {
  getPage: (req, res) => {
    res.render('items/itemPage.ejs')
  },
  getForm: (req, res) => {
    res.render('items/itemForm.ejs')
  },
  createItem: (req, res) => {
    console.log('Item will be created at the database.')
  }
};
