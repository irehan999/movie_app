import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Footer() {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-2xl">🎬</span>
            <span className="text-xl font-bold text-white">
              Movie<span className="text-gradient">Finder</span>
            </span>
          </div>
          <div className="flex space-x-6">
            <Link
              to="/"
              className={`text-sm ${
                isActive('/') ? 'text-gradient' : 'text-gray-400 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-sm ${
                isActive('/about') ? 'text-gradient' : 'text-gray-400 hover:text-white'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`text-sm ${
                isActive('/contact') ? 'text-gradient' : 'text-gray-400 hover:text-white'
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 MovieFinder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer