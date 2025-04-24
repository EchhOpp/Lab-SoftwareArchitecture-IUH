import { IOrder, OrderModel } from "../models/orderModel";
import { Request, Response } from "express";

/*
    * OrderService class
    * This class handles the business logic for order-related operations.
    */

export class OrderService {
    // Health check endpoint
    public ping(req: Request, res: Response): void {
        res.json({
            errorCode: 200,
            errorMessage: "Pong",
            data: null,
        });
    }

    /* 
        * Order routes
        * GET /api/orders - Get all orders  
        * GET /api/orders/:id - Get an order by ID
        * POST /api/orders - Create a new order
    */

    public async getAllOrders(): Promise<IOrder[]> {
        try {
            const orders: IOrder[] = await OrderModel.find().exec();
            return orders;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Error fetching orders: " + error.message);
            }
            throw new Error("Unknown error occurred while fetching orders");
        }
    }

    public async getOrderById(id: string): Promise<IOrder | null> {
        try {
            const order: IOrder | null = await OrderModel.findById(id).exec();
            return order;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Error fetching order by ID: " + error.message);
            }
            throw new Error("Unknown error occurred while fetching order by ID");
        }
    }

    public async createOrder(orderData: IOrder): Promise<IOrder> {
        try {
            const newOrder = new OrderModel(orderData);
            await newOrder.save();
            return newOrder;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Error creating order: " + error.message);
            }
            throw new Error("Unknown error occurred while creating order");
        }
    }
    

    // getOrderByCustomerId
    public async getOrderByCustomerId(customerId: string): Promise<IOrder[]> {
        try {
            const orders: IOrder[] = await OrderModel.find({ customerId }).exec();
            return orders;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Error fetching orders by customer ID: " + error.message);
            }
            throw new Error("Unknown error occurred while fetching orders by customer ID");
        }
    }
}

export default OrderService;