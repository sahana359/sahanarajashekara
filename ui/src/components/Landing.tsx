import aboutData from '../data/json/about.json';

function Landing() {
  const handleScrollDown = () => {
    const container = document.querySelector('.snap-y');
    if (container) {
      container.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <section
      className="min-h-screen sm:h-screen snap-start bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/images/bg.png')" }}
    >
      <div className="h-full flex items-center px-4 sm:px-8 md:px-16 lg:px-32 py-20 sm:py-0">
        <div className="w-full">
          <div className="max-w-2xl">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight mb-4 sm:mb-6"
              style={{ letterSpacing: '0.08em' }}
            >
              {aboutData.firstName}
              <br />
              {aboutData.lastName}
            </h1>

            <p
              className="text-base sm:text-lg md:text-xl font-semibold text-gray-300 mb-3 sm:mb-4"
              style={{ letterSpacing: '0.08em' }}
            >
              <span className="text-white font-medium">{aboutData.title}</span>
            </p>

            <p
              className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed"
              style={{
                background: 'linear-gradient(to right, rgba(48, 105, 153, 0.7), rgba(100, 160, 200, 0.7))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {aboutData.highlights.join('  •  ')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="/documents/SahanaRajashekara.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 sm:px-8 py-3 text-white text-center text-sm sm:text-base rounded-lg hover:opacity-90 active:scale-95 transition-all"
                style={{ background: 'linear-gradient(to right, rgba(48, 105, 153, 0.6), rgba(100, 160, 200, 0.3))' }}
              >
                Resume
              </a>
              <a
                href={`mailto:${aboutData.contact.email}`}
                className="px-6 sm:px-8 py-3 text-white text-center text-sm sm:text-base rounded-lg hover:opacity-90 active:scale-95 transition-all"
                style={{ background: 'linear-gradient(to right, rgba(48, 105, 153, 0.3), rgba(100, 160, 200, 0.1))' }}
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer group"
        style={{ color: 'rgba(100, 160, 200, 0.7)' }}
        aria-label="Scroll down"
      >
        {/* Mouse icon */}
        <svg
          className="w-6 h-9 opacity-70 group-hover:opacity-100 transition-opacity"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 36"
          strokeWidth={1.5}
        >
          <rect x="5" y="1" width="14" height="22" rx="7" ry="7" />
          <line x1="12" y1="6" x2="12" y2="10" strokeLinecap="round" />
        </svg>
        <svg
          className="w-4 h-4 animate-bounce opacity-60 group-hover:opacity-100 transition-opacity"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </section>
  );
}

export default Landing;