import Image from "next/image";
import React from "react";

const SpotCard = ({ spot }) => {
	const { id, name, district, image, overview, clubRank, clubPoints } = spot;
	return (
		<div>
			<div>{/* <Image /> */}</div>
			<div></div>
		</div>
	);
};

export default SpotCard;
