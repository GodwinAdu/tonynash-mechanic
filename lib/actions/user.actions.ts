"use server"

import { hash } from "bcryptjs";
import User, { IUser } from "../models/user.models";
import { connectToDB } from '../mongoose';

export async function createUser(values: IUser) {
    try {
        const { email, username, password, address, country, gender, phone } = values
        await connectToDB();
        const [existingUserWithEmail, existingUserWithUsername] = await Promise.all([
            User.findOne({ email }),
            User.findOne({ username }),
        ]);

        if (existingUserWithEmail) throw new Error("User with email already exists");

        if (existingUserWithUsername) throw new Error("Username already exists");

        const hashedPassword = await hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            address,
            country,
            gender,
            phone,
        });

        await newUser.save();

    } catch (error) {
        console.log("something went wrong", error);
        throw error;
    }
}


export async function fetchAllUsers() {
    try {
        await connectToDB();
        const users = await User.find({});
        if (users.length === 0) return []

        return JSON.parse(JSON.stringify(users));

    } catch (error) {
        console.log("something went wrong", error);
        throw error;
    }
}

export async function fetchUser(userId: string) {
    console.log(userId);
    try {
        await connectToDB();

        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");
        return JSON.parse(JSON.stringify(user));

    } catch (error) {
        console.log("Failed to get user from database", error);
        throw error

    }
}