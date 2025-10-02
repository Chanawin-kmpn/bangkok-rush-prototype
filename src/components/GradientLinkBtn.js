import { cn } from "@/lib/utils";
import { ChevronDown, ListFilter } from "lucide-react";
import Link from "next/link";
import React from "react";

const GradientLinkBtn = ({
	className,
	isGradient = false,
	label,
	icon,
	link,
}) => {
	const generateIcon = (icon) => {
		const normalizedType = icon.toLowerCase();
		const iconMap = {
			filter: <ListFilter size={12} />,
			chevron: <ChevronDown size={12} />,
		};

		return iconMap[normalizedType];
	};
	return (
		<Link
			href={link}
			className={cn(
				`${className} w-fit flex gap-2 items-center font-fciconicBW text-textGray rounded-full shadow-md px-4 py-2`,
				{
					"bg-gradient-to-r from-secondery to-primary text-white! bg-size-[150%] hover:bg-right transition-all duration-500":
						isGradient,
				}
			)}
		>
			{label}
			{icon && <span>{generateIcon(icon)}</span>}
		</Link>
	);
};

export default GradientLinkBtn;
