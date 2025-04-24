import express from 'express';
import orderController from '../controllers/orderController';

const router = express.Router();

router.get('/ping', orderController.ping.bind(orderController));

/*
    * Order routes
    * GET /api/orders - Get all orders  
    * GET /api/orders/:id - Get an order by ID
    * POST /api/orders - Create a new order
*/

router.get('/orders', orderController.getAllOrders.bind(orderController));
router.get('/orders/:id', orderController.getOrderById.bind(orderController));
router.post('/orders', orderController.createOrder.bind(orderController));
router.get('/orders/customer/:id', orderController.getOrderByCustomerId.bind(orderController));

export default router;