const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Pacient = require('../models/Pacient');
 

const router = express.Router();

// router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const pacients = await Pacient.find().populate(['user', 'tasks']);

    return res.send({ pacients });
  } catch (err) {
    return res.status(400).send({ error: 'Error loading pacients' });
  }
});

router.get('/:pacientId', async (req, res) => {
  try {
    const pacient = await Pacient.findById(req.params.pacientId).populate(['user', 'tasks']);

    return res.send({ pacient });
  } catch (err) {
    return res.status(400).send({ error: 'Error loading pacient' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;

    const pacient = await Pacient.create({ name, email });

    await pacient.save();

    return res.send({ pacient });
  } catch (err) {
    return res.status(400).send({ error: 'Error creating new pacient' });
  }
});

router.put('/:pacientId', async (req, res) => {
  try {
    const { title, description, tasks } = req.body;

    const pacient = await Pacient.findByIdAndUpdate(req.params.pacientId, {
      title,
      description
    }, { new: true });

    pacient.tasks = [];
    await Task.remove({ pacient: pacient._id });

    await Promise.all(tasks.map(async task => {
      const pacientTask = new Task({ ...task, pacient: pacient._id });

      await pacientTask.save();

      pacient.tasks.push(pacientTask);
    }));

    await pacient.save();

    return res.send({ pacient });
  } catch (err) {
    return res.status(400).send({ error: 'Error updating pacient' });
  }
});

router.delete('/:pacientId', async (req, res) => {
  try {
    await Pacient.findByIdAndRemove(req.params.pacientId);

    return res.send();
  } catch (err) {
    return res.status(400).send({ error: 'Error deleting pacient' });
  }
});

module.exports = app => app.use('/pacients', router);
