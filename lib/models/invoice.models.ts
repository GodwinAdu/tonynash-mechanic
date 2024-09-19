import { model, models, Schema } from 'mongoose';

const invoiceSchema = new Schema({
  customerName: { type: String, required: true },
  customerAddress: {
    type: String,
    required: true,
  },
  customerEmail: { type: String },
  customerPhone: { type: String },
  items: [
    {
      description: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  tax: {
    type: Number,
    default: 0,
    validate: {
      validator: (value: number) => value >= 0 && value <= 100,
      message: 'Tax must be between 0 and 100',
    },
  },
  discount: {
    type: Number,
    default: 0,
    validate: {
      validator: (value: number) => value >= 0 && value <= 100,
      message: 'Discount must be between 0 and 100',
    },
  },
  totalAmount: { type: Number, required: true },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  modifiedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  mod_flag: {
    type: Boolean,
    default: false,
  },
  del_flag: {
    type: Boolean,
    default: false,
  },
  action_type: {
    type: String,
  }
}, {
  timestamps: true,
});

const Invoice = models.Invoice || model<InvoiceDocument>('Invoice', invoiceSchema);

export default Invoice;
