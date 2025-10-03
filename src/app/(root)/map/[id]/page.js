"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { allSpotsDetailComplete } from "../../../../../data/spotDetails";
import SpotDetailSkeleton from "@/components/skeletons/SpotDetailSkeleton";
import SpotDetails from "@/components/SpotDetails";
import RankingSectionWrapper from "@/components/RankingSectionWrapper";

const Page = () => {
	const [spot, setSpot] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();

	// console.log("Page Re-render"); // จะเห็นว่าไม่ re-render เมื่อเปลี่ยน quarter

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

	useEffect(() => {
		getSpotDetailFromId(id);
	}, [id]);

	if (isLoading || !spot) {
		return <SpotDetailSkeleton />;
	}

	return (
		<div className="space-y-8 lg:space-y-16">
			{/* Detail Section - Memoized */}
			<SpotDetails spot={spot} />

			{/* Ranking Section - Isolated State */}
			<RankingSectionWrapper spot={spot} />
		</div>
	);
};

export default Page;
