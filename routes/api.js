const express = require('express');
const router = express.Router();
const User = require('../models/user'); 
const ApiController = require('../controllers/apicontroller')

router.get('/users', (req, res) => {
  ApiController.index(req,res);
});


router.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  User.getById(userId, (err, user) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(user);
    }
    console.log(res);
  });
});



module.exports = router;