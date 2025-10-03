"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { allSpotsDetailComplete } from "../../../../../data/spotDetails";
import dynamic from "next/dynamic";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MapPin, Calendar } from "lucide-react";
import SpotOverview from "@/components/SpotOverview";
import { useQuarters } from "../../../../../context/QuartersContext";
import RankingLeaderboard from "@/components/RankingLeaderboard";
import DropdownButton from "@/components/DropdownButton";
import { quarterOptions } from "../../../../../constants";

const Minimap = dynamic(() => import("@/components/Minimap"), {
	ssr: false,
});

const Page = () => {
	const { currentQuarter } = useQuarters();
	const [spot, setSpot] = useState(null);
	const [initialQuarter, setInitialQuarter] = useState(currentQuarter);
	const [rankings, setRankings] = useState([]);
	const { id } = useParams();

	const quarters = ["Jan - Mar", "Apr - Jun", "Jul - Sep", "Oct - Dec"];

	const getSpotDetailFromId = (id) => {
		const spotData = Object.values(allSpotsDetailComplete).find(
			(spot) => spot.id === id
		);
		setSpot(spotData);
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

	if (!spot) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
				<div className="text-lg text-gray-600">Loading...</div>
			</div>
		);
	}

	return (
		<div className="space-y-8 lg:space-y-16">
			{/* Detail Section */}
			<div className="w-full flex flex-col lg:flex-row glassmorphism rounded-[40px] overflow-hidden">
				<div className="max-lg:min-h-[400px] lg:h-[960px] w-full lg:w-1/2 relative">
					<Image
						src={spot.img}
						fill
						className="object-cover max-lg:rounded-t-[40px]"
						alt="Spot Image"
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
					<div className="h-80 rounded-lg overflow-hidden">
						<Minimap
							lat={spot.coordinates.lat}
							lng={spot.coordinates.lng}
							radius={spot.overviews.radius}
						/>
					</div>
				</div>
			</div>

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

				{/* Ranking leaderboard */}
				<div className="lg:mt-[400px] mt-32">
					<RankingLeaderboard rankings={rankings} />
				</div>
			</div>
		</div>
	);
};

export default Page;
