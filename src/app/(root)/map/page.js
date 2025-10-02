"use client";
import DiscoveredSpot from "@/components/DiscoveredSpot";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import Loading from "./loading";
import SpotMapSkeleton from "@/components/skeletons/SpotMapSkeleton";
import { useQuarters } from "../../../../context/QuartersContext";

const SpotMap = dynamic(() => import("@/components/Map"), {
	ssr: false,
	loading: () => <SpotMapSkeleton />,
});

const Page = () => {
	return (
		<div className="space-y-8">
			<SpotMap />
			<DiscoveredSpot />
		</div>
	);
};

export default Page;
