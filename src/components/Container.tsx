import React, { ReactNode } from 'react'
import Sidebar from './Sidebar'
import Topbar from './TopBar'

type ContainerProps = {
    children: ReactNode
}

const Container = ({children}: ContainerProps) => {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
        <Sidebar />
        <div className="flex-1 flex flex-col relative md:ml-64">
            <Topbar />
            <main className="md:flex-1 w-full md:p-6 md:pt-[80px] pt-[50px]">{children}</main>
        </div>
    </div>
  )
}

export default Container