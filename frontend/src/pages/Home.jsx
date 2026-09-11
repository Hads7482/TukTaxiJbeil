import React from 'react'

function Home() {
    return (
        <div className="min-h-screen bg-gray-100 overflow-x-hidden">
            <section className="hero bg-blue-600 text-white py-20">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
                    <p className="text-xl mb-8">This is a placeholder for the home page content.</p>
                    <button className="bg-white text-blue-600 px-6 py-2 rounded">Get Started</button>
                </div>
            </section>
            <section className="features py-20">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded shadow">
                            <h3 className="text-xl font-semibold mb-4">Feature 1</h3>
                            <p>Placeholder text for feature 1.</p>
                        </div>
                        <div className="bg-white p-6 rounded shadow">
                            <h3 className="text-xl font-semibold mb-4">Feature 2</h3>
                            <p>Placeholder text for feature 2.</p>
                        </div>
                        <div className="bg-white p-6 rounded shadow">
                            <h3 className="text-xl font-semibold mb-4">Feature 3</h3>
                            <p>Placeholder text for feature 3.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home