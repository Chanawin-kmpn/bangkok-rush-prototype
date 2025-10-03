"use client";
import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";
import DropdownButton from "./DropdownButton";
import { quarterOptions } from "../../constants";
import RankingLeaderboardSkeleton from "./skeletons/RankingLeaderboardSkeleton";
import { useQuarters } from "../../context/QuartersContext";

const RankingLeaderboard = dynamic(() => import("./RankingLeaderboard"), {
	ssr: false,
	loading: () => <RankingLeaderboardSkeleton />,
});

const RankingSectionWrapper = ({ spot }) => {
	const { currentQuarter } = useQuarters();
	const [selectedQuarter, setSelectedQuarter] = useState(currentQuarter);
	const [rankings, setRankings] = useState([]);

	const quarters = ["Jan - Mar", "Apr - Jun", "Jul - Sep", "Oct - Dec"];

	// console.log("RankingSection Re-render"); // จะ re-render เฉพาะส่วนนี้

	useEffect(() => {
		if (spot?.quarterlyRankings) {
			const currentRankings = spot.quarterlyRankings[selectedQuarter] || [];
			setRankings(currentRankings);
		}
	}, [spot, selectedQuarter]);

	return (
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
									"text-secondery": selectedQuarter === quarter,
								}
							)}
							onClick={() => setSelectedQuarter(quarter)}
						>
							{quarter}
						</button>
					))}
				</div>

				{/* Mobile Selector */}
				<div className="lg:hidden flex justify-start">
					<DropdownButton
						label={`Quarter: ${selectedQuarter}`}
						icon={<Calendar size={14} />}
						options={quarterOptions}
						value={selectedQuarter}
						onChange={setSelectedQuarter}
						dropdownTitle="Select Quarter"
						showReset={false}
						minWidth="220px"
						className="w-full max-w-xs"
					/>
				</div>
			</div>

			{/* Ranking leaderboard with Suspense */}
			<Suspense fallback={<RankingLeaderboardSkeleton />}>
				<div className="lg:mt-[400px] mt-32">
					<RankingLeaderboard rankings={rankings} key={selectedQuarter} />
				</div>
			</Suspense>
		</div>
	);
};

export default RankingSectionWrapper;
