import { Schema, model, Document } from "mongoose";

interface ICustomer extends Document {
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: String;
  createdAt: Date;
  updatedAt: Date;
}

// chuyen thanh tieng viet
const customerSchema = new Schema(
  {
    customerId: { type: String },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    address:  {
        type: String,
        required: [true, "Address is required"],
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
