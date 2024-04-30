const express = require('express');
const { OrderCreateController, GetAllOrderController,OrderStatusUpdateController } = require('../../controller/order/OrderController');
const { PaymentController, GetApiKEY } = require('../../controller/payment/PaymentController');
const isUserController = require('../../middleware/UserMiddleware');
const isAdminController = require('../../middleware/AdminMiddleware');

const route = express.Router()

route.post('/payment/create',PaymentController,isUserController);
route.get('/payment/api_key',GetApiKEY,isUserController);
route.post('/create',OrderCreateController,isUserController);
route.get('/get/all/orders',isUserController,isAdminController('admin'),GetAllOrderController);
route.put('/status/update/:id',isUserController,isAdminController('admin'),OrderStatusUpdateController)

module.exports = route