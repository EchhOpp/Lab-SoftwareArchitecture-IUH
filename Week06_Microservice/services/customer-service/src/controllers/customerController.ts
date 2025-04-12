import { Request, Response } from "express";
import { CustomerModel, ICustomer } from "../models/customerModel";

// Lấy tất cả khách hàng
export const getAllCustomers = async (req: Request, res: Response): Promise<void> => {
  try {
    const customers = await CustomerModel.find();
    res.json({
      errorCode: 200,
      errorMessage: "Thành công",
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      errorCode: 500,
      errorMessage: "Lỗi server",
      data: null,
    });
  }
};

// Lấy thông tin khách hàng theo ID
export const getCustomerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const customer = await CustomerModel.findOne({ customerId: req.params.id });
    if (!customer) {
      res.status(404).json({
        errorCode: 404,
        errorMessage: "Không tìm thấy khách hàng",
        data: null,
      });
      return;
    }
    
    res.json({
      errorCode: 200,
      errorMessage: "Thành công",
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      errorCode: 500,
      errorMessage: "Lỗi server",
      data: null,
    });
  }
};

// Tạo khách hàng mới
export const createCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const newCustomer = new CustomerModel(req.body);
    const savedCustomer = await newCustomer.save();
    
    res.status(201).json({
      errorCode: 201,
      errorMessage: "Tạo khách hàng thành công",
      data: savedCustomer,
    });
  } catch (error: any) {
    // Xử lý lỗi validation
    if (error.name === "ValidationError") {
      res.status(400).json({
        errorCode: 400,
        errorMessage: error.message,
        data: null,
      });
      return;
    }
    
    res.status(500).json({
      errorCode: 500,
      errorMessage: "Lỗi server",
      data: null,
    });
  }
};

// Cập nhật thông tin khách hàng
export const updateCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedCustomer = await CustomerModel.findOneAndUpdate(
      { customerId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedCustomer) {
      res.status(404).json({
        errorCode: 404,
        errorMessage: "Không tìm thấy khách hàng",
        data: null,
      });
      return;
    }
    
    res.json({
      errorCode: 200,
      errorMessage: "Cập nhật khách hàng thành công",
      data: updatedCustomer,
    });
  } catch (error) {
    res.status(500).json({
      errorCode: 500,
      errorMessage: "Lỗi server",
      data: null,
    });
  }
};

// Xóa khách hàng
export const deleteCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const customer = await CustomerModel.findOneAndDelete({ customerId: req.params.id });
    
    if (!customer) {
      res.status(404).json({
        errorCode: 404,
        errorMessage: "Không tìm thấy khách hàng",
        data: null,
      });
      return;
    }
    
    res.json({
      errorCode: 200,
      errorMessage: "Xóa khách hàng thành công",
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      errorCode: 500,
      errorMessage: "Lỗi server",
      data: null,
    });
  }
};