"use client";
import dynamic from "next/dynamic";
import React from "react";

const SpotMap = dynamic(() => import("@/app/components/Map"), { ssr: false });

const page = () => {
	return (
		<div>
			<SpotMap />
			{/* Discovered Spot */}
		</div>
	);
};

export default page;
