import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend, FiMapPin, FiPackage, FiPhoneCall } from 'react-icons/fi';
import { FaWhatsapp, FaRobot } from 'react-icons/fa';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! 👋 I'm the Sri Venkateshwara & Co virtual assistant. How can I help you today?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text) => {
    const userMessage = text || inputValue.trim();
    if (!userMessage) return;

    // Add user message
    const newMessages = [...messages, { id: crypto.randomUUID(), text: userMessage, isBot: false }];
    setMessages(newMessages);
    setInputValue("");

    // Bot response logic delay
    setTimeout(() => {
      const response = generateResponse(userMessage.toLowerCase());
      setMessages(prev => [...prev, { id: crypto.randomUUID(), text: response, isBot: true }]);
    }, 600);
  };

  const generateResponse = (input) => {
    // 1. Timings
    if (input.includes("time") || input.includes("timing") || input.includes("open") || input.includes("close") || input.includes("hours")) {
      return "Our shop is open from 9:00AM to 8:30 PM Monday to Saturday .";
    }
    
    // 2. Contact
    if (input.includes("contact") || input.includes("phone") || input.includes("number") || input.includes("call") || input.includes("whatsapp")) {
      return "You can contact us at 9394423366 or message us on WhatsApp.";
    }

    // 3. Location
    if (input.includes("location") || input.includes("where") || input.includes("address")) {
      return "Our shop is located at Main Road, Near khadi complex, Jammikunta, Telangana.";
    }

    // 4. Products
    if (input.includes("products") || input.includes("items") || input.includes("sell") || input.includes("available")) {
      return "We provide electrical, agricultural, and sanitary products including motors, pipes, lights, switches, and fittings.";
    }

    // 5. Taro Pumps
    if (input.includes("taro") || input.includes("motor") || input.includes("pump")) {
      return "Yes, we are an authorized dealer of Taro pumps and provide high-quality borewell motors.";
    }
    
    // Fallback
    return "Please contact us on WhatsApp for more details.";
  };

  return (
    <div className="flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 right-0 w-[350px] max-w-[calc(100vw-3rem)] bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 z-[110] flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="bg-green-600 text-white p-5 flex items-center justify-between shadow-md relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <FaRobot className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold font-poppins text-lg leading-tight">Shop Assistant</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse"></span>
                    <p className="text-xs text-green-100 font-medium">Online & Ready</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                aria-label="Close Chat"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-5 bg-gray-50 flex flex-col gap-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div 
                    className={`max-w-[85%] p-3.5 rounded-2xl ${
                      msg.isBot 
                        ? "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-sm" 
                        : "bg-green-600 text-white shadow-md rounded-tr-sm"
                    }`}
                  >
                    <p className="text-sm font-sans leading-relaxed">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-3 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
              <button onClick={() => handleSend("What products do you sell?")} className="flex-none flex items-center gap-1.5 bg-gray-100 hover:bg-green-50 text-gray-700 hover:text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 border border-transparent hover:border-green-200">
                <FiPackage /> Products
              </button>
              <button onClick={() => handleSend("Where is your shop located?")} className="flex-none flex items-center gap-1.5 bg-gray-100 hover:bg-green-50 text-gray-700 hover:text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 border border-transparent hover:border-green-200">
                <FiMapPin /> Location
              </button>
              <a href="https://wa.me/919394423366" target="_blank" rel="noopener noreferrer" className="flex-none flex items-center gap-1.5 bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200">
                <FaWhatsapp /> Contact WhatsApp
              </a>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100 relative z-10 flex items-center gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your question..."
                className="flex-1 bg-gray-100 text-gray-800 text-sm rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500/50"
              />
              <button 
                onClick={() => handleSend()}
                disabled={!inputValue.trim()}
                className="w-11 h-11 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-md"
              >
                <FiSend />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 bg-white text-green-600 rounded-full shadow-[0_5px_20px_rgba(0,0,0,0.15)] border border-gray-100 flex items-center justify-center cursor-pointer relative z-[100] group mt-4 mb-2"
        aria-label="Toggle Chatbot"
      >
        {isOpen ? (
          <FiX className="text-2xl" />
        ) : (
          <FiMessageSquare className="text-2xl group-hover:rotate-12 transition-transform" />
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center animate-bounce"></span>
        )}
      </motion.button>
    </div>
  );
};

export default Chatbot;
