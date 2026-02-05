import adventuresData from '../data/json/adventures.json';

function Adventures() {
    return (
        <div className="px-6 md:px-8 md:pl-32 py-8">
            <h2
                className="text-3xl md:text-4xl font-semibold text-white mb-8 md:mb-12"
                style={{ letterSpacing: '0.08em' }}
            >
                Adventures
            </h2>

            {/* Descriptions Below */}
            <div className="space-y-6 md:space-y-8 pr-0 md:pr-24">
                {adventuresData.adventures.map((adventure) => (
                    <div
                        key={adventure.id}
                        className="p-4 md:p-6 rounded-2xl"
                        style={{
                            background: 'linear-gradient(135deg, rgba(48, 105, 153, 0.15), rgba(20, 30, 48, 0.3))',
                            border: '1px solid rgba(100, 160, 200, 0.2)'
                        }}
                    >
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                            <div>
                                <h3 className="text-lg md:text-xl font-semibold text-white">
                                    {adventure.title}
                                </h3>
                                <p
                                    className="text-base md:text-lg mt-1"
                                    style={{ color: 'rgba(100, 160, 200, 0.9)' }}
                                >
                                    {adventure.institution}
                                </p>
                            </div>
                            <div className="text-left md:text-right text-gray-400 text-sm md:text-base mt-2 md:mt-0">
                                <p>{adventure.location}</p>
                                <p>{adventure.date}</p>
                            </div>
                        </div>

                        <p className="text-gray-300 text-sm md:text-base mb-4">
                            {adventure.description}
                        </p>

                        {/* Certification Link */}
                        {adventure.certification && (
                            <a
                                href={adventure.certification}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm hover:opacity-80 transition-all"
                                style={{ color: 'rgba(100, 160, 200, 0.9)' }}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                View Certificate
                            </a>
                        )}
                    </div>
                ))}
            </div>

            {/* Polaroids Row */}
            <div className="flex gap-6 md:gap-12 mb-8 md:mb-16 flex-wrap pt-8 md:pt-12 justify-center md:justify-start">
                {adventuresData.adventures.map((adventure) => (
                    adventure.images?.map((image, imgIndex) => (
                        <div
                            key={`${adventure.id}-${imgIndex}`}
                            className="flex flex-col items-center"
                            style={{
                                transform: imgIndex % 2 === 0 ? 'rotate(-3deg)' : 'rotate(3deg)'
                            }}
                        >
                            {/* Polaroid */}
                            <div
                                className="p-2 md:p-3 shadow-xl"
                                style={{
                                    background: 'linear-gradient(145deg, #f5f5f5e8, #e0e0e0be)',
                                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
                                }}
                            >
                                {/* Image */}
                                <div className="w-40 h-40 md:w-56 md:h-56 overflow-hidden">
                                    <img
                                        src={image}
                                        alt={`${adventure.activity} ${imgIndex + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Polaroid Caption */}
                                <p
                                    className="text-center mt-2 md:mt-3 text-gray-700 text-xs md:text-sm"
                                    style={{ fontFamily: 'cursive' }}
                                >
                                    {adventure.activity} - {adventure.date}
                                </p>
                            </div>
                        </div>
                    ))
                ))}
            </div>
        </div>
    );
}

export default Adventures;