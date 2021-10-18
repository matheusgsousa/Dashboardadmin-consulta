const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Scheduling = require('../models/Scheduling');
 

const router = express.Router();

// router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const schedulings = await Scheduling.find().populate(['user', 'tasks']);

    return res.send({ schedulings });
  } catch (err) {
    return res.status(400).send({ error: 'Error loading schedulings' });
  }
});

router.get('/:schedulingId', async (req, res) => {
  try {
    const scheduling = await Scheduling.findById(req.params.schedulingId).populate(['user', 'tasks']);

    return res.send({ scheduling });
  } catch (err) {
    return res.status(400).send({ error: 'Error loading scheduling' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, tasks } = req.body;

    const scheduling = await Scheduling.create({ title, description, user: req.userId });

    await Promise.all(tasks.map(async task => {
      const schedulingTask = new Task({ ...task, scheduling: scheduling._id });

      await schedulingTask.save();

      scheduling.tasks.push(schedulingTask);
    }));

    await scheduling.save();

    return res.send({ scheduling });
  } catch (err) {
    return res.status(400).send({ error: 'Error creating new scheduling' });
  }
});

router.put('/:schedulingId', async (req, res) => {
  try {
    const { title, description, tasks } = req.body;

    const scheduling = await Scheduling.findByIdAndUpdate(req.params.schedulingId, {
      title,
      description
    }, { new: true });

    scheduling.tasks = [];
    await Task.remove({ scheduling: scheduling._id });

    await Promise.all(tasks.map(async task => {
      const schedulingTask = new Task({ ...task, scheduling: scheduling._id });

      await schedulingTask.save();

      scheduling.tasks.push(schedulingTask);
    }));

    await scheduling.save();

    return res.send({ scheduling });
  } catch (err) {
    return res.status(400).send({ error: 'Error updating scheduling' });
  }
});

router.delete('/:schedulingId', async (req, res) => {
  try {
    await Scheduling.findByIdAndRemove(req.params.schedulingId);

    return res.send();
  } catch (err) {
    return res.status(400).send({ error: 'Error deleting scheduling' });
  }
});

module.exports = app => app.use('/schedulings', router);
