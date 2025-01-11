
const express = require('express');
const router = express.Router();

const User = require('../models/user.js');


router.get('/', async (req, res) => {
    try {
      res.render('dashboard/index.ejs');
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });
  
  
  // controllers/applications.js

router.get('/new-expense', async (req, res) => {
    res.render('dashboard/new-expense.ejs');
  });
 // controllers/applications.js

router.get('/my-expenses', async (req, res) => {
    try {
      // Look up the user from req.session
      const currentUser = await User.findById(req.session.user._id);
      // Render index.ejs, passing in all of the current user's
      // applications as data in the context object.
      res.render('dashboard/my-expenses.ejs', {
        expense: currentUser.expense,
      });
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error);
      res.redirect('/');
    }
  });
  
// controllers/applications.js`

router.post('/', async (req, res) => {
    try {
      // Look up the user from req.session
      const currentUser = await User.findById(req.session.user._id);
      // Push req.body (the new form data object) to the
      // applications array of the current user
      currentUser.expense.push(req.body);
      // Save changes to the user
      await currentUser.save();
      // Redirect back to the applications index view
      res.redirect(`/users/${currentUser._id}/dashboard/my-expenses`);
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error);
      res.redirect('/');
    }
  });
  
module.exports = router;
