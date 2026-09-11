import React from 'react'

function OurClients() {
    return (
        <div className="min-h-screen bg-gray-100 py-20 overflow-x-hidden">
            <div className="container mx-auto text-center">
                <h1 className="text-4xl font-bold mb-8">Our Clients</h1>
                <p className="text-lg mb-8">Meet our valued clients. This is a placeholder for client testimonials or logos.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-xl font-semibold mb-4">Client 1</h3>
                        <p>Placeholder testimonial from Client 1.</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-xl font-semibold mb-4">Client 2</h3>
                        <p>Placeholder testimonial from Client 2.</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-xl font-semibold mb-4">Client 3</h3>
                        <p>Placeholder testimonial from Client 3.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurClients