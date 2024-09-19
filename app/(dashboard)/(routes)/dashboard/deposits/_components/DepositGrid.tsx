"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { getAllDeposits } from "@/lib/actions/deposit.actions";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { CellAction } from "./cell-action";
import moment from "moment";
import MonthSelection from "@/components/commons/MonthSelection";
import AccountSelection from "@/components/commons/AccountSelection";

const DepositGrid = ({ accounts }) => {
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
                const data = await getAllDeposits({
                    month: new Date(monthDate),
                    accountId: accounts[0]._id,
                });
                const formattedData = data.map(deposit => ({
                    ...deposit,
                    depositDate: moment(deposit.depositDate).format("MMMM Do YYYY HH:mm"), // Adjust format as needed
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
            { field: "depositName", checkboxSelection: true },
            { field: "depositDate",width:320 },
            { field: "depositAmount" },
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
            const data = await getAllDeposits({
                month: selectedMonth as Date,
                accountId: selectedAccount,
            });
            const formattedData = data.map(deposit => ({
                ...deposit,
                depositDate: moment(deposit.depositDate).format("MMMM Do YYYY HH:mm"), // Adjust format as needed
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
                    <MonthSelection selectedMonth={setSelectedMonth} />
                </div>
                <div className="flex gap-3 items-center">
                    <label className="font-bold text-sm hidden lg:block">Select Account</label>
                    <AccountSelection selectedAccount={setSelectedAccount} accounts={accounts} />
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
    );
};

export default DepositGrid;
