import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8000/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage,
                    history: messages
                })
            });

            if (response.status === 429) {
                setMessages(prev => [...prev, { 
                    role: 'assistant', 
                    content: "You've reached your daily limit of 5 messages. Please come back tomorrow!" 
                }]);
                return;
            }

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
        } catch (error) {
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: 'Sorry, I had trouble connecting. Please try again.' 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                style={{
                    background: 'linear-gradient(135deg, rgba(48, 105, 153, 0.9), rgba(100, 160, 200, 0.9))'
                }}
            >
                {isOpen ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div
                    className="fixed bottom-24 right-6 z-50 w-96 h-[500px] rounded-2xl flex flex-col overflow-hidden shadow-2xl"
                    style={{
                        background: 'linear-gradient(135deg, rgba(20, 30, 48, 0.95), rgba(30, 40, 60, 0.95))',
                        border: '1px solid rgba(100, 160, 200, 0.2)',
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    {/* Header */}
                    <div 
                        className="p-4 border-b"
                        style={{ borderColor: 'rgba(100, 160, 200, 0.2)' }}
                    >
                        <h3 className="text-white font-semibold">Chat with Sahana's AI</h3>
                        <p className="text-gray-400 text-sm">Ask me anything about Sahana!</p>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.length === 0 && (
                            <div className="text-gray-400 text-sm text-center mt-8">
                                <p>👋 Hi! I can tell you about:</p>
                                <p className="mt-2">• Sahana's experience & projects</p>
                                <p>• Skills & education</p>
                                <p>• Or even Jackie the dog! 🐶</p>
                            </div>
                        )}
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-xl text-sm ${
                                        msg.role === 'user'
                                            ? 'text-white'
                                            : 'text-gray-200'
                                    }`}
                                    style={{
                                        background: msg.role === 'user'
                                            ? 'linear-gradient(135deg, rgba(48, 105, 153, 0.8), rgba(100, 160, 200, 0.6))'
                                            : 'rgba(255, 255, 255, 0.1)'
                                    }}
                                >
                                    {msg.role === 'user' ? (
                                        msg.content
                                    ) : (
                                        <ReactMarkdown
                                            components={{
                                                h2: ({ children }) => <h2 className="text-base font-semibold text-white mt-2 mb-1">{children}</h2>,
                                                h3: ({ children }) => <h3 className="text-sm font-semibold text-white mt-2 mb-1">{children}</h3>,
                                                p: ({ children }) => <p className="mb-2">{children}</p>,
                                                ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                                                li: ({ children }) => <li className="text-gray-300">{children}</li>,
                                                strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
                                            }}
                                        >
                                            {msg.content}
                                        </ReactMarkdown>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div 
                                    className="p-3 rounded-xl text-sm text-gray-400"
                                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                                >
                                    Thinking...
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div 
                        className="p-4 border-t"
                        style={{ borderColor: 'rgba(100, 160, 200, 0.2)' }}
                    >
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask about Sahana..."
                                className="flex-1 px-4 py-2 rounded-lg text-white text-sm outline-none"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(100, 160, 200, 0.2)'
                                }}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={isLoading}
                                className="px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity disabled:opacity-50"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(48, 105, 153, 0.8), rgba(100, 160, 200, 0.6))'
                                }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ChatWidget;