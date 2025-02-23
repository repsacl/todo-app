const Button = ({ children, onClick, className}) => {
    return (
        <button onClick={onClick} className={`px-1 rounded-lg border-1 border-solid transition-all duration-300 ease-in-out hover:bg-blue-700 ${className}`}>
        {children}
        </button>
    )
}

export default Button