import express from "express";
import * as customerController from "../controllers/customerController";

const router = express.Router();

// Định nghĩa các routes cho khách hàng
router.get("/customers", customerController.getAllCustomers);
router.get("/customers/:id", customerController.getCustomerById);
router.post("/customers", customerController.createCustomer);
router.put("/customers/:id", customerController.updateCustomer);
router.delete("/customers/:id", customerController.deleteCustomer);

export default router;