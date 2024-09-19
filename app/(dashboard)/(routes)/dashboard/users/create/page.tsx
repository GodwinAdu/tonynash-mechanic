
import { Separator } from '@/components/ui/separator'
import React from 'react'
import CreateUserForm from '../_components/CreateUserForm'
import { columns } from '../_components/column'
import Header from '@/components/commons/Header'

const page = async() => {
    const data = {}
    return (
        <>
            <Header title='Create New User' />
            <Separator />
            <div className="py-6">
                <CreateUserForm type='create' />
            </div>
            
        </>
    )
}

export default page
