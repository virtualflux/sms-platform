'use client'

import React, { ReactNode, useEffect } from 'react'
import Sidebar from './Sidebar'
import Topbar from './TopBar'
import { withAuth } from '@/hoc/withAuth'
import { useAppSelector } from '@/store/hooks'
import { useNotifications } from '@/hooks/NotificationProvider'

type ContainerProps = {
    children: ReactNode
}

const Container = ({children}: ContainerProps) => {
  const { notifications, fetchNotifications } = useNotifications();

  return (
    <div className="flex min-h-screen bg-background text-foreground">
        <Sidebar />
        <div className="flex-1 flex flex-col relative md:ml-64">
            <Topbar notifications={notifications} fetchNotifications={fetchNotifications}/>
            <main className="md:flex-1 w-full md:p-6 md:pt-[80px] pt-[50px]">{children}</main>
        </div>
    </div>
  )
}

export default withAuth(Container)