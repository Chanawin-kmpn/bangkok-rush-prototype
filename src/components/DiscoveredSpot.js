"use client";
import React, { useState } from "react";
import { sunriseSquadClub } from "../../data/clubData";
import SpotCard from "./SpotCard";
import { allSpotsDetailComplete } from "../../data/spotDetails";
import Button from "./Button";
import { ListFilter } from "lucide-react";
import { useQuarters } from "../../context/QuartersContext";

const DiscoveredSpot = () => {
	const { currentQuarter } = useQuarters();
	const [visibleCount, setVisibleCount] = useState(6); // เริ่มต้นแสดง 6 รายการ
	const INITIAL_COUNT = 6;
	const LOAD_MORE_COUNT = 6;

	const discoveredSpotsDetails = () => {
		return sunriseSquadClub.discoveredSpots
			.map((spotId) => {
				const fullSpot = Object.values(allSpotsDetailComplete).find(
					(spot) => spot.id === spotId
				);

				if (!fullSpot) {
					console.warn(`Spot with id ${spotId} not found`);
					return null;
				}

				// ดึงข้อมูล ranking ของ Sunrise Squad ใน current quarter
				const quarterlyRankings =
					fullSpot.quarterlyRankings?.[currentQuarter] || [];
				const sunriseSquadRanking = quarterlyRankings.find(
					(club) => club.clubName === "Sunrise Squad"
				);

				// Return เฉพาะข้อมูลที่จำเป็น
				return {
					id: fullSpot.id,
					name: fullSpot.name,
					district: fullSpot.district,
					img: fullSpot.img,
					overviews: fullSpot.overviews,
					// ข้อมูล club performance ใน current quarter
					clubRanking: sunriseSquadRanking
						? {
								position: sunriseSquadRanking.position,
								points: sunriseSquadRanking.points,
								crown: sunriseSquadRanking.crown,
								leader: sunriseSquadRanking.leader,
								members: sunriseSquadRanking.members,
						  }
						: null,
					// ข้อมูลเพิ่มเติมที่อาจจำเป็น
				};
			})
			.filter(Boolean); // Remove null values
	};

	const allSpots = discoveredSpotsDetails();
	const visibleSpots = allSpots.slice(0, visibleCount);
	const hasMoreSpots = visibleCount < allSpots.length;

	const handleShowMore = () => {
		setVisibleCount((prev) =>
			Math.min(prev + LOAD_MORE_COUNT, allSpots.length)
		);
	};

	const handleShowLess = () => {
		setVisibleCount(INITIAL_COUNT);
	};

	// Loading state
	if (!allSpots.length) {
		return (
			<div className="text-center py-12">
				<div className="text-gray-500">
					<div className="text-lg font-medium">No discovered spots yet</div>
					<div className="text-sm">Start exploring to discover new spots!</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-12 lg:gap-20">
			<div className="flex flex-col lg:flex-row justify-between lg:items-center">
				<div>
					<h1 className="text-4xl">
						Discovered
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-secondery to-primary">
							Spot
						</span>
					</h1>
					<p className="mt-3">
						Explore strategic spots and compete to conquer key areas in the
						city.
					</p>
				</div>
				<Button label="Filters" icon={<ListFilter size={12} />} />
			</div>
			<div>
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-16">
					{visibleSpots.map((spot) => (
						<SpotCard key={spot.id} spot={spot} />
					))}
				</div>

				{hasMoreSpots && (
					<div className="text-center pt-8 self-center">
						<Button
							className="mx-auto"
							label="Show More"
							onClick={handleShowMore}
						/>
						<div className="mt-3 text-sm text-gray-500">
							Showing {visibleCount} of {allSpots.length} spots
						</div>
					</div>
				)}

				{/* All Loaded State */}
				{!hasMoreSpots && allSpots.length > INITIAL_COUNT && (
					<div className="text-center pt-8 self-center">
						{visibleCount > INITIAL_COUNT && (
							<Button
								className="mx-auto"
								label="Show Less"
								onClick={handleShowLess}
							/>
						)}
						<div className="mt-2 text-sm text-gray-500">
							You&apos;ve seen all {allSpots.length} discovered spots
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default DiscoveredSpot;
