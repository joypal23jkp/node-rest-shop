const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const UserController = require('../controllers/user')

router.get('/', UserController.get_user)

router.post('/signup', UserController.signUp)

router.post('/login', UserController.signIn)

router.delete('/:userId',UserController.remove_user)

module.exports = router;