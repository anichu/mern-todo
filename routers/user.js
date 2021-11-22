const express = require('express');
const router = new express.Router();
const User = require('../models/user');

router.post('/user', (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((re) => {
      res.status(201).send(re);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get('/user', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(400).send();
  }
});

router.get('/user/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.send(user);
  } catch (err) {
    res.status(404).send();
  }
});

router.patch('/user/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'password', 'email'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid update' });
  }

  const id = req.params.id;
  try {
    const user = await User.findById(id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    if (!user) {
      res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(404).send();
  }
});

module.exports = router;
