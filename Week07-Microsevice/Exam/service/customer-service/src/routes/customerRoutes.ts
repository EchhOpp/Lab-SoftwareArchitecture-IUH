import express from 'express';
import customerController from '../controllers/customerController';

const router = express.Router();

// Health check endpoint
router.get('/ping', (req, res) => {
    res.json({
        errorCode: 200,
        errorMessage: 'Pong',
        data: null,
    });
});

/* 
    * Customer routes
    * GET /api/customers - Get all customers
    * GET /api/customers/:id - Get a customer by ID
    * POST /api/customers - Create a new customer
    * PUT /api/customers/:id - Update a customer by ID
    * DELETE /api/customers/:id - Delete a customer by ID
*/

// Sử dụng bind để đảm bảo đúng context của this
router.get('/customers',customerController.getAllCustomers.bind(customerController));
router.get('/customers/:id', customerController.getCustomerById.bind(customerController));
router.post('/customers', customerController.createCustomer.bind(customerController));
router.get('/customers/:id/order', customerController.getOrderByCustomerId.bind(customerController));

export default router;