import { Request, Response } from "express";
import { IOrder } from "../models/orderModel";
import { OrderService } from "../services/orderService";

export class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  // Health check endpoint
  public ping(req: Request, res: Response): void {
    res.json({
      errorCode: 200,
      errorMessage: "Pong",
      data: null,
    });
  }

  public async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      const orders: IOrder[] = await this.orderService.getAllOrders();
      res.status(200).json({
        errorCode: 200,
        errorMessage: "Success",
        data: orders,
      });
    } catch (error) {
      console.error('getAllOrders error:', error);
      res.status(500).json({
        errorCode: 500,
        errorMessage: "Internal Server Error",
        data: null,
      });
    }
  }

  public async getOrderById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
      const order: IOrder | null = await this.orderService.getOrderById(id);
      if (order) {
        res.status(200).json({
          errorCode: 200,
          errorMessage: "Success",
          data: order,
        });
      } else {
        res.status(404).json({
          errorCode: 404,
          errorMessage: "Order not found",
          data: null,
        });
      }
    } catch (error) {
      console.error('getOrderById error:', error);
      res.status(500).json({
        errorCode: 500,
        errorMessage: "Internal Server Error",
        data: null,
      });
    }
  }

  public async createOrder(req: Request, res: Response): Promise<void> {
    const orderData: IOrder = req.body;
    try {
      const newOrder: IOrder = await this.orderService.createOrder(orderData);
      res.status(201).json({
        errorCode: 201,
        errorMessage: "Order created successfully",
        data: newOrder,
      });
    } catch (error) {
      console.error('createOrder error:', error);
      res.status(500).json({
        errorCode: 500,
        errorMessage: "Internal Server Error",
        data: null,
      });
    }
  }

  //getOrderByCustomerId
  public async getOrderByCustomerId(req: Request, res: Response): Promise<void> {
    const customerId = req.params.id;
    try {
      const orders: IOrder[] = await this.orderService.getOrderByCustomerId(customerId);
      res.status(200).json({
        errorCode: 200,
        errorMessage: "Success",
        data: orders,
      });
    } catch (error) {
      console.error('getOrderByCustomerId error:', error);
      res.status(500).json({
        errorCode: 500,
        errorMessage: "Internal Server Error",
        data: null,
      });
    }
  }
}

const orderController = new OrderController();
export default orderController;