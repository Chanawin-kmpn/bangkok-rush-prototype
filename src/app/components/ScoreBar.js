import { cn } from "@/lib/utils";
import { Crown, Users } from "lucide-react";
import Image from "next/image";
import React from "react";

const ScoreBar = ({
	clubLogo,
	clubName,
	crown,
	leader,
	members,
	points,
	position,
	isPopup = false,
}) => {
	return (
		<div
			className={cn(
				"w-full flex justify-between items-center bg-gradient-to-r to-70% rounded-[10px] text-dark px-2 py-1 from-[#7A01D0]/10 to-white lg:px-8 lg:py-4",
				{
					"px-2! py-1!": isPopup,
					"from-[#E4A82E]/80": position === 1 && isPopup,
					"from-[#BABABA]/80": position === 2 && isPopup,
					"from-[#9D4B3A]/80": position === 3 && isPopup,
				}
			)}
		>
			<div className="flex gap-2 justify-between items-center">
				<p
					className={cn(
						"font-fciconicBW text-center text-primary! text-lg w-9 lg:w-[125px]",
						{
							"w-9!": isPopup,
						}
					)}
				>
					{position}
				</p>
				<div className="w-full flex items-center">
					<div className="relative size-[50px]">
						<Image
							src={clubLogo}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							alt="club-logo"
							className="object-contain"
						/>
					</div>
					<div className="">
						<p className="font-fciconicBW text-sm text-dark!">{clubName}</p>
						<div className="flex gap-4 items-center mt-0.5">
							<div className="flex gap-1 items-center text-xs font-fciconicBW text-dark/50">
								<Users size={16} className="text-primary" />
								{members}
							</div>
							<div className="flex gap-1 items-center text-xs font-fciconicBW text-dark/50">
								<Crown size={16} className="text-yellow" />
								{leader}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-clip-text bg-gradient-to-r from-primary to-secondery">
				<span className="font-fciconicBW text-transparent text-sm">
					{points}
				</span>
			</div>
		</div>
	);
};

export default ScoreBar;
