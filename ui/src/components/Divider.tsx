function Divider() {
    return (
        <div className="px-4 sm:px-8 md:px-16 lg:px-32">
            <div 
                className="h-px"
                style={{ 
                    background: 'linear-gradient(to right, rgba(48, 105, 153, 0.5), rgba(100, 160, 200, 0.2), transparent)'
                }}
            />
        </div>
    );
}

export default Divider;