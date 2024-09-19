import  Navbar  from "@/components/Navbar"
import { ReactNode } from "react"


export default function RootLayout({
    children
}: {
    children: ReactNode
}) {
    return (
        <div className="min-h-screen">
            <Navbar />
            {children}
        </div>
    )
}