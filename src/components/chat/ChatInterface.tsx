'use client';

import React, { useState } from 'react';
import { Send, Mic, Image as ImageIcon, Paperclip } from 'lucide-react';

// Mock types
type Message = {
    id: string;
    content: string;
    sender: 'USER' | 'CONTACT' | 'AI';
    timestamp: Date;
};

export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', content: 'Hello, I am interested in your products.', sender: 'CONTACT', timestamp: new Date() },
        { id: '2', content: 'Hi! Great to hear. What specific products are you looking for?', sender: 'USER', timestamp: new Date() },
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;
        const newMessage: Message = {
            id: Date.now().toString(),
            content: input,
            sender: 'USER',
            timestamp: new Date(),
        };
        setMessages([...messages, newMessage]);
        setInput('');
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 rounded-lg border border-gray-200">
            {/* Header */}
            <div className="p-4 border-b bg-white rounded-t-lg flex justify-between items-center">
                <h2 className="font-semibold text-lg">Alice (Contact)</h2>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Online</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[70%] p-3 rounded-lg ${msg.sender === 'USER'
                                    ? 'bg-blue-600 text-white rounded-br-none'
                                    : 'bg-white border border-gray-200 rounded-bl-none'
                                }`}
                        >
                            <p>{msg.content}</p>
                            <span className={`text-[10px] block mt-1 ${msg.sender === 'USER' ? 'text-blue-100' : 'text-gray-400'}`}>
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t rounded-b-lg">
                <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Paperclip size={20} />
                    </button>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type a message..."
                        className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Mic size={20} />
                    </button>
                    <button
                        onClick={handleSend}
                        className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
