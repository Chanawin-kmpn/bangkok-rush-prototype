import { cn } from "@/lib/utils";
import { Crown, Users } from "lucide-react";
import Image from "next/image";
import React from "react";

const TopThreeRankBanner = ({ rank }) => {
	const { clubLogo, clubName, crown, leader, members, points, position } = rank;

	return (
		<div
			className={cn("relative flex-1 h-[180px] lg:h-[600px] bg-gradient-to-b", {
				"from-[#E4A82E] to-transparent order-2": position === 1,
				"from-[#BABABA] to-transparent order-1 mt-[30px] lg:mt-[100px]":
					position === 2,
				"from-[#9D4B3A] to-transparent order-3 mt-[60px] lg:mt-[200px]":
					position === 3,
			})}
		>
			<div className="-mt-28 lg:-mt-[400px]">
				<div className="relative size-16 lg:size-64 mx-auto">
					<Image
						src={`/images/crowns/${crown}.png`}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						alt={`${crown} crown`}
					/>
				</div>
			</div>
			<div className="">
				<div className="relative w-full h-[150px] lg:h-[500px]">
					<Image
						src={clubLogo}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						alt={`${clubName} logo`}
						className="object-contain"
					/>
				</div>
			</div>

			<div className="text-center">
				<span
					className={cn("text-7xl font-fciconicBW lg:text-[250px]", {
						"text-[#E4A82E]/50": position === 1,
						"text-[#BABABA]/50": position === 2,
						"text-[#9D4B3A]/50": position === 3,
					})}
				>
					{position}
				</span>
			</div>
			<div className="absolute bottom-0 w-full text-center space-y-4">
				<p className="font-fciconicBW text-dark! text-xs lg:text-4xl">
					{clubName}
				</p>
				<span
					className={cn("font-fciconicBW text-xl lg:text-6xl", {
						"text-[#BD851F]": position === 1,
						"text-[#82827D]": position === 2,
						"text-[#704226]": position === 3,
					})}
				>
					{points}
				</span>
				<div className="mt-4">
					<div className="flex gap-4 items-center mt-0.5 justify-between">
						<div className="flex gap-1 items-center text-[8px] lg:text-xs font-fciconicBW text-dark/50">
							<Users className="text-primary size-3 lg:size-4" />
							{members}
						</div>
						<div className="flex gap-1 items-center text-[8px] lg:text-xs font-fciconicBW text-dark/50">
							<Crown className="text-yellow size-3 lg:size-4" />
							{leader}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TopThreeRankBanner;
