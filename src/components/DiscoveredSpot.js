"use client";
import React, { useState, useRef } from "react";
import { sunriseSquadClub } from "../../data/clubData";
import SpotCard from "./SpotCard";
import { allSpotsDetailComplete } from "../../data/spotDetails";
import Button from "./Button";
import { ListFilter, Check } from "lucide-react";
import { useQuarters } from "../../context/QuartersContext";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const DiscoveredSpot = () => {
	const { currentQuarter } = useQuarters();
	const [visibleCount, setVisibleCount] = useState(6);
	const [sortBy, setSortBy] = useState("default"); // default, position-asc, position-desc, score-asc, score-desc
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [isFilterVisible, setIsFilterVisible] = useState(false);

	const INITIAL_COUNT = 6;
	const LOAD_MORE_COUNT = 6;

	const filterDropdownRef = useRef(null);
	const filterTl = useRef(null);

	// GSAP Animation for Filter Dropdown
	useGSAP(() => {
		if (filterDropdownRef.current) {
			filterTl.current = gsap.timeline({ paused: true });

			gsap.set(filterDropdownRef.current, {
				y: -20,
				opacity: 0,
				scale: 0.95,
			});

			filterTl.current.to(filterDropdownRef.current, {
				y: 0,
				opacity: 1,
				scale: 1,
				duration: 0.3,
				ease: "back.out(1.7)",
			});
		}
	}, [isFilterVisible]);

	const handleFilterToggle = () => {
		if (!isFilterOpen) {
			setIsFilterVisible(true);
			setIsFilterOpen(true);
			setTimeout(() => {
				if (filterTl.current) filterTl.current.play();
			}, 10);
		} else {
			handleFilterClose();
		}
	};

	const handleFilterClose = () => {
		if (filterTl.current) {
			filterTl.current.reverse();
			filterTl.current.eventCallback("onReverseComplete", () => {
				setIsFilterOpen(false);
				setIsFilterVisible(false);
			});
		}
	};

	const handleSortChange = (newSortBy) => {
		setSortBy(newSortBy);
		setVisibleCount(INITIAL_COUNT); // Reset pagination
		handleFilterClose();
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

		// Apply sorting
		return sortSpots(spots);
	};

	const sortSpots = (spots) => {
		const sortedSpots = [...spots];

		switch (sortBy) {
			case "position-asc":
				return sortedSpots.sort((a, b) => {
					const posA = a.clubRanking?.position || 999;
					const posB = b.clubRanking?.position || 999;
					return posA - posB; // Best position first (1, 2, 3...)
				});

			case "position-desc":
				return sortedSpots.sort((a, b) => {
					const posA = a.clubRanking?.position || 0;
					const posB = b.clubRanking?.position || 0;
					return posB - posA; // Worst position first
				});

			case "score-asc":
				return sortedSpots.sort((a, b) => {
					const scoreA = a.clubRanking?.points || 0;
					const scoreB = b.clubRanking?.points || 0;
					return scoreA - scoreB; // Lowest score first
				});

			case "score-desc":
				return sortedSpots.sort((a, b) => {
					const scoreA = a.clubRanking?.points || 0;
					const scoreB = b.clubRanking?.points || 0;
					return scoreB - scoreA; // Highest score first
				});

			default:
				return sortedSpots; // Original order
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

	// Filter options
	const filterOptions = [
		{ value: "default", label: "Default Order" },
		{ value: "position-asc", label: "Best Position First" },
		{ value: "position-desc", label: "Worst Position First" },
		{ value: "score-desc", label: "Highest Score First" },
		{ value: "score-asc", label: "Lowest Score First" },
	];

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

				{/* Filter Button with Dropdown */}
				<div className="relative">
					<Button
						label="Filters"
						icon={
							<ListFilter
								size={12}
								className={`transition-transform duration-200 ${
									isFilterOpen ? "rotate-180" : "rotate-0"
								}`}
							/>
						}
						onClick={handleFilterToggle}
						className={`${
							isFilterOpen ? "border-primary/70 bg-primary/5" : ""
						}`}
					/>

					{/* Filter Dropdown */}
					{isFilterVisible && (
						<div
							ref={filterDropdownRef}
							className="glassmorphism rounded-2xl absolute top-full right-0 mt-4 backdrop-blur-sm shadow-xl z-50 min-w-[240px]"
						>
							<div className="p-2">
								<div className="text-xs font-fciconicBW text-gray-500 px-3 py-2 uppercase tracking-wide">
									Sort By
								</div>
								<div className="space-y-1">
									{filterOptions.map((option) => (
										<button
											key={option.value}
											onClick={() => handleSortChange(option.value)}
											className={`w-full font-fciconicBW  text-dark text-left px-3 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-between group ${
												sortBy === option.value
													? "bg-gradient-to-r from-secondery/10 to-primary/10 text-primary font-medium"
													: "text-textGray hover:bg-white/50"
											}`}
										>
											<span className="text-sm">{option.label}</span>
											{sortBy === option.value && (
												<Check size={16} className="text-primary" />
											)}
										</button>
									))}
								</div>

								{/* Active Filter Info */}
								{sortBy !== "default" && (
									<div className="mt-3 pt-3 border-t border-gray-200">
										<button
											onClick={() => handleSortChange("default")}
											className="w-full text-xs text-center text-gray-500 hover:text-primary transition-colors py-2"
										>
											Reset to Default
										</button>
									</div>
								)}
							</div>
						</div>
					)}
				</div>
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
					{visibleSpots.map((spot, index) => (
						<div key={spot.id}>
							<SpotCard spot={spot} />
						</div>
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
