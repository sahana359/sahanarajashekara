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

    // Prevent body scroll when chat is open on mobile
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

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
            {/* Chat Button - Responsive positioning */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95"
                style={{
                    background: 'linear-gradient(135deg, rgba(48, 105, 153, 0.9), rgba(100, 160, 200, 0.9))'
                }}
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
            >
                {isOpen ? (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                )}
            </button>

            {/* Chat Window - Full screen on mobile, floating on desktop */}
            {isOpen && (
                <div
                    className="fixed inset-0 sm:inset-auto sm:bottom-20 sm:right-6 z-50 sm:w-96 sm:h-[500px] sm:rounded-2xl flex flex-col overflow-hidden shadow-2xl"
                    style={{
                        background: 'linear-gradient(135deg, rgba(20, 30, 48, 0.95), rgba(30, 40, 60, 0.95))',
                        border: '1px solid rgba(100, 160, 200, 0.2)',
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    {/* Header - Mobile optimized */}
                    <div 
                        className="p-4 sm:p-4 border-b flex items-center justify-between"
                        style={{ borderColor: 'rgba(100, 160, 200, 0.2)' }}
                    >
                        <div>
                            <h3 className="text-white font-semibold text-base sm:text-lg">Chat with Sahana's AI</h3>
                            <p className="text-gray-400 text-xs sm:text-sm">Ask me anything about Sahana!</p>
                        </div>
                        {/* Close button visible only on mobile */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="sm:hidden w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                            aria-label="Close chat"
                        >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages - Responsive padding and sizing */}
                    <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                        {messages.length === 0 && (
                            <div className="text-gray-400 text-sm text-center mt-8 px-4">
                                <p className="text-base sm:text-lg mb-3">👋 Hi! I can tell you about:</p>
                                <div className="space-y-2 text-left max-w-xs mx-auto">
                                    <p>• Sahana's experience & projects</p>
                                    <p>• Skills & education</p>
                                    <p>• Or even Jackie the dog! 🐶</p>
                                </div>
                            </div>
                        )}
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] sm:max-w-[80%] p-3 rounded-xl text-sm sm:text-base ${
                                        msg.role === 'user'
                                            ? 'text-white rounded-br-sm'
                                            : 'text-gray-200 rounded-bl-sm'
                                    }`}
                                    style={{
                                        background: msg.role === 'user'
                                            ? 'linear-gradient(135deg, rgba(48, 105, 153, 0.8), rgba(100, 160, 200, 0.6))'
                                            : 'rgba(255, 255, 255, 0.1)',
                                        wordBreak: 'break-word'
                                    }}
                                >
                                    {msg.role === 'user' ? (
                                        msg.content
                                    ) : (
                                        <ReactMarkdown
                                            components={{
                                                h2: ({ children }) => <h2 className="text-sm sm:text-base font-semibold text-white mt-2 mb-1">{children}</h2>,
                                                h3: ({ children }) => <h3 className="text-xs sm:text-sm font-semibold text-white mt-2 mb-1">{children}</h3>,
                                                p: ({ children }) => <p className="mb-2 text-sm sm:text-base">{children}</p>,
                                                ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1 text-sm sm:text-base">{children}</ul>,
                                                li: ({ children }) => <li className="text-gray-300">{children}</li>,
                                                strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
                                                a: ({ children, href }) => <a href={href} className="text-blue-300 underline" target="_blank" rel="noopener noreferrer">{children}</a>,
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
                                    className="p-3 rounded-xl text-sm text-gray-400 flex items-center gap-2"
                                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                                >
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                    <span>Thinking...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input - Mobile optimized with safe area padding */}
                    <div 
                        className="p-3 sm:p-4 border-t pb-safe"
                        style={{ 
                            borderColor: 'rgba(100, 160, 200, 0.2)',
                            paddingBottom: 'max(12px, env(safe-area-inset-bottom))'
                        }}
                    >
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask about Sahana..."
                                className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-white text-sm sm:text-base outline-none"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(100, 160, 200, 0.2)'
                                }}
                                disabled={isLoading}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={isLoading || !input.trim()}
                                className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-white hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(48, 105, 153, 0.8), rgba(100, 160, 200, 0.6))'
                                }}
                                aria-label="Send message"
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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