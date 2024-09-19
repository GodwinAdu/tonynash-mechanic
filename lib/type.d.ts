interface InvoiceDocument extends Document {
    customerName: string;
    date: Date;
    items: {
      description: string;
      quantity: number;
      price: number;
    }[];
    totalAmount: number;
  }