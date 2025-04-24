import axios from 'axios';
import { ICustomer, CustomerModel } from '../models/customerModel';
import { Request, Response } from 'express';
import { connectToOrderService } from './connectService';

/*
    * CustomerService class
    * This class handles the business logic for customer-related operations.
    */

export class CustomerService {
    // Health check endpoint
    public ping(req: Request, res: Response): void {
        res.json({
            errorCode: 200,
            errorMessage: 'Pong',
            data: null,
        });
    }

    /* 
        * Customer routes
        * GET /api/customers - Get all customers
        * GET /api/customers/:id - Get a customer by ID
        * POST /api/customers - Create a new customer
    */

    public async getAllCustomers(): Promise<ICustomer[]> {
        try {
            const customers: ICustomer[] = await CustomerModel.find().exec();
            return customers;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error('Error fetching customers: ' + error.message);
            }
            throw new Error('Unknown error occurred while fetching customers');
        }
    }

    public async getCustomerById(id: string): Promise<ICustomer | null> {
        try {
            const customer: ICustomer | null = await CustomerModel.findById(id).exec();
            return customer;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error('Error fetching customer by ID: ' + error.message);
            }
            throw new Error('Unknown error occurred while fetching customer by ID');
        }
    }

    public async createCustomer(customerData: ICustomer): Promise<ICustomer> {
        try {
            const newCustomer = new CustomerModel(customerData);
            await newCustomer.save();
            return newCustomer;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error('Error creating customer: ' + error.message);
            }
            throw new Error('Unknown error occurred while creating customer');
        }
    }

    public async getOrderByCustomerId(customerId: string): Promise<any> {
        try {
            const endpoint = `customer/${customerId}`;
            const response = await connectToOrderService(endpoint, 'GET');
            return response;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error('Error fetching order by customer ID: ' + error.message);
            }
            throw new Error('Unknown error occurred while fetching order by customer ID');
        }
    }
}

export default CustomerService;