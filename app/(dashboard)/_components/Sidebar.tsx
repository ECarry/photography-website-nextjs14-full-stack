import React from 'react'
import Logo from './Logo'

import SidebarRoutes from './SidebarRoutes'
import UserAvatar from './UserAvatar'
import { ThemeToggle } from '@/components/mode-toggle'


const Sidebar = () => {
  return (
    <div className='h-full w-full bg-[#f5f5f5] dark:bg-black rounded-2xl flex items-center px-6 justify-between'>
      <Logo />

      <div>
        <SidebarRoutes />
      </div>

      <div className='flex items-center'>
        <ThemeToggle />
        <UserAvatar />
      </div>
      
    </div>
  )
}

export default Sidebar
