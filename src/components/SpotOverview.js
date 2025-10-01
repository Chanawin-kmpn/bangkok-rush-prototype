import { LandPlot, Radius, Tag, Swords } from "lucide-react";
import React from "react";

const SpotOverview = ({ overviews }) => {
	const iconIndex = [
		<Tag key="tag" />,
		<Radius key="radius" />,
		<LandPlot key="landplot" />,
	];
	return (
		<>
			{overviews.map((detail, index) => (
				<div
					key={index}
					className="flex justify-between font-fciconicBW text-textGray basis-[150px] flex-1 shrink border border-textGray/20 px-2 py-1 rounded-sm text-nowrap lg:basis-auto"
				>
					<span className="text-secondery/50">{iconIndex[index]}</span>
					{detail}
				</div>
			))}
		</>
	);
};

export default SpotOverview;
