import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar w-full bg-primary/95 border-b border-light-100/20 sticky top-0 z-50">
      <div className="flex justify-between items-center h-16 px-4 sm:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-white">
            Movie<span className="text-gradient">Finder</span>
          </span>
        </Link>
        <div className="flex space-x-4">
          <Link
            to="/"
            className={`px-3 py-2 rounded transition ${
              isActive('/') ? 'text-gradient ' : 'text-light-200 hover:text-white'
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`px-3 py-2 rounded transition ${
              isActive('/about') ? 'text-gradient ' : 'text-light-200 hover:text-white'
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`px-3 py-2 rounded transition ${
              isActive('/contact') ? 'text-gradient  ' : 'text-light-200 hover:text-white'
            }`}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar