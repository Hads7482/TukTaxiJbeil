import React from 'react'

function Contact() {
    return (
        <div className="min-h-screen bg-gray-100 py-20 overflow-x-hidden">
            <div className="container mx-auto text-center">
                <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
                <p className="text-lg mb-8">Get in touch with us. This is a placeholder for contact information.</p>
                <form className="bg-white p-8 rounded shadow max-w-md mx-auto">
                    <div className="mb-4">
                        <label className="block text-left mb-2">Name</label>
                        <input type="text" className="w-full p-2 border rounded" placeholder="Your Name" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-left mb-2">Email</label>
                        <input type="email" className="w-full p-2 border rounded" placeholder="Your Email" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-left mb-2">Message</label>
                        <textarea className="w-full p-2 border rounded" rows="4" placeholder="Your Message"></textarea>
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Send Message</button>
                </form>
            </div>
        </div>
    )
}

export default Contact