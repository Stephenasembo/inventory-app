const { Router } = require('express');
const router = Router({mergeParams: true});
const itemsRouter = require('./itemsRouter');
const controller = require('../controllers/categoriesController');

router.get('/:categoryId/page', controller.getPage);
router.get('/new', controller.getForm);
router.post('/new', controller.createCategory);
router.use('/items', itemsRouter);
router.get('/:categoryId/delete', controller.deleteCategory);
router.get('/:categoryId/update', controller.getUpdateForm);
router.post('/:categoryId/update', controller.updateCategory);

module.exports = router;
