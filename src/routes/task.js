const express = require('express');
const TaskController = require('../controllers/taskControllers');

const router = express.Router();

router.get('/datos', TaskController.index);
router.get('/create', TaskController.create);
router.post('/create', TaskController.store);
router.post('/datos/delete', TaskController.destroy);
router.get('/datos/edit/:id', TaskController.edit);
router.post ('/datos/edit/:id', TaskController.update);


module.exports = router;