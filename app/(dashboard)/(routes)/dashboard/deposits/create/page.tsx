import Heading from '@/components/commons/Header'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import DepositForm from '../_components/DepositForm'
import { getAllAccounts } from '@/lib/actions/account.actions'

const page = async () => {
    const accounts = await getAllAccounts();
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Create Deposit"
                    description="Tips, and information's for the usage of the application."
                />
                
            </div>
            <Separator />
            <div className="py-4">
                <DepositForm accounts={accounts} type="create" />
            </div>

        </>
    )
}

export default page
