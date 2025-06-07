const { Router } = require('express');
const router = Router();
const controller = require('../controllers/itemsController');

router.get('/:itemId/page', controller.getPage);
router.get('/:categoryId/new', controller.getForm);
router.post('/:categoryId/new', controller.createItem);
router.get('/:itemId/update', controller.getUpdateForm);
router.post('/:itemId/update', controller.updateItem);

module.exports = router;
