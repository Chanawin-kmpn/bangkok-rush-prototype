"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { allSpotsDetailComplete } from "../../../../../data/spotDetails";
import dynamic from "next/dynamic";
import TopRank from "@/app/components/TopRank";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

const Minimap = dynamic(() => import("@/app/components/Minimap"), {
	ssr: false,
});

// Medal components
const GoldCrown = () => (
	<div className="flex items-center justify-center w-16 h-16 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full border-4 border-white shadow-lg">
		<span className="text-2xl">👑</span>
	</div>
);

const SilverCrown = () => (
	<div className="flex items-center justify-center w-14 h-14 bg-gradient-to-b from-gray-300 to-gray-500 rounded-full border-4 border-white shadow-lg">
		<span className="text-xl">👑</span>
	</div>
);

const BronzeCrown = () => (
	<div className="flex items-center justify-center w-12 h-12 bg-gradient-to-b from-amber-600 to-amber-800 rounded-full border-4 border-white shadow-lg">
		<span className="text-lg">👑</span>
	</div>
);

// Club flag component
const ClubFlag = ({ club, rank, isTopThree = false }) => {
	const flagSize = isTopThree ? "w-20 h-24" : "w-14 h-16";
	const textSize = isTopThree ? "text-xs" : "text-xs";

	return (
		<div
			className={`${flagSize} bg-gradient-to-b from-red-500 to-red-700 rounded-t-lg relative shadow-lg`}
		>
			<div className="absolute inset-1 bg-white rounded-sm flex flex-col items-center justify-center p-1">
				<div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
					<span className="text-lg">🏃‍♂️</span>
				</div>
				<div className={`${textSize} font-bold text-center mt-1 text-gray-800`}>
					{club.clubName
						.split(" ")
						.map((word) => word.slice(0, 3))
						.join(" ")}
				</div>
			</div>
			<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-700"></div>
		</div>
	);
};

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
			<div className="h-dvh glassmorphism w-full flex flex-col lg:flex-row">
				<div className="max-lg:max-h-[400px] h-full w-full lg:w-1/2 relative">
					<Image
						src={spot.img}
						fill
						className="object-cover"
						alt="Spot Image"
					/>
				</div>
				<div className="px-4 py-8 lg:px-16 lg:py-20">
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
									"text-success": spot.overview.status === "Available",
									"text-error": spot.overview.status === "Closed",
								})}
							>
								{spot.overview.status}
							</span>
						</div>
					</div>
					{/* Overview */}
					<div></div>
					{/* Description */}
					<p></p>
					{/* MiniMap */}
				</div>
			</div>
			{/* Rank Section */}
			<div></div>
		</div>
	);
};

export default Page;
