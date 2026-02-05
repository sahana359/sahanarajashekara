import jackieData from '../data/json/jackie.json';

function Jackie() {
    const rotations = [-4, 3, -3, 2];
    
    return (
        <div className="px-4 sm:px-8 md:px-16 lg:px-32 py-6 sm:py-8">
            {/* Text Content */}
            <div className="mb-8 sm:mb-12">
                <h2
                    className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-2"
                    style={{ letterSpacing: '0.08em' }}
                >
                    Meet {jackieData.name}
                </h2>
                
                <p className="text-base sm:text-lg text-gray-400 mb-4 sm:mb-6">
                    The goodest boy
                </p>

                {/* Likes */}
                <div className="flex flex-wrap gap-2">
                    {jackieData.likes.map((like, index) => (
                        <span
                            key={index}
                            className="px-2.5 sm:px-3 py-1 text-xs sm:text-sm rounded-lg"
                            style={{ 
                                background: 'rgba(100, 160, 200, 0.2)',
                                color: 'rgba(100, 160, 200, 0.9)'
                            }}
                        >
                            ❤️ {like}
                        </span>
                    ))}
                </div>
            </div>

            {/* Polaroids - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 max-w-4xl">
                {jackieData.images?.map((image, index) => (
                    <div
                        key={index}
                        className="hover:scale-105 transition-transform duration-300 mx-auto"
                        style={{ 
                            transform: `rotate(${rotations[index % rotations.length]}deg)`,
                            maxWidth: 'fit-content'
                        }}
                    >
                        <div
                            className="p-2.5 sm:p-3 shadow-xl"
                            style={{
                                background: 'linear-gradient(145deg, #f5f5f5e8, #e0e0e0be)',
                                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
                            }}
                        >
                            <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 overflow-hidden">
                                <img
                                    src={image}
                                    alt={`${jackieData.name} ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Jackie;