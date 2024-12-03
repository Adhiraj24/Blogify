const express = require('express');
const router = express.Router();
const { handleSignup, handleSignin } = require('../controllers/UserhandleSignup');  // Ensure this is the correct path

// GET routes for signup and signin
router.get('/signin', (req, res) => {
    return res.render('signin');
});

router.get('/signup', (req, res) => {
    return res.render('signup');
});

router.get('/logout', (req,res) =>{
    res.clearCookie('token').redirect('/')
})

// POST routes for signup and signin
router.post('/signin', handleSignin);
router.post('/signup', handleSignup);

module.exports = router;
