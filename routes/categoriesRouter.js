const { Router } = require('express');
const router = Router();
const itemsRouter = require('./itemsRouter');
const controller = require('../controllers/categoriesController');

router.get('/', controller.getPage);
router.get('/new', controller.getForm);
router.post('/new', controller.createCategory);
router.use('/items', itemsRouter);

module.exports = router;
