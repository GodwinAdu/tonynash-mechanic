import { Document, Schema, Model, model, models } from "mongoose";

const ExpensesSchema: Schema = new Schema({
    accountId: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    expenseName: {
        type: String,
        required: true
    },
    expenseAmount: {
        type: Number,
        required: true
    },
    expenseDate: {
        type: Date,
        required: true,
        index: true,
    },
    reference: {
        type: String
    },
    payVia: {
        type: String,
        required: true
    },
    attachmentUrl: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    mod_flag: {
        type: Boolean,
        default: false
    },
    delete_flag: {
        type: Boolean,
        default: false
    },
    modifyBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    deletedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    action_type: {
        type: String,
        default: null
    }
}, {
    timestamps: true,
    versionKey: false, // Removing version key.
    minimize: false, // Enabling full document update.
});

// Define the model type
// type ExpenseModel = Model<IExpense>;

// Create or retrieve the Expense model
const Expense = models.Expense || model("Expense", ExpensesSchema);

export default Expense;
