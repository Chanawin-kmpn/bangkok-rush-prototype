import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import TopThreeRankBannerSkeleton from "./TopThreeRankBannerSkeleton";

const RankingLeaderboardSkeleton = ({ showTopThree = true, rankCount = 7 }) => {
	return (
		<div className="space-y-10 animate-in fade-in duration-500">
			{/* Top 3 Rankings Skeleton */}
			{showTopThree && (
				<div className="flex justify-center gap-3 lg:gap-10">
					<TopThreeRankBannerSkeleton position={2} />
					<TopThreeRankBannerSkeleton position={1} />
					<TopThreeRankBannerSkeleton position={3} />
				</div>
			)}

			{/* Rest of Rankings Skeleton */}
			<div className="space-y-3 lg:space-y-12">
				{[...Array(rankCount)].map((_, index) => (
					<RankingBarSkeleton key={index} position={index + 4} />
				))}
			</div>

			{/* Pagination Skeleton */}
			<div className="text-center pt-8 space-y-3">
				<Skeleton className="h-12 w-32 mx-auto rounded-full" />
				<Skeleton className="h-4 w-48 mx-auto rounded-full" />
			</div>
		</div>
	);
};

// Ranking Bar Skeleton
const RankingBarSkeleton = ({ position }) => {
	return (
		<div className="flex items-center gap-3 lg:gap-6 p-3 lg:p-6 glassmorphism rounded-2xl lg:rounded-[32px]">
			{/* Position Badge */}
			<div className="relative flex-shrink-0">
				<Skeleton className="w-8 h-8 lg:w-12 lg:h-12 rounded-full" />
				{position && (
					<div className="absolute inset-0 flex items-center justify-center">
						<span className="text-xs lg:text-sm text-gray-400 font-fciconicBW">
							{position}
						</span>
					</div>
				)}
			</div>

			{/* Club Logo */}
			<Skeleton className="w-10 h-10 lg:w-16 lg:h-16 rounded-lg flex-shrink-0" />

			{/* Club Info */}
			<div className="flex-1 space-y-2">
				<Skeleton className="h-4 lg:h-6 w-32 lg:w-48 rounded-full" />
				<div className="flex gap-3">
					{/* Members */}
					<div className="flex items-center gap-1">
						<Skeleton className="w-3 h-3 lg:w-4 lg:h-4 rounded-full" />
						<Skeleton className="h-3 lg:h-4 w-16 lg:w-24 rounded-full" />
					</div>
					{/* Leader */}
					<div className="flex items-center gap-1">
						<Skeleton className="w-3 h-3 lg:w-4 lg:h-4 rounded-full" />
						<Skeleton className="h-3 lg:h-4 w-20 lg:w-28 rounded-full" />
					</div>
				</div>
			</div>

			{/* Points Badge */}
			<Skeleton className="h-8 lg:h-10 w-16 lg:w-24 rounded-full flex-shrink-0" />
		</div>
	);
};

export { RankingLeaderboardSkeleton, RankingBarSkeleton };
export default RankingLeaderboardSkeleton;
