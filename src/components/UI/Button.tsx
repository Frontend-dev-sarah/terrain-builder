type ButtonProps = {
    onClick: () => void;
    buttonTitle: string;
    disabled?: boolean;
}


const Button = ({ onClick, buttonTitle, disabled }: ButtonProps) => {
    const enabledStyle = 'm-2 px-2 py-1 text-white bg-blue-600 hover:bg-slate-500 hover:text-slate-200'
    const disabledStyle = 'm-2 px-2 py-1 bg-gray-300 text-gray-700 py-2 px-4 rounded opacity-50 cursor-not-allowed'
    return (
        <button disabled={disabled} className={disabled ? disabledStyle : enabledStyle} onClick={onClick}>
            {buttonTitle}
        </button>
    )
}

export default Button;