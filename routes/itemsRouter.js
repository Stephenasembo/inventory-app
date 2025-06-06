const { Router } = require('express');
const router = Router();
const controller = require('../controllers/itemsController');

router.get('/:itemId/page', controller.getPage);
router.get('/:categoryId/new', controller.getForm);
router.post('/:categoryId/new', controller.createItem);

module.exports = router;
