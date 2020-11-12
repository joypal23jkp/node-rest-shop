const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.get_user =  async (req, res) => {
    // User.find({}, (err, result) => {
    //     err && res.json(err)
    //     res.json(result)
    // })

    try {
        res.json(await User.find().exec())
    } catch(e) {
        res.send(e.message)
    }
};

exports.signUp =  (req, res) => {
    User.find({ email : req.body.email })
    .exec()
    .then( user => {
        if(user.length >= 1){
            return res.status(409).json({
                message : 'Mail exists!'
            })
        }else{
            // req.body.email
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    return res.status(500).json({
                        error: err
                    });
                }else{
                    req.body.password = hash
                    const user = new User(req.body)
                    user.save()
                    .then(result => {
                        console.log(result)
                        return res.status(201).json({
                            message: 'User Created!'
                        })
                    })
                    .catch(err => {
                        res.status(500).json(err)
                    })
                }
        }) // bycrypt end
        
        }
    })

};

exports.signIn = (req, res) => {
    User.find({ email: req.body.email })
    .exec()
    .then( user => {
       
        if(user.length < 1){
             res.status(401).json({
                message : 'Auth Failed!'
            })
        } 
        bcrypt.compare(req.body.password, user[0].password, function(err, result) {
        
            if(err){
                 res.status(401).json({
                    message: "Failed!",
                })
            }
            if(result){
               const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                },
                'secret', { expiresIn : "1H" });

                 res.status(200).json({
                    message: 'Auth Successful!',
                    token : token
                })
            }
            res.status(401).json({
                message: 'Auth Failed !'
            })
        });
       
    })
    .catch(err => {
            res.status(401).json({
                message: 'Auth Failed!'
            })
    })

};

exports.remove_user =  (req, res, next) => {
    var id = req.params.userId;
    User.remove({_id : id})
    .exec()
    .then(res => {
        res.status(200).json({
            message: 'user Removed!'
        }) 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
           Error: err
        })
    })
 
};