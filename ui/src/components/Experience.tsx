import experienceData from '../data/json/experience.json';

function Experience() {
    return (
        <div className="px-8 pl-32 py-8">
            <h2
                className="text-4xl font-semibold text-white mb-12"
                style={{ letterSpacing: '0.08em' }}
            >
                Experience
            </h2>

            <div className="space-y-8">
                {experienceData.experience.map((exp) => (
                    <div
                        key={exp.id}
                        className="p-6 rounded-2xl"
                        style={{
                            background: 'linear-gradient(135deg, rgba(48, 105, 153, 0.15), rgba(20, 30, 48, 0.3))',
                            border: '1px solid rgba(100, 160, 200, 0.2)'
                        }}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-semibold text-white">
                                    {exp.role}
                                </h3>
                                <p
                                    className="text-lg mt-1"
                                    style={{ color: 'rgba(100, 160, 200, 0.9)' }}
                                >
                                    {exp.company}
                                    {exp.course && <span className="text-gray-400"> • {exp.course}</span>}
                                </p>
                            </div>
                            <div className="text-right text-gray-400">
                                <p>{exp.location}</p>
                                <p>{exp.startDate} - {exp.endDate}</p>
                            </div>
                        </div>

                        {/* Responsibilities */}
                        <ul className="space-y-2 mb-4">
                            {exp.responsibilities.map((resp, index) => (
                                <li key={index} className="text-gray-300 flex gap-3">
                                    <span style={{ color: 'rgba(100, 160, 200, 0.9)' }}>▹</span>
                                    <span>{resp}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mt-4">
                            {exp.technologies.map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 text-sm text-gray-300 rounded-lg"
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