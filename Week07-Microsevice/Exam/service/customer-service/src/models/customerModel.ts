import e from "express";
import mongoose from "mongoose";

export interface ICustomer {
    id: string;
    name: string;
    email: string;
    phone: string;
}

const customerSchema = new mongoose.Schema<ICustomer>({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
});

export const CustomerModel = mongoose.model<ICustomer>('Customer', customerSchema);
