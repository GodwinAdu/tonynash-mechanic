import Header from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import CreateInvoiceForm from '../_components/CreateInvoiceForm'
import { getAllAccounts } from '@/lib/actions/account.actions'

const page = async () => {
    const accounts = await getAllAccounts() || []
    return (
        <>
            <div className="">
                <Header title='Create Invoice' />
            </div>
            <Separator />
            <div className="py-4">
                <CreateInvoiceForm accounts={accounts} />
            </div>
        </>
    )
}

export default page
