import mongoose from "mongoose";

export interface IOrder {
    id: string;
    customerId: string;
    productId: string;
    quantity: number;
}

const orderSchema = new mongoose.Schema<IOrder>({
    id: { type: String, required: true, unique: true },
    customerId: { type: String, required: true },
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
});

export const OrderModel = mongoose.model<IOrder>('Order', orderSchema);
