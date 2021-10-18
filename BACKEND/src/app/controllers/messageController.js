const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Message = require('../models/Message');

const router = express.Router();

// router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const messages = await Message.find()//.populate(['user', 'tasks']);

    return res.send({ messages });
  } catch (err) {
    return res.status(400).send({ error: 'Error loading messages' });
  }
});

router.get('/:messageId', async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId)//.populate(['user', 'tasks']);

    return res.send({ message });
  } catch (err) {
    return res.status(400).send({ error: 'Error loading message' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, topic, message } = req.body;

    const message = await Message.create({ name, email, topic, message });

    await message.save();

    return res.send({ message });
  } catch (err) {
    return res.status(400).send({ error: 'Error creating new message' });
  }
});

router.delete('/:messageId', async (req, res) => {
  try {
    await Message.findByIdAndRemove(req.params.messageId);

    return res.send();
  } catch (err) {
    return res.status(400).send({ error: 'Error deleting message' });
  }
});

module.exports = app => app.use('/messages', router);
