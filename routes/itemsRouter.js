const { Router } = require('express');
const router = Router();
const controller = require('../controllers/itemsController');

router.get('/', controller.getPage);
router.get('/new', controller.getForm);
router.post('/new', controller.createItem);

module.exports = router;
