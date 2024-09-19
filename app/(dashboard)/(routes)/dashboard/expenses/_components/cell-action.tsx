"use client";

import { useEffect, useState } from "react";
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { DeleteDialog } from "@/components/commons/DeleteDialog";
import { deleteExpenses } from "@/lib/actions/expenses.actions";


interface CellActionProps {
  data: any;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const router = useRouter();

  const params = useParams();

  const id = params.adminId as string;




  const handleDeleteExpenses = async (id: string) => {
    try {
      setLoading(true);

      await deleteExpenses(id);
      
      toast({
        title: "Deleted Successfully",
        description: "Please Expenses was deleted successfully...",

      });
      router.refresh();

    } catch (error) {
  
      toast({
        title: "Something Went Wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };



  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
       
            <DropdownMenuItem onClick={(e) => { e.preventDefault(); setDeleteDialogOpen(true) }}>
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
    
        </DropdownMenuContent>
      </DropdownMenu>
      {isDeleteDialogOpen && (
        <DeleteDialog
          id={data?._id}
          isDeleteDialogOpen={isDeleteDialogOpen}
          title="Are you sure you want to delete this Expenses?"
          description="This action cannot be undone. Are you sure you want to proceed?"
          onCancel={() => setDeleteDialogOpen(false)}
          onContinue={handleDeleteExpenses}
        />
      )}
    </>
  );
};
