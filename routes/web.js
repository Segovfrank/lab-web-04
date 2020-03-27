const router = require('express').Router();
const homepageController = require('../controllers/HomepageController');
const tasksController = require('../controllers/TasksController');

router.get('/', homepageController.index);

router.post('/tasks', tasksController.store);

router.delete('/tasks/:id', tasksController.delete);

router.post('/tasks/:id/done', tasksController.done);

module.exports = router;
