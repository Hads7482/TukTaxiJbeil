import React from 'react'

function About() {
    return (
        <div className="min-h-screen bg-gray-100 py-20 overflow-x-hidden">
            <div className="container mx-auto text-center">
                <h1 className="text-4xl font-bold mb-8">About Us</h1>
                <p className="text-lg mb-8">This is a placeholder for the about page content. Learn more about our company here.</p>
                <div className="bg-white p-8 rounded shadow">
                    <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
                    <p>Placeholder text for our story. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
            </div>
        </div>
    )
}

export default About