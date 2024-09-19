"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";
import { BadgeAlert, CheckSquare } from "lucide-react";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "customerName",
        header: "CustomerName",
    },
    {
        accessorKey: "totalAmount",
        header: "Total Amount",
    },
    {
        accessorKey: "createdBy",
        header: "Created By",
        cell: ({ row }) => (
          <div>{row.original.createdBy?.username}</div>
        )
      },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
];
