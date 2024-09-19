"use server"

import { cookies } from "next/headers";
import { connectToDB } from "../mongoose";
import User from "../models/user.models";
import { compare } from "bcryptjs";
import jwt from 'jsonwebtoken';


interface LoginProps {
    email: string;
    password: string;
}

export async function loginUser({ email, password }: LoginProps) {
    try {
        await connectToDB();
        const cookieStore = cookies();
        const user = await User.findOne({ email });

        if (!user) {
            console.log("User doesn't exist");
            return null;
        }

        // Use the comparePassword method defined in the schema
        const isPasswordValid = await compare(password,user.password);

        if (!isPasswordValid) {
            console.log("Password is invalid");
            throw new Error("Password is invalid");
        }

        console.log("Student is logged in");

        const tokenData = {
            id: user._id,
            username: user.username,
            phone: user.phone,
            gender: user.gender,
            address: user.address,
            country: user.country,
            email: user.email,
            role: user.role,
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });

        cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // 1 day
        });

        return JSON.parse(JSON.stringify(user));
    } catch (error: any) {
        console.log("Unable to login student", error);
        throw error;
    }
}
