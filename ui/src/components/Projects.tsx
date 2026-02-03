import projectsData from '../data/json/projects.json';

function Projects() {
    return (
        <div className="px-8 pl-32 py-8">
            <h2
                className="text-4xl font-semibold text-white mb-12"
                style={{ letterSpacing: '0.08em' }}
            >
                Projects
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pr-24">
                {projectsData.projects.map((project) => (
                    <div
                        key={project.id}
                        className="p-6 rounded-2xl h-full flex flex-col"
                        style={{
                            background: 'linear-gradient(135deg, rgba(48, 105, 153, 0.15), rgba(20, 30, 48, 0.3))',
                            border: '1px solid rgba(100, 160, 200, 0.2)'
                        }}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-semibold text-white">
                                {project.name}
                            </h3>
                            <div className="flex gap-3">
                                {project.links.github && (
                                    <a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                    </a>
                                )}
                                {project.links.live && (
                                    <a
                                        href={project.links.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Organization */}
                        <p
                            className="text-sm mb-3"
                            style={{ color: 'rgba(100, 160, 200, 0.9)' }}
                        >
                            {project.organization}
                        </p>

                        {/* Description */}
                        <p className="text-gray-300 mb-4">
                            {project.description}
                        </p>

                        {/* Long Description as Points */}
                        <ul className="space-y-2 mb-4 flex-grow">
                            {project.longDescription.split('. ').filter(s => s.trim()).map((point, index) => (
                                <li key={index} className="text-gray-400 text-sm flex gap-2">
                                    <span style={{ color: 'rgba(100, 160, 200, 0.9)' }}>▹</span>
                                    <span>{point.trim().endsWith('.') ? point.trim() : `${point.trim()}.`}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {project.technologies.map((tech, index) => (
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

export default Projects;