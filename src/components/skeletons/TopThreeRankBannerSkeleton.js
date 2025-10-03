import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const TopThreeRankBannerSkeleton = ({ position }) => {
	// สี gradient ตาม position
	const gradientColors = {
		1: "from-[#E4A82E]/20 to-transparent",
		2: "from-[#BABABA]/20 to-transparent",
		3: "from-[#9D4B3A]/20 to-transparent",
	};

	// ความสูงและ margin ตาม position
	const heightClasses = {
		1: "h-[180px] lg:h-[600px] order-2",
		2: "h-[180px] lg:h-[600px] order-1 mt-[30px] lg:mt-[100px]",
		3: "h-[180px] lg:h-[600px] order-3 mt-[60px] lg:mt-[200px]",
	};

	return (
		<div
			className={cn(
				"relative flex-1 bg-gradient-to-b rounded-2xl overflow-hidden",
				gradientColors[position],
				heightClasses[position]
			)}
		>
			{/* Crown Skeleton */}
			<div className="-mt-28 lg:-mt-[400px]">
				<Skeleton className="size-16 lg:size-64 mx-auto rounded-full" />
			</div>

			{/* Club Logo Skeleton */}
			<div className="relative w-full h-[150px] lg:h-[500px] flex items-center justify-center px-4">
				<Skeleton className="w-3/4 h-3/4 rounded-2xl" />
			</div>

			{/* Position Number Background */}
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
				<Skeleton className="w-20 h-24 lg:w-40 lg:h-48 rounded-3xl opacity-20" />
			</div>

			{/* Bottom Info Section */}
			<div className="absolute bottom-0 w-full text-center space-y-1 lg:space-y-4 pb-2 lg:pb-4">
				{/* Club Name */}
				<div className="flex justify-center">
					<Skeleton className="h-3 lg:h-8 w-24 lg:w-40 rounded-full" />
				</div>

				{/* Points */}
				<div className="flex justify-center">
					<Skeleton className="h-5 lg:h-12 w-16 lg:w-32 rounded-full" />
				</div>

				{/* Members & Leader Info */}
				<div className="flex gap-4 items-center justify-between px-4 mt-1 lg:mt-4">
					{/* Members */}
					<div className="flex gap-1 items-center">
						<Skeleton className="size-3 lg:size-8 rounded-full" />
						<Skeleton className="h-2 lg:h-4 w-8 lg:w-16 rounded-full" />
					</div>

					{/* Leader */}
					<div className="flex gap-1 items-center">
						<Skeleton className="size-3 lg:size-8 rounded-full" />
						<Skeleton className="h-2 lg:h-4 w-12 lg:w-20 rounded-full" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default TopThreeRankBannerSkeleton;
