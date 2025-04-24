import { Request, Response } from 'express';
import { ICustomer } from '../models/customerModel';
import { CustomerService } from '../services/customerService';

export class CustomerController {
  private customerService: CustomerService = new CustomerService();

  // Health check endpoint
  public ping(req: Request, res: Response): void {
    res.json({
      errorCode: 200,
      errorMessage: 'Pong',
      data: null,
    });
  }

  public async getAllCustomers(req: Request, res: Response): Promise<void> {
    try {
      const customers: ICustomer[] = await this.customerService.getAllCustomers();
      res.status(200).json({
        errorCode: 200,
        errorMessage: 'Success',
        data: customers,
      });
    } catch (error) {
      console.error('getAllCustomers error:', error);
      res.status(500).json({
        errorCode: 500,
        errorMessage: 'Internal Server Error',
        data: null,
      });
    }
  }

  public async getCustomerById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
      const customer: ICustomer | null = await this.customerService.getCustomerById(id);
      if (customer) {
        res.status(200).json({
          errorCode: 200,
          errorMessage: 'Success',
          data: customer,
        });
      } else {
        res.status(404).json({
          errorCode: 404,
          errorMessage: 'Customer not found',
          data: null,
        });
      }
    } catch (error) {
      console.error('getCustomerById error:', error);
      res.status(500).json({
        errorCode: 500,
        errorMessage: 'Internal Server Error',
        data: null,
      });
    }
  }

  public async createCustomer(req: Request, res: Response): Promise<void> {
    const newCustomer: ICustomer = req.body;
    try {
      const createdCustomer: ICustomer = await this.customerService.createCustomer(newCustomer);
      res.status(201).json({
        errorCode: 201,
        errorMessage: 'Customer created successfully',
        data: createdCustomer,
      });
    } catch (error) {
      console.error('createCustomer error:', error);
      res.status(500).json({
        errorCode: 500,
        errorMessage: 'Internal Server Error',
        data: null,
      });
    }
  }

  public async getOrderByCustomerId(req: Request, res: Response): Promise<void> {
    const customerId = req.params.id;
    try {
      const orders = await this.customerService.getOrderByCustomerId(customerId);
      res.status(200).json({
        errorCode: 200,
        errorMessage: 'Success',
        data: orders,
      });
    } catch (error) {
      console.error('getOrderByCustomerId error:', error);
      res.status(500).json({
        errorCode: 500,
        errorMessage: 'Internal Server Error',
        data: null,
      });
    }
  }
}

const customerController = new CustomerController();

export default customerController;