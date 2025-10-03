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
				"w-full flex justify-between items-center bg-gradient-to-r to-70% rounded-[10px] text-dark px-2 py-1 from-[#7A01D0]/10 to-transparent shadow-md lg:px-8 lg:py-4",
				{
					"px-2! py-1! to-white": isPopup,
					"from-[#E4A82E]/80": position === 1 && isPopup,
					"from-[#BABABA]/80": position === 2 && isPopup,
					"from-[#9D4B3A]/80": position === 3 && isPopup,
				}
			)}
		>
			<div className="flex gap-2 justify-between items-center">
				<p
					className={cn(
						"font-fciconicBW text-center text-primary! text-lg lg:text-[64px] w-9 lg:w-[125px]",
						{
							"w-9! text-3xl!": isPopup,
						}
					)}
				>
					{position}
				</p>
				<div className="w-full flex items-center">
					<div
						className={cn("relative size-[50px] lg:size-[150px]", {
							"size-[50px]!": isPopup,
						})}
					>
						<Image
							src={clubLogo}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							alt="club-logo"
							className="object-contain"
						/>
					</div>
					<div className="">
						<p
							className={cn(
								"font-fciconicBW text-sm text-dark! lg:text-[40px]",
								{
									"text-sm!": isPopup,
								}
							)}
						>
							{clubName}
						</p>
						<div className="flex gap-4 items-center mt-0.5">
							<div
								className={cn(
									"flex gap-1 lg:gap-2 items-center text-xs lg:text-lg font-fciconicBW text-dark/50",
									{
										"text-xs!": isPopup,
									}
								)}
							>
								<Users
									className={cn("text-primary size-4 lg:size-8", {
										"size-4!": isPopup,
									})}
								/>
								{members}
							</div>
							<div
								className={cn(
									"flex gap-1 lg:gap-2 items-center text-xs lg:text-lg font-fciconicBW text-dark/50",
									{
										"text-xs!": isPopup,
									}
								)}
							>
								<Crown
									className={cn("text-yellow size-4 lg:size-8", {
										"size-4!": isPopup,
									})}
								/>
								{leader}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-clip-text bg-gradient-to-r from-secondery to-primary">
				<span
					className={cn(
						"font-fciconicBW text-transparent text-base lg:text-[32px]",
						{
							"text-base!": isPopup,
						}
					)}
				>
					{points}
				</span>
			</div>
		</div>
	);
};

export default ScoreBar;
