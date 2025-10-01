"use client";
import DiscoveredSpot from "@/app/components/DiscoveredSpot";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import Loading from "./loading";
import SpotMapSkeleton from "@/app/components/skeletons/SpotMapSkeleton";

const SpotMap = dynamic(() => import("@/app/components/Map"), {
	ssr: false,
	loading: () => <SpotMapSkeleton />,
});

const page = () => {
	return (
		<div className="space-y-8">
			<SpotMap />
			<DiscoveredSpot />
		</div>
	);
};

export default page;
