const User = require('../models/user')
const fs = require("fs");
const path = require("path");
const crypto = require('crypto')
const bcrypt = require('bcryptjs')

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login'
    })
}

exports.getSignUp = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup'
  })
}

exports.postSignup = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  const confirmPassword = req.body.confirmPassword

  User.findOne({email:email})
    .then(userDoc => {
      if(userDoc) {
        return res.redirect('/auth/signup')
      }
      const user = new User({
        email: email,
        password: password
      })
      return user.save()
    })
    .then(result => {
      res.redirect('/auth/login')
    })
    .catch(err => {
      console.log(err)
    })
}

exports.postLogin = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

}
