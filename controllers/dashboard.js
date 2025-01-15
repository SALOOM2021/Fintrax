
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
  
router.get('/new-expense', async (req, res) => {
    res.render('dashboard/new-expense.ejs');
  });


router.get('/my-expenses', async (req, res) => {
    try {
      
      const currentUser = await User.findById(req.session.user._id);
      
      res.render('dashboard/my-expenses.ejs', {
        expense: currentUser.expense,
      });
    } catch (error) {
      
      console.log(error);
      res.redirect('/');
    }
  });

router.post('/', async (req, res) => {
    try {
      
      const currentUser = await User.findById(req.session.user._id);
      currentUser.expense.push(req.body);
      
      await currentUser.save();
      
      res.redirect(`/users/${currentUser._id}/dashboard/my-expenses`);
    } catch (error) {
      
      console.log(error);
      res.redirect('/');
    }
  });

router.get('/my-expenses/:expenseId', async (req, res) => {
    try {
      
      const currentUser = await User.findById(req.session.user._id);
      
      const expense = currentUser.expense.id(req.params.expenseId);
      
      res.render('dashboard/show.ejs', {
        expense: expense,
      });
    } catch (error) {
      
      console.log(error);
      res.redirect('/');
    }
  });
  

router.delete('/my-expenses/:expenseId', async (req, res) => {
    try {
      
      const currentUser = await User.findById(req.session.user._id);
      currentUser.expense.id(req.params.expenseId).deleteOne();
      
      await currentUser.save();
      
      res.redirect(`/users/${currentUser._id}/dashboard/my-expenses`);
    } catch (error) {
      
      console.log(error);
      res.redirect('/');
    }
  });
  
router.get('/my-expenses/:expenseId/edit', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const expense = currentUser.expense.id(req.params.expenseId);
      res.render('dashboard/edit.ejs', {
        expense: expense,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });
  
router.put('/my-expenses/:expenseId', async (req, res) => {
    try {
      
      const currentUser = await User.findById(req.session.user._id);
      const expense = currentUser.expense.id(req.params.expenseId);
      
      expense.set(req.body);
      await currentUser.save();
      
      res.redirect(
        `/users/${currentUser._id}/dashboard/my-expenses/${req.params.expenseId}`
      );
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });
  
  
module.exports = router;
