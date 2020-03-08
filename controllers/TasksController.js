const Task = require('../models/Task');

exports.done = (req, res) => {
  let id = req.params.id;
  Task.find(id)
  .then((task) => {
    return Task.markAsDone(task);
  })
  .then((result) => {
    res.redirect('/');
  });
}

exports.store = (req, res) => {
  let task = {};
  task.description = req.body.description;
  Task.create(task).then((id) => {
    console.log('Task created with id: ', id);
    res.redirect('/');
  });
}
