import React from "react";
import TopThreeRankBanner from "./TopThreeRankBanner";
import ScoreBar from "./ScoreBar";

const RankingLeaderboard = ({ rankings }) => {
	let restRanks = [...rankings];
	const topThree = restRanks.splice(0, 3);
	console.log(restRanks);

	return (
		<div className="space-y-10 ">
			<div className="flex justify-center gap-3 lg:gap-10">
				{topThree.map((rank) => (
					<TopThreeRankBanner key={rank.clubName} rank={rank} />
				))}
			</div>
			<div className="space-y-3 lg:space-y-12">
				{restRanks.map(
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
		</div>
	);
};

export default RankingLeaderboard;
