import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/navbar.jsx'
import Footer from './components/footer.jsx'

function Layout() {
  return (
   <div className="min-h-screen flex flex-col bg-primary overflow-x-hidden">
      <header>
        <Navbar />
      </header>
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout