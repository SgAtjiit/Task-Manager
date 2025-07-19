import React from 'react'

const NavBar = () => {
  return (
    <div>
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">
                   <a href="/">
                   
                   Taskify
                   </a> 
                </div>
                <div className="space-x-4">
                    <a href="/" className="text-gray-300 hover:text-white">Home</a>
                    <a href="/tasks" className="text-gray-300 hover:text-white">Tasks</a>
                    <a href="/analyzer" className="text-gray-300 hover:text-white">Analyzer</a>
                </div>
                </div>
        </nav>
    </div>
  )
}

export default NavBar