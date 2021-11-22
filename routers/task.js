const express = require('express');
const router = new express.Router();
const Task = require('../models/task');

router.post('/task', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    console.log(req.body);
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send();
  }
});

router.get('/task', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (err) {
    res.status(400).send();
  }
});

router.get('/task/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.findById(id);
    res.send(task);
  } catch (err) {
    res.status(404).send();
  }
});

router.patch('/task/:id', (req, res) => {
  const id = req.params.id;
  const user = Task.findById(id);
  
});

module.exports = router;
