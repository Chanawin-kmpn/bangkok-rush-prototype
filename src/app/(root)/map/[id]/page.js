"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import { allSpotsDetailComplete } from "../../../../../data/spotDetails";
import dynamic from "next/dynamic";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MapPin, Calendar } from "lucide-react";
import SpotOverview from "@/components/SpotOverview";
import { useQuarters } from "../../../../../context/QuartersContext";
import DropdownButton from "@/components/DropdownButton";
import { quarterOptions } from "../../../../../constants";
import SpotDetailSkeleton from "@/components/skeletons/SpotDetailSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load heavy components
const Minimap = dynamic(() => import("@/components/Minimap"), {
	ssr: false,
	loading: () => <Skeleton className="h-80 w-full rounded-lg" />,
});

const RankingLeaderboard = dynamic(
	() => import("@/components/RankingLeaderboard"),
	{
		ssr: false,
		loading: () => (
			<div className="space-y-10">
				<div className="flex justify-center gap-3 lg:gap-10">
					{[...Array(3)].map((_, i) => (
						<Skeleton key={i} className="w-20 h-64 lg:w-32 lg:h-80" />
					))}
				</div>
				<div className="space-y-3 lg:space-y-12">
					{[...Array(7)].map((_, i) => (
						<Skeleton key={i} className="h-16 w-full rounded-2xl" />
					))}
				</div>
			</div>
		),
	}
);

const Page = () => {
	const { currentQuarter } = useQuarters();
	const [spot, setSpot] = useState(null);
	const [initialQuarter, setInitialQuarter] = useState(currentQuarter);
	const [rankings, setRankings] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();

	const quarters = ["Jan - Mar", "Apr - Jun", "Jul - Sep", "Oct - Dec"];

	const getSpotDetailFromId = async (id) => {
		setIsLoading(true);
		// Simulate async data fetching
		await new Promise((resolve) => setTimeout(resolve, 300));

		const spotData = Object.values(allSpotsDetailComplete).find(
			(spot) => spot.id === id
		);
		setSpot(spotData);
		setIsLoading(false);
	};

	const getSpotRanking = (spot, selectedQuarter) => {
		if (!spot?.quarterlyRankings) return [];
		return spot.quarterlyRankings[selectedQuarter] || [];
	};

	const handleQuarterChange = (newQuarter) => {
		setInitialQuarter(newQuarter);
	};

	useEffect(() => {
		getSpotDetailFromId(id);
	}, [id]);

	useEffect(() => {
		if (spot) {
			const currentRankings = getSpotRanking(spot, initialQuarter);
			setRankings(currentRankings);
		}
	}, [spot, initialQuarter]);

	if (isLoading || !spot) {
		return <SpotDetailSkeleton />;
	}

	return (
		<div className="space-y-8 lg:space-y-16">
			{/* Detail Section */}
			<Suspense fallback={<SpotDetailSkeleton />}>
				<div className="w-full flex flex-col lg:flex-row glassmorphism rounded-[40px] overflow-hidden">
					<div className="max-lg:min-h-[400px] lg:h-[960px] w-full lg:w-1/2 relative">
						<Image
							src={spot.img}
							fill
							className="object-cover max-lg:rounded-t-[40px]"
							alt="Spot Image"
							priority
						/>
					</div>
					<div className="px-4 py-8 lg:px-16 lg:py-20 space-y-4 lg:w-1/2">
						{/* Detail Header */}
						<div>
							<h1 className="text-[2rem] lg:text-[2.5rem]">{spot.name}</h1>
							<div className="mt-2 flex gap-2">
								<div className="flex gap-1 text-textGray items-center">
									<MapPin size={16} />
									<span>{spot.district}</span>
								</div>
								<span
									className={cn("font-fciconicBW", {
										"text-success": spot.overviews.status === "Available",
										"text-error": spot.overviews.status === "Closed",
									})}
								>
									{spot.overviews.status}
								</span>
							</div>
						</div>
						{/* Overview */}
						<div className="grid grid-cols-3 gap-2 justify-between w-full lg:gap-4 lg:w-fit">
							<SpotOverview
								overviews={[
									spot.overviews.type,
									spot.overviews.radius,
									spot.overviews.area,
								]}
							/>
						</div>
						{/* Description */}
						<p>{spot.description}</p>
						{/* MiniMap */}
						<Suspense
							fallback={<Skeleton className="h-80 w-full rounded-lg" />}
						>
							<div className="h-80 rounded-lg overflow-hidden">
								<Minimap
									lat={spot.coordinates.lat}
									lng={spot.coordinates.lng}
									radius={spot.overviews.radius}
								/>
							</div>
						</Suspense>
					</div>
				</div>
			</Suspense>

			{/* Rank Section */}
			<div className="space-y-8 lg:space-y-16">
				{/* Quarter Selector */}
				<div>
					{/* Desktop Selector */}
					<div className="lg:flex justify-center items-center gap-10 hidden">
						{quarters.map((quarter, index) => (
							<button
								key={index}
								className={cn(
									"font-fciconicBW text-textGray text-[32px] cursor-pointer transition-colors duration-200 hover:text-secondery",
									{
										"text-secondery": initialQuarter === quarter,
									}
								)}
								onClick={() => setInitialQuarter(quarter)}
							>
								{quarter}
							</button>
						))}
					</div>

					{/* Mobile Selector */}
					<div className="lg:hidden flex justify-start">
						<DropdownButton
							label={`Quarter: ${initialQuarter}`}
							icon={<Calendar size={14} />}
							options={quarterOptions}
							value={initialQuarter}
							onChange={handleQuarterChange}
							dropdownTitle="Select Quarter"
							showReset={false}
							minWidth="220px"
							className="w-full max-w-xs"
						/>
					</div>
				</div>

				{/* Ranking leaderboard with Suspense */}
				<Suspense
					fallback={
						<div className="lg:mt-[400px] mt-32">
							<Skeleton className="h-96 w-full" />
						</div>
					}
				>
					<div className="lg:mt-[400px] mt-32">
						<RankingLeaderboard rankings={rankings} key={initialQuarter} />
					</div>
				</Suspense>
			</div>
		</div>
	);
};

export default Page;
