import experienceData from '../data/json/experience.json';

function Experience() {
    return (
        <div className="px-4 sm:px-8 md:px-16 lg:px-32 py-6 sm:py-8">
            <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-8 sm:mb-12"
                style={{ letterSpacing: '0.08em' }}
            >
                Experience
            </h2>

            <div className="space-y-6 sm:space-y-8">
                {experienceData.experience.map((exp) => (
                    <div
                        key={exp.id}
                        className="p-4 sm:p-6 rounded-xl sm:rounded-2xl"
                        style={{
                            background: 'linear-gradient(135deg, rgba(48, 105, 153, 0.15), rgba(20, 30, 48, 0.3))',
                            border: '1px solid rgba(100, 160, 200, 0.2)'
                        }}
                    >
                        {/* Header - Stack on mobile, side-by-side on desktop */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-4">
                            <div className="flex-1">
                                <h3 className="text-lg sm:text-xl font-semibold text-white leading-tight">
                                    {exp.role}
                                </h3>
                                <p
                                    className="text-base sm:text-lg mt-1 sm:mt-1"
                                    style={{ color: 'rgba(100, 160, 200, 0.9)' }}
                                >
                                    {exp.company}
                                    {exp.course && <span className="text-gray-400 text-sm sm:text-base"> • {exp.course}</span>}
                                </p>
                            </div>
                            <div className="text-left sm:text-right text-gray-400 text-sm sm:text-base flex-shrink-0">
                                <p>{exp.location}</p>
                                <p className="whitespace-nowrap">{exp.startDate} - {exp.endDate}</p>
                            </div>
                        </div>

                        {/* Responsibilities */}
                        <ul className="space-y-2 mb-4">
                            {exp.responsibilities.map((resp, index) => (
                                <li key={index} className="text-sm sm:text-base text-gray-300 flex gap-2 sm:gap-3">
                                    <span 
                                        className="flex-shrink-0 mt-1"
                                        style={{ color: 'rgba(100, 160, 200, 0.9)' }}
                                    >
                                        ▹
                                    </span>
                                    <span className="flex-1">{resp}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mt-4">
                            {exp.technologies.map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-2.5 sm:px-3 py-1 text-xs sm:text-sm text-gray-300 rounded-lg"
                                    style={{ background: 'rgba(48, 105, 153, 0.3)' }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Experience;