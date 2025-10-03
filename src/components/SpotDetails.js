"use client";
import React, { Suspense, memo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import SpotOverview from "./SpotOverview";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load Minimap
const Minimap = dynamic(() => import("./Minimap"), {
	ssr: false,
	loading: () => <Skeleton className="h-80 w-full rounded-lg" />,
});

const SpotDetails = memo(({ spot }) => {
	// console.log("SpotDetails Re-render"); // จะไม่ re-render เมื่อเปลี่ยน quarter

	return (
		<div className="w-full flex flex-col lg:flex-row glassmorphism rounded-[40px] overflow-hidden">
			<div className="max-lg:min-h-[400px] lg:h-[960px] w-full lg:w-1/2 relative">
				<Image
					src={spot.img}
					fill
					className="object-cover max-lg:rounded-t-[40px]"
					alt="Spot Image"
					priority
				/>
			</div>
			<div className="px-4 py-8 lg:px-16 lg:py-20 space-y-4 lg:w-1/2">
				{/* Detail Header */}
				<div>
					<h1 className="text-[2rem] lg:text-[2.5rem]">{spot.name}</h1>
					<div className="mt-2 flex gap-2">
						<div className="flex gap-1 text-textGray items-center">
							<MapPin size={16} />
							<span>{spot.district}</span>
						</div>
						<span
							className={cn("font-fciconicBW", {
								"text-success": spot.overviews.status === "Available",
								"text-error": spot.overviews.status === "Closed",
							})}
						>
							{spot.overviews.status}
						</span>
					</div>
				</div>

				{/* Overview */}
				<div className="grid grid-cols-3 gap-2 justify-between w-full lg:gap-4 lg:w-fit">
					<SpotOverview
						overviews={[
							spot.overviews.type,
							spot.overviews.radius,
							spot.overviews.area,
						]}
					/>
				</div>

				{/* Description */}
				<p>{spot.description}</p>

				{/* MiniMap */}
				<Suspense fallback={<Skeleton className="h-80 w-full rounded-lg" />}>
					<div className="h-80 rounded-lg overflow-hidden">
						<Minimap
							lat={spot.coordinates.lat}
							lng={spot.coordinates.lng}
							radius={spot.overviews.radius}
						/>
					</div>
				</Suspense>
			</div>
		</div>
	);
});

SpotDetails.displayName = "SpotDetails";

export default SpotDetails;
