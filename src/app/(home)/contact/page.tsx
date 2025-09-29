'use client'
import { useState } from 'react';
import { contactData } from "../../data/data";

export default function Contact() {
    const colors = ['bg-[#2C0E37]', 'bg-[#104F55]', 'bg-[#10131F]'];
    const [activeForm, setActiveForm] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent, subject: string) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('https://formspree.io/f/xvgwknll', {  
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    _subject: `${subject} - Contact Form Submission`,
                    _replyto: formData.email,
                }),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setActiveForm(null), 2000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.log(error);
            
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 mt-20 relative">
            <div className="text-center mb-12">
                <span className="text-gray-400 block mb-2">Need Help?</span>
                <h1 className="text-white text-4xl font-bold">Contact Us</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {contactData.map((item, index) => (
                    <div 
                        key={index} 
                        className={`
                            ${index < 2 ? colors[index] : colors[2]} 
                            rounded-2xl 
                            p-6 
                            flex 
                            flex-col 
                            justify-between 
                            h-full 
                            hover:scale-105 
                            transition-transform 
                            duration-300 
                            ease-in-out
                        `}
                    >
                        <div>
                            <h3 className="text-white text-xl font-semibold mb-4">{item.title}</h3>
                            <p className="text-[#9E9FA1] mb-6 text-[15px]">{item.description}</p>
                        </div>
                        <button 
                            onClick={() => setActiveForm(index)}
                            className="self-start border-1 border-[#7D8491] text-white py-3 px-6 rounded-full font-semibold transition-colors"
                        >
                            Contact us
                        </button>
                    </div>
                ))}
            </div>

            {/* Contact Form Modal */}
            {activeForm !== null && (
                <div className="fixed inset-0 bg-black/5 bg-opacity-10 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#10131F] rounded-2xl p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-white text-xl font-semibold">
                                {contactData[activeForm].title} - Contact Form
                            </h2>
                            <button 
                                onClick={() => {
                                    setActiveForm(null);
                                    setSubmitStatus(null);
                                }}
                                className="text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        {submitStatus === 'success' ? (
                            <div className="text-green-400 mb-4">
                                Thank you! Your message has been sent successfully.
                            </div>
                        ) : (
                            <form onSubmit={(e) => handleSubmit(e, contactData[activeForm].title)}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-300 mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#10131F] text-white rounded-lg px-4 py-2 border border-[#7D8491] focus:outline-none focus:ring-2 focus:ring-[#439A86]"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-gray-300 mb-2">Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#10131F] text-white rounded-lg px-4 py-2 border border-[#7D8491] focus:outline-none focus:ring-2 focus:ring-[#439A86]"
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="message" className="block text-gray-300 mb-2">Your Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full bg-[#10131F] text-white rounded-lg px-4 py-2 border border-[#7D8491] focus:outline-none focus:ring-2 focus:ring-[#439A86]"
                                        required
                                    />
                                </div>

                                {submitStatus === 'error' && (
                                    <div className="text-red-400 mb-4">
                                        There was an error sending your message. Please try again.
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-[#439A86] text-white py-3 px-6 rounded-full font-semibold hover:bg-teal-600 transition-colors disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}