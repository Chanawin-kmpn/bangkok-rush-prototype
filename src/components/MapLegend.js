import React from "react";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

const MapLegend = ({
	showRadius,
	setShowRadius,
	currentQuarter = "Oct - Dec 2024",
}) => {
	const radiusTypes = [
		{ type: "mall", label: "Shopping Mall", color: "#FF6B35" },
		{ type: "landmark", label: "Landmark", color: "#7B68EE" },
		{ type: "temple", label: "Temple", color: "#FFA184" },
		{ type: "park", label: "Park", color: "#98FB98" },
		{ type: "monument", label: "Monument", color: "#CD853F" },
	];

	return (
		<div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg z-[1000] min-w-[220px] hidden lg:block">
			<h4 className="font-bold text-gray-800 mb-3 text-base">Map Legend</h4>

			{/* Radius Toggle */}
			<div className="pt-3 border-t border-gray-200 mb-3">
				<div className="flex items-center justify-between">
					<Label
						htmlFor="radius-toggle"
						className="text-sm font-medium text-gray-700 cursor-pointer"
					>
						Show Radius
					</Label>
					<Switch
						id="radius-toggle"
						checked={showRadius}
						onCheckedChange={setShowRadius}
					/>
				</div>
			</div>

			{/* Area Types */}
			{showRadius && (
				<div className="space-y-2.5 text-sm animate-in slide-in-from-top-2 duration-200">
					<div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
						Area Types
					</div>
					{radiusTypes.map((item) => (
						<div key={item.type} className="flex items-center space-x-2">
							<div
								className="w-3 h-3 rounded-full flex-shrink-0 border-2"
								style={{
									backgroundColor: item.color,
									borderColor: item.color,
									opacity: 0.7,
								}}
							></div>
							<span className="text-gray-700 text-xs">{item.label}</span>
						</div>
					))}
				</div>
			)}

			{/* Current Quarter */}
			<div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
				<div className="flex items-center justify-between">
					<span>Current Period:</span>
					<span className="font-medium text-gray-700">{currentQuarter}</span>
				</div>
			</div>
		</div>
	);
};

export default MapLegend;
