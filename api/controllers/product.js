const express = require('express');
const Product = require('../models/product');
const mongoose = require('mongoose');
const multer = require('multer');

exports.get_all_product = function(req, res){
    Product.find()
    .select('name price _id productImaage')
    .exec()
    .then(doc => {
        const response = {
            count : doc.length,
            products : doc.map(doc => {
                return {
                    name:doc.name,
                    price:doc.price,
                    _id: doc._id,
                    peoductImage: doc.productImage,
                    meta : {
                        requestMethod : "GET",
                        url : "http://localhost:8000/products/"+doc._id
                    }
                }
            })
        }
        res.status(200).json(response)
    })
    .catch(err => {
            res.status(404).json({
                error : err
            })
    })
};

exports.post_product = function(req, res, next){

    const product  = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price,
        productImage: req.file.path
    });

    product.save().then(result => {
        res.status(200).json({
            message: 'Product Created Successfully !',
            createdProduct : {
                name : result.name,
                price : result.price,
                productImage : result.productImage,
                _id : result._id,
                request : {
                    type : "GET",
                    url : "http://localhost:8000/products/"+ result._id
                }
            }
        })
    })
    .catch(err => {
        console.log(err);
    })
};

exports.get_a_product = function(req, res){
    const id = req.params.productId;
    Product.findById(id)
    .select("name price _id productImage")
    .exec()
    .then( doc => {
        console.log(doc);
        if(doc){
            res.status(200).json({
                product : doc,
                request: {
                    type: "GET",
                    url: 'http://localhost:8000/products/'
                }
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
};

exports.update_product = function(req, res){
    const id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    console.log(updateOps);

    Product.update({_id : id}, { $set: updateOps  })
    .exec()
    .then(doc =>{
        res.status(200).json({
            product : {
               _id : doc._id,
               name: doc.name,
               price: doc.price,
               productImage: doc.productImage,
               request: {
                   method: "GET",
                   url: 'http://localhost:8000/products'+ doc._id
               }
            }
        })
    })
    .catch(err => {
        res.status(200).json({
            err
       })
    })
};

exports.delete_product =  function(req, res){
    const id = req.params.productId;
    Product.remove({_id : id})
    .exec()
    .then( doc => {
        res.status(200).json({
            message: 'Item deleted successfully !',
            doc,
            request: {
                type: "POST",
                url: "http://localhost:8000/products",
                body: { name : 'String', price : 'Number' }
            }
        })
        .catch(err => {
            res.status(500).json({
                err
            })
        })
    })
    
};