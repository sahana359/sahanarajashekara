import educationData from '../data/json/education.json';

function Education() {
    return (
        <div className="pt-4 px-8 pl-32 py-8">
            <h2
                className="text-4xl font-semibold text-white my-4"
                style={{ letterSpacing: '0.08em' }}
            >
                Education
            </h2>

            <div className="space-y-8">
                {educationData.education.map((edu) => (
                    <div 
                        key={edu.id}
                        className="p-6 rounded-2xl"
                        style={{ 
                            background: 'linear-gradient(135deg, rgba(48, 105, 153, 0.15), rgba(20, 30, 48, 0.3))',
                            border: '1px solid rgba(100, 160, 200, 0.2)'
                        }}
                    >
                        {/* Top - Degree & Institution */}
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-white">
                                {edu.degree} in {edu.field}
                            </h3>
                            <p 
                                className="text-lg mt-1"
                                style={{ color: 'rgba(100, 160, 200, 0.9)' }}
                            >
                                {edu.institution}
                            </p>
                            <p className="text-gray-400 mt-1">
                                {edu.location} • {edu.startDate} - {edu.endDate}
                            </p>
                            {edu.gpa && (
                                <p className="text-gray-300 mt-2">
                                    GPA: <span className="text-white font-medium">{edu.gpa}</span>
                                </p>
                            )}
                        </div>

                        {/* Bottom - Courses */}
                        <div>
                            <p className="text-gray-400 mb-3">Relevant Coursework</p>
                            <div className="flex flex-wrap gap-2">
                                {edu.courses.map((course, index) => (
                                    <span 
                                        key={index}
                                        className="px-3 py-1 text-sm text-gray-300 rounded-lg"
                                        style={{ background: 'rgba(48, 105, 153, 0.3)' }}
                                    >
                                        {course}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Education;