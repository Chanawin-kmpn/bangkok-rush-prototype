"use client";
import React, { useState } from "react";
import TopThreeRankBanner from "./TopThreeRankBanner";
import ScoreBar from "./ScoreBar";
import PaginationControls from "./PaginationControls";

const RankingLeaderboard = ({ rankings }) => {
	const INITIAL_COUNT = 7; // แสดง top 3 + อีก 7 อันดับ (รวม 10 อันดับแรก)
	const LOAD_MORE_COUNT = 10;

	const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

	let restRanks = [...rankings];
	const topThree = restRanks.splice(0, 3);

	// Pagination logic for rest of rankings
	const visibleRestRanks = restRanks.slice(0, visibleCount);
	const hasMore = visibleCount < restRanks.length;

	const handleShowMore = () => {
		setVisibleCount((prev) =>
			Math.min(prev + LOAD_MORE_COUNT, restRanks.length)
		);
	};

	const handleShowLess = () => {
		setVisibleCount(INITIAL_COUNT);
	};

	return (
		<div className="space-y-10">
			{/* Top 3 Rankings - Always Visible */}
			{topThree.length > 0 && (
				<div className="flex justify-center gap-3 lg:gap-10">
					{topThree.map((rank) => (
						<TopThreeRankBanner key={rank.clubName} rank={rank} />
					))}
				</div>
			)}

			{/* Rest of Rankings with Pagination */}
			{restRanks.length > 0 && (
				<>
					<div className="space-y-3 lg:space-y-12">
						{visibleRestRanks.map(
							({ clubName, clubLogo, leader, members, points, position }) => (
								<ScoreBar
									clubName={clubName}
									clubLogo={clubLogo}
									position={position}
									leader={leader}
									members={members}
									points={points}
									key={clubName}
								/>
							)
						)}
					</div>

					{/* Pagination Controls */}
					<PaginationControls
						visibleCount={visibleCount}
						totalCount={restRanks.length + 3}
						initialCount={INITIAL_COUNT}
						hasMore={hasMore}
						onShowMore={handleShowMore}
						onShowLess={handleShowLess}
						itemLabel="clubs"
					/>
				</>
			)}
		</div>
	);
};

export default RankingLeaderboard;
