"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { allSpotsDetailComplete } from "../../../../../data/spotDetails";
import dynamic from "next/dynamic";
import TopRank from "@/components/TopRank";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import SpotOverview from "@/components/SpotOverview";

const Minimap = dynamic(() => import("@/components/Minimap"), {
	ssr: false,
});

const Page = () => {
	const [spot, setSpot] = useState(null);
	const [quarter, setQuarter] = useState("Jul - Sep");
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

	useEffect(() => {
		getSpotDetailFromId(id);
	}, [id]);

	useEffect(() => {
		if (spot) {
			const currentRankings = getSpotRanking(spot, quarter);
			setRankings(currentRankings);
		}
	}, [spot, quarter]);

	if (!spot) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
				<div className="text-lg text-gray-600">Loading...</div>
			</div>
		);
	}

	const topThree = rankings.slice(0, 3);

	return (
		<div className="space-y-8 lg:space-y-16">
			{/* Detail Section */}
			<div className="glassmorphism w-full flex flex-col rounded-[40px] overflow-hidden lg:flex-row">
				<div className="max-lg:min-h-[400px] lg:h-[960px] w-full lg:w-1/2 relative">
					<Image
						src={spot.img}
						fill
						className="object-cover"
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
								className={cn("font-fciconicBW ", {
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
			<div></div>
		</div>
	);
};

export default Page;
