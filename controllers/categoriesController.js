module.exports = {
  getPage: (req, res) => {
    res.render('categories/categoryPage.ejs')
  },
  getForm: (req, res) => {
    res.render('categories/categoryForm.ejs')
  },
  createCategory: (req, res) => {
    console.log('Category will be created at the database.')
  },
};
