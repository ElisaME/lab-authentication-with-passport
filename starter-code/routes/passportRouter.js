const router = require('express').Router()

// Require user model
const User = require('../models/User');

// Add passport 
const passport = require('passport');

const ensureLogin = require("connect-ensure-login");

router.get('/signup', (req, res, next) => {
  res.render('passport/signup')
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.register({ ...req.body }, req.body.password)
    console.log(user)
    res.redirect('/login')
  } catch (e) {
    console.log(e)
    res.send('El usuario ya existe')
  }
});

router.get('/login',(req,res,next)=>{
  res.render('passport/login')
})

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.redirect('/private-page')
})


router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("passport/private", { user: req.user });
});

module.exports = router;