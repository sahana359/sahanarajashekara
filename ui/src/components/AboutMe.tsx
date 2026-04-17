import aboutData from '../data/json/about.json';

function AboutMe() {
    return (
        <div className="px-6 md:px-16 lg:px-32 py-12">
            <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center md:items-start">

                {/* Left column: photo, name, title, links */}
                <div className="flex flex-col items-center gap-5 flex-shrink-0">
                    <img
                        src="/images/profile-picture.jpeg"
                        alt={`${aboutData.firstName} ${aboutData.lastName}`}
                        className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-2xl shadow-lg"
                        style={{ boxShadow: '0 0 30px rgba(48, 105, 153, 0.4)' }}
                    />

                    <div className="text-center">
                        <h2
                            className="text-3xl md:text-4xl font-semibold text-white"
                            style={{ letterSpacing: '0.06em' }}
                        >
                            {aboutData.firstName} {aboutData.lastName}
                        </h2>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-between w-full">
                        <a
                            href={aboutData.contact.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="LinkedIn"
                            className="flex-1 flex justify-center p-2.5 rounded-xl hover:opacity-80 transition-all mx-1"
                            style={{ background: 'rgba(48, 105, 153, 0.3)' }}
                        >
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                        </a>
                        <a
                            href={aboutData.contact.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="GitHub"
                            className="flex-1 flex justify-center p-2.5 rounded-xl hover:opacity-80 transition-all mx-1"
                            style={{ background: 'rgba(48, 105, 153, 0.3)' }}
                        >
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                        </a>
                        <a
                            href={`mailto:${aboutData.contact.email}`}
                            title="Email"
                            className="flex-1 flex justify-center p-2.5 rounded-xl hover:opacity-80 transition-all mx-1"
                            style={{ background: 'rgba(48, 105, 153, 0.3)' }}
                        >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </a>
                        <a
                            href={`tel:${aboutData.contact.phone}`}
                            title="Phone"
                            className="flex-1 flex justify-center p-2.5 rounded-xl hover:opacity-80 transition-all mx-1"
                            style={{ background: 'rgba(48, 105, 153, 0.3)' }}
                        >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </a>
                    </div>

                    {/* Resume button */}
                    <a
                        href="/documents/SahanaRajashekara.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center px-8 py-2.5 text-white text-sm font-medium rounded-xl hover:opacity-90 active:scale-95 transition-all"
                        style={{ background: 'linear-gradient(to right, rgba(48, 105, 153, 0.7), rgba(100, 160, 200, 0.4))' }}
                    >
                        Resume
                    </a>
                </div>

                {/* Right column: bio + highlight tags */}
                <div className="flex-1 flex flex-col gap-5">
                    <div
                        className="rounded-2xl px-6 py-6"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(100,160,210,0.15)' }}
                    >
                        <p className="text-base md:text-lg text-gray-300 leading-relaxed text-justify">
                            {aboutData.summary.split('\n\n').map((para, i, arr) => (
                                <span key={i}>
                                    {para}
                                    {i < arr.length - 1 && <><br /><br /></>}
                                </span>
                            ))}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AboutMe;
