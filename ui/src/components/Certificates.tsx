import certificatesData from '../data/json/certificates.json';

function Certificates() {
    return (
        <div className="px-6 md:px-8 md:pl-32 py-8">
            <h2
                className="text-3xl md:text-4xl font-semibold text-white mb-8 md:mb-12"
                style={{ letterSpacing: '0.08em' }}
            >
                Certificates
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 pr-0 md:pr-24">
                {certificatesData.certificates.map((cert) => (
                    <a
                        key={cert.id}
                        href={cert.credentialUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 md:p-5 rounded-2xl hover:scale-105 transition-transform"
                        style={{
                            background: 'linear-gradient(135deg, rgba(48, 105, 153, 0.15), rgba(20, 30, 48, 0.3))',
                            border: '1px solid rgba(100, 160, 200, 0.2)'
                        }}
                    >
                        {/* Category Badge */}
                        <span
                            className="px-2 md:px-3 py-1 text-xs text-gray-300 rounded-lg inline-block mb-3"
                            style={{ background: 'rgba(48, 105, 153, 0.3)' }}
                        >
                            {cert.category}
                        </span>

                        {/* Certificate Name */}
                        <h3 className="text-base md:text-lg font-semibold text-white mb-2">
                            {cert.name}
                        </h3>

                        {/* Issuer */}
                        <p
                            className="text-xs md:text-sm mb-2"
                            style={{ color: 'rgba(100, 160, 200, 0.9)' }}
                        >
                            {cert.issuer}
                        </p>

                        {/* Date */}
                        <p className="text-gray-400 text-xs md:text-sm mb-3">
                            Issued {cert.issueDate}
                        </p>

                        {/* View Link */}
                        {cert.credentialUrl && (
                            <div 
                                className="mt-4 flex items-center gap-2 text-xs md:text-sm"
                                style={{ color: 'rgba(100, 160, 200, 0.9)' }}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                View Credential
                            </div>
                        )}
                    </a>
                ))}
            </div>
        </div>
    );
}

export default Certificates;