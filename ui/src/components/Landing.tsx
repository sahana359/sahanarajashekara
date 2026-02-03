import aboutData from '../data/json/about.json';

function Landing() {
  return (
    <section
      className="h-screen snap-start bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/bg.png')" }}
    >
      <div className="h-full flex items-center px-8 pl-32">
        <div className="w-full">
          <div className="max-w-2xl">
            <h1
              className="text-6xl md:text-7xl font-semibold text-white leading-tight mb-4"
              style={{ letterSpacing: '0.08em' }}
            >
              {aboutData.firstName}
              <br />
              {aboutData.lastName}
            </h1>

            <p
              className="text-xl font-semibold text-gray-300 mb-4"
              style={{ letterSpacing: '0.08em' }}
            >
              <span className="text-white font-medium">{aboutData.title}</span>
            </p>

            <p
              className="text-lg mb-4"
              style={{
                background: 'linear-gradient(to right, rgba(48, 105, 153, 0.7), rgba(100, 160, 200, 0.7))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {aboutData.highlights.join('  •  ')}
            </p>

            <div className="flex gap-4">
              <a
                href="/documents/SahanaRajashekara.pdf"
                download
                className="px-8 py-3 text-white rounded-lg hover:opacity-90 transition-all"
                style={{ background: 'linear-gradient(to right, rgba(48, 105, 153, 0.6), rgba(100, 160, 200, 0.3))' }}
              >
                Resume
              </a>
              <a
                href={`mailto:${aboutData.contact.email}`}
                className="px-8 py-3 text-white rounded-lg hover:opacity-90 transition-all"
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