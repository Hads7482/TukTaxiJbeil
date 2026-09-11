import React from 'react'

function Team() {
    return (
        <div className="min-h-screen bg-gray-100 py-20 overflow-x-hidden">
            <div className="container mx-auto text-center">
                <h1 className="text-4xl font-bold mb-8">Our Team</h1>
                <p className="text-lg mb-8">Meet our amazing team. This is a placeholder for team member profiles.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded shadow">
                        <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                        <h3 className="text-xl font-semibold mb-2">Team Member 1</h3>
                        <p>Position</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow">
                        <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                        <h3 className="text-xl font-semibold mb-2">Team Member 2</h3>
                        <p>Position</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow">
                        <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                        <h3 className="text-xl font-semibold mb-2">Team Member 3</h3>
                        <p>Position</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Team