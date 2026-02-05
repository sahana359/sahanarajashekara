import { useState, useEffect } from 'react';

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Close menu when clicking a link
    const handleLinkClick = () => {
        if (isMobile) {
            setIsOpen(false);
        }
    };

    const navItems = [
        { label: 'About', href: '#about' },
        { label: 'Education', href: '#education' },
        { label: 'Experience', href: '#experience' },
        { label: 'Projects', href: '#projects' },
        { label: 'Certificates', href: '#certificates' },
        { label: 'Adventures', href: '#adventures' },
        { label: 'Meet Jackie', href: '#jackie' },
    ];

    return (
        <>
            <header 
                className="fixed top-0 left-0 z-50 px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6"
                onMouseEnter={!isMobile ? () => setIsOpen(true) : undefined}
                onMouseLeave={!isMobile ? () => setIsOpen(false) : undefined}
            >
                <div className="flex justify-start items-center">
                    {/* Hamburger Button */}
                    <button 
                        className="flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/10 transition-colors active:scale-95"
                        onClick={() => isMobile && setIsOpen(!isOpen)}
                        aria-label="Toggle navigation menu"
                        aria-expanded={isOpen}
                    >
                        <span 
                            className={`w-5 sm:w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen && isMobile ? 'rotate-45 translate-y-2' : ''}`}
                        />
                        <span 
                            className={`w-5 sm:w-6 h-0.5 bg-white transition-opacity duration-300 ${isOpen && isMobile ? 'opacity-0' : ''}`}
                        />
                        <span 
                            className={`w-5 sm:w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen && isMobile ? '-rotate-45 -translate-y-2' : ''}`}
                        />
                    </button>
                </div>

                {/* Dropdown Menu */}
                <nav 
                    className={`mt-3 sm:mt-4 flex flex-col gap-2 sm:gap-3 transition-all duration-300 ${
                        isOpen 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 -translate-y-4 pointer-events-none'
                    }`}
                >
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            onClick={handleLinkClick}
                            className="text-gray-300 hover:text-white hover:underline transition-colors text-sm sm:text-base py-1 px-2 -mx-2 rounded hover:bg-white/5 active:bg-white/10"
                            style={{ letterSpacing: '0.05em' }}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>
            </header>

            {/* Backdrop for mobile - closes menu when tapping outside */}
            {isMobile && isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}
        </>
    );
}

export default Header;