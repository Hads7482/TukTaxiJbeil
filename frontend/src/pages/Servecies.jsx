import React from 'react'

function Servecies() {
    return (
        <div className="min-h-screen bg-gray-100 py-20 overflow-x-hidden">
            <div className="container mx-auto text-center">
                <h1 className="text-4xl font-bold mb-8">Our Services</h1>
                <p className="text-lg mb-8">Discover our services. This is a placeholder for service descriptions.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-xl font-semibold mb-4">Service 1</h3>
                        <p>Placeholder description for Service 1.</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-xl font-semibold mb-4">Service 2</h3>
                        <p>Placeholder description for Service 2.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Servecies