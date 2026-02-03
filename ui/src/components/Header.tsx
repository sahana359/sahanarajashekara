import { useState } from 'react';

function Header() {
    const [isOpen, setIsOpen] = useState(false);

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
        <header 
            className="fixed top-0 left-0 z-50 px-8 py-6"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <div className="flex justify-start items-center">
                {/* Hamburger Button */}
                <button className="flex flex-col gap-1.5 p-2">
                    <span className="w-6 h-0.5 bg-white" />
                    <span className="w-6 h-0.5 bg-white" />
                    <span className="w-6 h-0.5 bg-white" />
                </button>
            </div>

            {/* Dropdown Menu */}
            <nav 
                className={`mt-4 flex flex-col gap-3 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
            >
                {navItems.map((item) => (
                    <a
                        key={item.href}
                        href={item.href}
                        className="text-gray-300 hover:text-white hover:underline transition-colors text-sm"
                        style={{ letterSpacing: '0.05em' }}
                    >
                        {item.label}
                    </a>
                ))}
            </nav>
        </header>
    );
}

export default Header;