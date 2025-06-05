const { Router } = require('express');
const router = Router();
const controller = require('../controllers/indexController');

router.get('/', controller.getIndex);

module.exports = router;
