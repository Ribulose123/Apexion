import { contactData } from "../data/data";

export default function Contact() {
    const colors = ['bg-[#2C0E37]', 'bg-[#104F55]', 'bg-[#10131F]'];

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <span className="text-gray-400 block mb-2">Need Help?</span>
                <h1 className="text-white text-4xl font-bold">Contact Us</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                        <button className="self-start border-1 border-[#7D8491] text-white py-3 px-6 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                            Contact us
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}