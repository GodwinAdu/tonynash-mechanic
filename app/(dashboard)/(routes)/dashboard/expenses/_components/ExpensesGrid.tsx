"use client"

import { toast } from '@/hooks/use-toast';
import { getAllDeposits } from '@/lib/actions/deposit.actions';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { CellAction } from './cell-action';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { getAllExpenses } from '@/lib/actions/expenses.actions';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import MonthSelection from '@/components/commons/MonthSelection';
import AccountSelection from '@/components/commons/AccountSelection';

const ExpensesGrid = ({ accounts }: { accounts: any[] }) => {
    const [selectedMonth, setSelectedMonth] = useState<Date>();
    const [selectedAccount, setSelectedAccount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState<{ field: string, width?: number, editable?: boolean }[]>([]);

    console.log(selectedAccount, "account selected");

    useEffect(() => {
        const fetchData = async () => {
            const monthDate = new Date()
            console.log(monthDate, "monthDate")

            try {
                setIsLoading(true);
                const data = await getAllExpenses({
                    month: new Date(monthDate),
                    accountId: accounts[0]._id,
                });
                const formattedData = data.map(expenses => ({
                    ...expenses,
                    expenseDate: moment(expenses.expenseDate).format("MMMM Do YYYY HH:mm"), // Adjust format as needed
                }));
                setRowData(formattedData);
            } catch (error) {

                toast({
                    title: "Something went wrong",
                    description: "Please try again later",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };

        const newColumnDefs = [
            { field: "expenseName", checkboxSelection: true },
            { field: "expenseDate", width: 320 },
            { field: "expenseAmount" },
            { field: "payVia" },
            {
                field: "actions",
                headerName: "Actions",
                cellRenderer: CellAction,
            },
        ];
        setColDefs(newColumnDefs);
        fetchData();
    }, []);

    const onSearchHandler = async () => {
        if (!selectedMonth || !selectedAccount) return
        try {
            setIsLoading(true);
            const data = await getAllExpenses({
                month: selectedMonth as Date,
                accountId: selectedAccount,
            });
            const formattedData = data.map(expenses => ({
                ...expenses,
                expenseDate: moment(expenses.expenseDate).format("MMMM Do YYYY HH:mm"), // Adjust format as needed
            }));
            setRowData(formattedData);
            setIsLoading(false);
        } catch (error) {

            toast({
                title: "Something went wrong",
                description: "Please try again later",
                variant: "destructive",
            });
        }

        console.log(rowData, "depositList");
    };

    const pagination = true;
    const paginationPageSize = 200;
    const paginationPageSizeSelector = [200, 500, 1000];

    return (
        <>
            <div className="border py-1 px-4 flex gap-5 items-center my-1">
                <div className="flex gap-3 items-center">
                    <label className="font-bold text-sm hidden lg:block">Select Month</label>
                    <MonthSelection selectedMonth={(value) => setSelectedMonth(value)} />
                </div>
                <div className="flex gap-3 items-center">
                    <label className="font-bold text-sm hidden lg:block">Select Account</label>
                    <AccountSelection selectedAccount={(value) => setSelectedAccount(value)} accounts={accounts} />
                </div>
                <Button disabled={isLoading} className="flex" size="sm" onClick={onSearchHandler}>
                    {isLoading ? (<Loader2 className="w-4 h-4 ml-2 animate-spin" />) : "Search"}
                </Button>
            </div>
            <div className="ag-theme-quartz" style={{ height: 500 }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                />
            </div>

        </>
    )
}

export default ExpensesGrid
