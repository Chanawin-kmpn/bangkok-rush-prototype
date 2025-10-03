import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import TopThreeRankBannerSkeleton from "./TopThreeRankBannerSkeleton";

const SpotDetailSkeleton = () => {
	return (
		<div className="space-y-8 lg:space-y-16 animate-in fade-in duration-500">
			{/* Detail Section Skeleton */}
			<div className="w-full flex flex-col lg:flex-row glassmorphism rounded-[40px] overflow-hidden">
				{/* Image Skeleton */}
				<div className="max-lg:min-h-[400px] lg:h-[960px] w-full lg:w-1/2">
					<Skeleton className="w-full h-full max-lg:rounded-t-[40px]" />
				</div>

				{/* Content Skeleton */}
				<div className="px-4 py-8 lg:px-16 lg:py-20 space-y-4 lg:w-1/2">
					{/* Header Skeleton */}
					<div className="space-y-2">
						<Skeleton className="h-10 lg:h-12 w-3/4" />
						<div className="flex gap-2">
							<Skeleton className="h-5 w-32" />
							<Skeleton className="h-5 w-20" />
						</div>
					</div>

					{/* Overview Cards Skeleton */}
					<div className="grid grid-cols-3 gap-2 lg:gap-4">
						{[...Array(3)].map((_, index) => (
							<div
								key={index}
								className="flex border border-textGray/50 gap-2 rounded-2xl p-3 lg:p-4"
							>
								<Skeleton className="h-6 w-6 rounded-lg mx-auto" />
								<Skeleton className="h-6 w-full rounded-lg" />
							</div>
						))}
					</div>

					{/* Description Skeleton */}
					<div className="space-y-2 pt-2">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-3/4" />
						<Skeleton className="h-4 w-5/6" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-2/3" />
					</div>

					{/* MiniMap Skeleton */}
					<div className="pt-2">
						<Skeleton className="h-80 w-full rounded-lg" />
					</div>
				</div>
			</div>

			{/* Rank Section Skeleton */}
			<div className="space-y-8 lg:space-y-16">
				{/* Quarter Selector Skeleton */}
				<div>
					{/* Desktop */}
					<div className="lg:flex justify-center items-center gap-10 hidden">
						{[...Array(4)].map((_, index) => (
							<Skeleton key={index} className="h-10 w-32 rounded-lg" />
						))}
					</div>

					{/* Mobile */}
					<div className="lg:hidden flex justify-start">
						<Skeleton className="h-12 w-full max-w-xs rounded-lg" />
					</div>
				</div>

				{/* Ranking Skeleton */}
				<div className="lg:mt-[200px] mt-32 space-y-10">
					{/* Top 3 Skeleton - Using improved component */}
					<div className="flex justify-center gap-3 lg:gap-10">
						<TopThreeRankBannerSkeleton position={2} />
						<TopThreeRankBannerSkeleton position={1} />
						<TopThreeRankBannerSkeleton position={3} />
					</div>

					{/* Rest Rankings Skeleton */}
					<div className="space-y-3 lg:space-y-12">
						{[...Array(7)].map((_, index) => (
							<RankingBarSkeleton key={index} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

// Ranking Bar Skeleton (improved)
const RankingBarSkeleton = () => {
	return (
		<div className="flex items-center gap-3 lg:gap-6 p-3 lg:p-6 glassmorphism rounded-2xl lg:rounded-[32px]">
			{/* Position */}
			<Skeleton className="w-8 h-8 lg:w-12 lg:h-12 rounded-lg flex-shrink-0" />

			{/* Club Logo */}
			<Skeleton className="w-10 h-10 lg:w-16 lg:h-16 rounded-lg flex-shrink-0" />

			{/* Club Info */}
			<div className="flex-1 space-y-2">
				<Skeleton className="h-4 lg:h-6 w-32 lg:w-48 rounded-full" />
				<div className="flex gap-3">
					<Skeleton className="h-3 lg:h-4 w-20 lg:w-32 rounded-full" />
					<Skeleton className="h-3 lg:h-4 w-24 lg:w-36 rounded-full" />
				</div>
			</div>

			{/* Points */}
			<Skeleton className="h-8 lg:h-10 w-16 lg:w-24 rounded-full flex-shrink-0" />
		</div>
	);
};

export default SpotDetailSkeleton;
