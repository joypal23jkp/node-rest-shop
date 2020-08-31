
const mongoose = require('mongoose');
const Order = require('../models/order')

exports.get_all_orders = (req, res) => {
    Order.find()
    .select('_id quantity product')
    .exec()
    .then(result => {
        res.status(200).json({
            count: result.length,
            orders: result.map(doc => {
                return {
                    _id :doc._id,
                    product:doc.productId,
                    quantity:doc.quantity
                }
            })

        })
    })
    .catch(err => {
        res.status(500).json(err)
    });
};

exports.get_a_order = (req, res) => {
    var id = req.params.orderId;
    Order.findById(id)
    .populate('product', 'name')
    .exec()
    .then(doc => {
       res.status(200).json(doc) 
    })
    .catch(err => {
        res.status(500).json(doc)
    })
    
}

exports.make_order = (req, res) => {
    const order = new Order ({
        _id :  mongoose.Types.ObjectId(),
        quantity : req.body.quantity,
        product: req.body.productId
    });

    order.save()
    .then(result => {
        res.status(200).json({
            message: 'Order Created Successfully !',
            result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            err
        })
    })
};

exports.change_order = (req, res) => {
    var id = req.params.orderId;
    res.status(200).json({
        message: `Update ${id} no order!`
    })
};

exports.remove_order =  (req, res) => {
    var id = req.params.orderId;
    Order.remove({_id : id})
    .exec()
    .then(res => {
        res.status(200).json({
            res,
            request : {
                Method : "GET",
                url: 'http://localhost:8000/orders'
            }
        }) 
    })
    .catch(err => {
        res.status(500).json({
           err,
            request : {
                Method : "GET",
                url: 'http://localhost:8000/orders'
            }
        })
    })
 
};