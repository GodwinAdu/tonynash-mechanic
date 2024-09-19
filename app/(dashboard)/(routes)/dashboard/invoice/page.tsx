import Header from "@/components/commons/Header"
import { DataTable } from "@/components/dashboard/table/DataTable"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { columns } from "./_components/column"

const page = () => {
  return (
    <>
    <div className="flex justify-between items-center">
        <Header title="Manage Invoice" />
        <div className="flex gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={`/dashboard/invoice/create`} className={cn(buttonVariants({ size: "sm" }), "h-7 gap-1")}>
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    New Invoice
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create User</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
    </div>
    <Separator />
      <div className="py-4">
        <DataTable searchKey="customerName" data={[]} columns={columns} />
      </div>
    </>
  )
}

export default page
