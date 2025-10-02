import React from "react";

const Button = ({
	className = "",
	label,
	icon,
	onClick = null,
	disabled = false,
	type = "button",
	...props
}) => {
	const handleClick = (e) => {
		if (disabled) return;
		if (onClick && typeof onClick === "function") {
			onClick(e);
		}
	};

	return (
		<button
			type={type}
			onClick={handleClick}
			disabled={disabled}
			className={`
				${className} 
				font-fciconicBW text-textGray 
				flex gap-2 justify-center items-center 
				bg-white px-4 py-2 border border-textGray/50 
				rounded-full cursor-pointer
				transition-all duration-200
				${
					disabled
						? "opacity-50 cursor-not-allowed"
						: "hover:bg-gray-50 hover:border-textGray/70 hover:shadow-sm active:scale-95"
				}
			`}
			{...props}
		>
			{label}
			{icon && icon}
		</button>
	);
};

export default Button;
