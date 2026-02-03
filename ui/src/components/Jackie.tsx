import jackieData from '../data/json/jackie.json';

function Jackie() {
    const rotations = [-4, 3];
    
    return (
        <div className="px-8 pl-32 py-8">
            {/* Text Content */}
            <div className="mb-12">
                <h2
                    className="text-4xl font-semibold text-white mb-2"
                    style={{ letterSpacing: '0.08em' }}
                >
                    Meet {jackieData.name}
                </h2>
                
                <p className="text-gray-400 mb-6">The goodest boy</p>

                {/* Likes */}
                <div className="flex flex-wrap gap-2">
                    {jackieData.likes.map((like, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 text-sm rounded-lg"
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

            {/* Polaroids */}
            <div className="flex gap-12">
                {jackieData.images?.map((image, index) => (
                    <div
                        key={index}
                        className="hover:scale-105 transition-transform"
                        style={{ transform: `rotate(${rotations[index % rotations.length]}deg)` }}
                    >
                        <div
                            className="p-3 shadow-xl"
                            style={{
                                background: 'linear-gradient(145deg, #f5f5f5e8, #e0e0e0be)',
                                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
                            }}
                        >
                            <div className="w-56 h-56 overflow-hidden">
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