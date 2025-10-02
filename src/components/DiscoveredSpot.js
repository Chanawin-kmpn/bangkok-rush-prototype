import React from "react";
import { sunriseSquadClub } from "../../data/clubData";
import SpotCard from "./SpotCard";
import { allSpotsDetailComplete } from "../../data/spotDetails";
import Button from "./Button";
import { ListFilter } from "lucide-react";

const DiscoveredSpot = () => {
	const discoveredSpotsDetails = () => {
		return sunriseSquadClub.discoveredSpots
			.map((spotId) => {
				const getSpot = Object.values(allSpotsDetailComplete).find(
					(spot) => spot.id === spotId
				);

				if (!getSpot) {
					console.warn(`Spot with id ${spotId} not found`);
					return null;
				}

				return getSpot;
			})
			.filter(Boolean); // Remove null values
	};

	const spots = discoveredSpotsDetails();

	// Loading state
	if (!spots.length) {
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
		<div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-16">
			<div>
				<h1 className="text-4xl">
					Discovered
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-secondery to-primary">
						Spot
					</span>
				</h1>
				<p className="mt-3">
					Explore strategic spots and compete to conquer key areas in the city.
				</p>
			</div>
			<Button label="Filters" icon={<ListFilter size={12} />} />
			{spots.map((spot) => (
				<div key={spot.id}>{spot.name}</div>
			))}
		</div>
	);
};

export default DiscoveredSpot;
