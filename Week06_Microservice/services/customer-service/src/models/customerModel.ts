import { Schema, model, Document } from "mongoose";

interface ICustomer extends Document {
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

const customerSchema = new Schema(
  {
    customerId: { type: String },
    firstName: {
      type: String,
      required: [true, "Tên không được để trống"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Họ không được để trống"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email không được để trống"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Số điện thoại không được để trống"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Địa chỉ không được để trống"],
      trim: true,
    }
  },
  { timestamps: true }
);

customerSchema.pre<ICustomer>("save", function (next) {
  if (this.isNew || this.customerId === undefined) {
    this.customerId = this._id + "";
  }
  next();
});

const CustomerModel = model<ICustomer>("Customer", customerSchema);

export { ICustomer, CustomerModel };