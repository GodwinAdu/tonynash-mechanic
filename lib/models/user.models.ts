import mongoose, { Schema, Document, models, model } from 'mongoose';

// Interface for User Document
export interface IUser extends Document {
    username: string;
    email: string;
    phone: string;
    gender: string;
    address: string;
    country: string;
    password: string;
    createdBy:Schema.Types.ObjectId;
    modifiedBy: Schema.Types.ObjectId;
    mod_flag: boolean;
    del_flag: boolean;
    action_type: string;
    role: string;
}

// Define the schema
const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email address',
        ],
    },
    phone:{
        type:String,
        required: true,
        unique: true,
    },
    gender:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
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
},{
    timestamps: true,
});

const User =  models.User || model<IUser>('User', UserSchema);

export default User;
