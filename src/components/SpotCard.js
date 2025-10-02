import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import SpotOverview from "./SpotOverview";
import GradientLinkBtn from "./GradientLinkBtn";

const SpotCard = ({ spot }) => {
	const { id, name, img, overviews, clubRanking, district } = spot;

	return (
		<div className="bg-white rounded-md lg:rounded-2xl overflow-hidden flex lg:flex-col">
			<div className="relative w-2/4 lg:w-full lg:h-[270px]">
				<Image
					src={img}
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					alt="Spot Image"
					className="object-cover object-[0%_45%]"
				/>
			</div>
			<div className="p-2 max-lg:border max-lg:rounded-r-md w-full space-y-2 lg:space-y-4 lg:p-4">
				<div className="flex justify-between items-center">
					<div className="flex flex-col lg:flex-col-reverse">
						<div className="flex items-center gap-1 text-textGray">
							<MapPin size={12} />
							{district}
						</div>
						<div className="">
							<p className="font-fciconicBW text-sm text-dark! flex flex-col lg:text-lg lg:flex-row lg:items-center lg:gap-2">
								{name}
								<span
									className={cn(
										"font-fciconicBW text-[8px] lg:text-xs leading-3",
										{
											"text-success": overviews.status === "Available",
											"text-error": overviews.status === "Closed",
										}
									)}
								>
									{overviews.status}
								</span>
							</p>
						</div>
					</div>
					<div>
						<span className="text-[2rem] font-fciconicBW">
							#{clubRanking.position}
						</span>
					</div>
				</div>
				<div className="hidden w-full h-[1px] bg-textGray/50 lg:block" />
				<div className="grid grid-cols-3 gap-1 lg:gap-4">
					<SpotOverview
						overviews={[overviews.type, overviews.radius, overviews.area]}
						className="text-[8px] lg:text-xs"
						iconSize={12}
					/>
				</div>
				<div className="flex justify-between items-center mt-auto">
					<div>
						<span className="font-fciconicBW lg:text-2xl">
							{clubRanking.points} km.
						</span>
					</div>
					<div>
						<GradientLinkBtn
							link={`/map/${id}`}
							label="View Detail"
							isGradient
							className="text-[10px] lg:text-base"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SpotCard;
