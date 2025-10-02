import React from "react";

const Button = ({ className, label, icon }) => {
	return (
		<button
			type="button"
			className={`${className} font-fciconicBW text-textGray flex gap-2 justify-center items-center bg-white px-4 py-2 border border-textGray/50 rounded-full`}
		>
			{label}
			{icon && icon}
		</button>
	);
};

export default Button;
