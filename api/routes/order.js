const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Order = require('../models/order')
const OrderController = require('../controllers/order')

router.get('/', OrderController.get_all_orders)
router.get('/:orderId', OrderController.get_a_order)
router.post('/', OrderController.make_order)
router.patch('/:orderId', OrderController.change_order)
router.delete('/:orderId', OrderController.remove_order)

module.exports = router;