function Divider() {
    return (
        <div className="px-8 pl-32 pr-32">
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