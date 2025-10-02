import { LandPlot, Radius, Tag, Swords } from "lucide-react";
import React from "react";

const SpotOverview = ({ overviews, className, iconSize = 24 }) => {
	const iconIndex = [
		<Tag key="tag" size={iconSize} />,
		<Radius key="radius" size={iconSize} />,
		<LandPlot key="landplot" size={iconSize} />,
	];
	return (
		<>
			{overviews.map((detail, index) => (
				<div
					key={index}
					className={`${className} flex justify-between items-center font-fciconicBW text-textGray basis-[150px] flex-1 shrink border border-textGray/20 px-2 py-1 rounded-sm text-nowrap lg:basis-auto`}
				>
					<span className="text-secondery/50">{iconIndex[index]}</span>
					{detail}
				</div>
			))}
		</>
	);
};

export default SpotOverview;
