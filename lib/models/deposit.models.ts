import { Document, model, models, Schema, Types } from "mongoose";

const DepositSchema = new Schema({
    accountId: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
        index: true,
    },
    depositName: {
        type: String,
        required: true,
        trim: true,
    },
    depositAmount: {
        type: Number,
        required: true,
        min: 0,
        index: true,
    },
    depositDate: {
        type: Date,
        required: true,
        index: true,
    },
    reference: {
        type: String,
        trim: true,
        index: true,
    },
    payVia: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    attachmentUrl: {
        type: String,
        trim: true,
        index: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        default: null,
    },
    mod_flag: {
        type: Boolean,
        default: false,
    },
    delete_flag: {
        type: Boolean,
        default: false,
    },
    modifyBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        default: null,
    },
    deletedBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        default: null,
    },
    action_type: {
        type: String,
        default: null,
    }
}, {
    timestamps: true,
    versionKey: false, // Remove the version key (__v)
    minimize: false, // Allow full document updates
});

// Create or retrieve the model
const Deposit = models.Deposit || model("Deposit", DepositSchema);

export default Deposit;
