import aboutData from '../data/json/about.json';

function Landing() {
  return (
    <section
      className="min-h-screen sm:h-screen snap-start bg-cover bg-center bg-no-repeat"
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
    </section>
  );
}

export default Landing;