const express = require('express');
const Event = require('../Models/eventModel');
const router = express.Router();
const {verifyToken} = require('../middleware/authMiddleware')

//ADD EVENT
router.post('/', verifyToken, async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      user: req.user.id, // Assign logged-in user's ID
    });
    await event.save();
    res.status(201).json({ success: true, message: 'Event added successfully.', event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


//PAST EVENT
// Fetch Past Events
router.get('/past', verifyToken, async (req, res) => {
  try {
    const events = await Event.find({
      user: req.user.id, // Filter by logged-in user
      date: { $lt: new Date() }, // Past dates
    });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Fetch Upcoming Events
router.get('/upcoming', verifyToken, async (req, res) => {
  try {
    const events = await Event.find({
      user: req.user.id, // Filter by logged-in user
      date: { $gte: new Date() }, // Upcoming dates
    });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


//ALL EVENT BY USER
// Fetch All Events for Logged-in User
router.get('/', verifyToken, async (req, res) => {
  try {
    const events = await Event.find({ user: req.user.id }); // Filter by user's ID
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


// Edit Event
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id, user: req.user.id }); // Check ownership
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found or unauthorized.' });
    }

    // Update event
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, message: 'Event updated successfully.', event: updatedEvent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete Event
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id, user: req.user.id }); // Check ownership
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found or unauthorized.' });
    }

// Delete event
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Event deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});





module.exports = router;
