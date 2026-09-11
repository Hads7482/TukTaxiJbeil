import React from 'react'
import { Link } from 'react-router-dom'

function Navi() {
    return (
        <nav className="bg-blue-600 text-white p-4">
            <div className="container mx-auto">
                <ul className="flex space-x-6">
                    <li><Link to="/" className="hover:underline">Home</Link></li>
                    <li><Link to="/about" className="hover:underline">About</Link></li>
                    <li><Link to="/contact" className="hover:underline">Contact</Link></li>
                    <li><Link to="/our-clients" className="hover:underline">Our Clients</Link></li>
                    <li><Link to="/services" className="hover:underline">Services</Link></li>
                    <li><Link to="/team" className="hover:underline">Team</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navi