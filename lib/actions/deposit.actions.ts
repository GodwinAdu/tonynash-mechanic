"use server"

import { revalidatePath } from "next/cache";
import Account from "../models/account.models";
import Deposit from "../models/deposit.models";
import { connectToDB } from "../mongoose";
import { currentProfile } from "../helpers/current-user";
interface AccountProps {
    accountId: string;
    depositName: string;
    reference?: string;
    depositDate: Date,
    depositAmount: Number;
    payVia: string;

}
export async function createDeposit(values: AccountProps, path: string) {
    try {
        const { accountId, depositAmount, depositDate, depositName, payVia, reference } = values;
        // Implement deposit logic here
        const user = await currentProfile();

        await connectToDB()

        const account = await Account.findById(accountId);

        if (!account) throw new Error(`Account not found`);

        const deposit = new Deposit({
            accountId,
            depositAmount,
            depositDate,
            depositName,
            reference,
            payVia,
            createdBy: user?._id,
            action_type:"create",
        });

        await deposit.save();

        account.deposits.push(deposit._id);
        account.balance += depositAmount;
        await account.save();

        revalidatePath(path);
    } catch (error) {
        console.error("Error creating deposit", error);
        throw error;
    }
}

export async function getAllDeposits({ accountId, month }: { accountId: string, month: Date }) {
    try {
        // Fetch current profile
        const user = await currentProfile();
        if (!user) {
            throw new Error('User not found');
        }

        // Connect to the database
        await connectToDB();

        // Define the year and month for the query
        const year = month?.getFullYear();
        const queryMonth = month?.getMonth() + 1; // getMonth() returns 0-11, so add 1

        console.log('Year:', year);
        console.log('Month:', queryMonth);

        // Fetch deposits for the given accountId, year, month, and schoolId
        const deposits = await Deposit.find({
            accountId,
            $expr: {
                $and: [
                    { $eq: [{ $year: '$depositDate' }, year] },
                    { $eq: [{ $month: '$depositDate' }, queryMonth] }
                ]
            }
        });

        console.log('Deposits found:', deposits);

        if (deposits.length === 0) {
            return [];
        }

        return JSON.parse(JSON.stringify(deposits));
    } catch (error) {
        console.error('Error getting all deposits', error);
        throw error;
    }
}


export async function deleteDeposit(id: string){
    try {
        await connectToDB();
        const deposit = await Deposit.findByIdAndDelete(id);
        if (!deposit) {
            throw new Error('Deposit not found');
        }
        const account = await Account.findById(deposit.accountId);
        if (!account) {
            throw new Error('Account not found');
        }
        account.deposits = account.deposits.filter((d:any) => d.toString()!== id);
        // account.balance -= deposit.depositAmount;
        await account.save();
        console.log('Deposit deleted successfully');
        return JSON.parse(JSON.stringify(deposit));  // return deleted deposit in JSON format  // return JSON.parse(JSON.stringify(deposit));  // return deleted deposit in JSON format   // return JSON.parse(JSON.stringify(deposit));  // return deleted deposit in JSON format   // return JSON.parse(JSON.stringify(deposit));  // return deleted deposit in JSON format   // return
        
    } catch (error) {
       console.error('Error deleting Deposit from database', error);
       throw error;
    }
}