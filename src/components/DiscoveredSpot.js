"use client";
import React, { useState } from "react";
import { sunriseSquadClub } from "../../data/clubData";
import SpotCard from "./SpotCard";
import { allSpotsDetailComplete } from "../../data/spotDetails";
import { ListFilter } from "lucide-react";
import { useQuarters } from "../../context/QuartersContext";
import DropdownButton from "./DropdownButton";
import PaginationControls from "./PaginationControls";
import { filterOptions } from "../../constants";

const DiscoveredSpot = () => {
	const { currentQuarter } = useQuarters();
	const [visibleCount, setVisibleCount] = useState(6);
	const [sortBy, setSortBy] = useState("default");

	const INITIAL_COUNT = 6;
	const LOAD_MORE_COUNT = 6;

	const handleSortChange = (newSortBy) => {
		setSortBy(newSortBy);
		setVisibleCount(INITIAL_COUNT); // Reset pagination
	};

	const discoveredSpotsDetails = () => {
		const spots = sunriseSquadClub.discoveredSpots
			.map((spotId) => {
				const fullSpot = Object.values(allSpotsDetailComplete).find(
					(spot) => spot.id === spotId
				);

				if (!fullSpot) {
					console.warn(`Spot with id ${spotId} not found`);
					return null;
				}

				const quarterlyRankings =
					fullSpot.quarterlyRankings?.[currentQuarter] || [];
				const sunriseSquadRanking = quarterlyRankings.find(
					(club) => club.clubName === "Sunrise Squad"
				);

				return {
					id: fullSpot.id,
					name: fullSpot.name,
					district: fullSpot.district,
					img: fullSpot.img,
					overviews: fullSpot.overviews,
					clubRanking: sunriseSquadRanking
						? {
								position: sunriseSquadRanking.position,
								points: sunriseSquadRanking.points,
								crown: sunriseSquadRanking.crown,
								leader: sunriseSquadRanking.leader,
								members: sunriseSquadRanking.members,
						  }
						: null,
				};
			})
			.filter(Boolean);

		return sortSpots(spots);
	};

	const sortSpots = (spots) => {
		const sortedSpots = [...spots];

		switch (sortBy) {
			case "position-asc":
				return sortedSpots.sort((a, b) => {
					const posA = a.clubRanking?.position || 999;
					const posB = b.clubRanking?.position || 999;
					return posA - posB;
				});

			case "position-desc":
				return sortedSpots.sort((a, b) => {
					const posA = a.clubRanking?.position || 0;
					const posB = b.clubRanking?.position || 0;
					return posB - posA;
				});

			case "score-asc":
				return sortedSpots.sort((a, b) => {
					const scoreA = a.clubRanking?.points || 0;
					const scoreB = b.clubRanking?.points || 0;
					return scoreA - scoreB;
				});

			case "score-desc":
				return sortedSpots.sort((a, b) => {
					const scoreA = a.clubRanking?.points || 0;
					const scoreB = b.clubRanking?.points || 0;
					return scoreB - scoreA;
				});

			default:
				return sortedSpots;
		}
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
		<div className="flex flex-col gap-4 lg:gap-8">
			<div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
				<div>
					<h1 className="text-4xl">
						Discovered
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-secondery to-primary">
							{" "}
							Spot
						</span>
					</h1>
					<p className="mt-3">
						Explore strategic spots and compete to conquer key areas in the
						city.
					</p>
				</div>

				{/* Reusable Dropdown Button */}
				<DropdownButton
					label="Filters"
					icon={<ListFilter size={12} />}
					options={filterOptions}
					value={sortBy}
					onChange={handleSortChange}
					dropdownTitle="Sort By"
					showReset={true}
					resetLabel="Reset to Default"
					defaultValue="default"
					minWidth="240px"
				/>
			</div>

			{/* Active Filter Badge */}
			<div className="h-7">
				{sortBy !== "default" && (
					<div className="flex items-center gap-2 text-sm">
						<span className="text-gray-600">Sorted by:</span>
						<span className="px-3 py-1 bg-gradient-to-r from-secondery/10 to-primary/10 text-primary rounded-full font-medium">
							{filterOptions.find((opt) => opt.value === sortBy)?.label}
						</span>
					</div>
				)}
			</div>

			<div>
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-16">
					{visibleSpots.map((spot) => (
						<div key={spot.id}>
							<SpotCard spot={spot} />
						</div>
					))}
				</div>

				{/* Pagination Controls */}
				<PaginationControls
					visibleCount={visibleCount}
					totalCount={allSpots.length}
					initialCount={INITIAL_COUNT}
					hasMore={hasMoreSpots}
					onShowMore={handleShowMore}
					onShowLess={handleShowLess}
					itemLabel="spots"
				/>
			</div>
		</div>
	);
};

export default DiscoveredSpot;
