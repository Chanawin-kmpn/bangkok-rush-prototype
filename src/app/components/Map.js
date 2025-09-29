"use client";
import React from "react";
import {
	Circle,
	LayerGroup,
	MapContainer,
	Marker,
	Popup,
	TileLayer,
} from "react-leaflet";
import L from "leaflet";
import { allSpotsDetailComplete } from "../../../data/spotDetails";
import { radiusColor } from "../../../constants";
import { getRadiusColor } from "../../../helpers/helpers";

// Club colors mapping
const clubColors = {
	"Sunrise Squad": "#FF6B35",
	"Green Warriors": "#4CAF50",
	"Urban Runners United": "#2196F3",
	"Morning Glory": "#FF9800",
	"Lotus Rising": "#9C27B0",
	"Ayutthaya Spirit": "#795548",
	"Siam Sprint": "#F44336",
	"Pathum Fitness": "#607D8B",
	"Marathon Club": "#FF5722",
	"Phuket Beach Run": "#00BCD4",
};

// สร้าง custom marker สำหรับ club ที่นำ
const createClubMarker = (clubName, isLeading = false) => {
	const color = clubColors[clubName] || "#666666";
	const size = isLeading ? 36 : 28;

	return new L.DivIcon({
		html: `
			<div style="
				width: ${size}px; 
				height: ${size}px; 
				background: ${color};
				border-radius: 6px;
				border: 3px solid white;
				box-shadow: 0 3px 6px rgba(0,0,0,0.3);
				display: flex;
				align-items: center;
				justify-content: center;
				font-weight: bold;
				color: white;
				font-size: ${isLeading ? "16px" : "14px"};
			">
				🏃‍♂️
			</div>
		`,
		className: "custom-club-marker",
		iconSize: [size, size],
		iconAnchor: [size / 2, size / 2],
	});
};

// สร้าง marker สำหรับ undiscovered spot
const createUndiscoveredMarker = () => {
	return new L.DivIcon({
		html: `
			<div style="
				width: 32px; 
				height: 32px; 
				background: #E0E0E0;
				border-radius: 50%;
				border: 3px solid #BDBDBD;
				display: flex;
				align-items: center;
				justify-content: center;
				font-weight: bold;
				color: #757575;
				font-size: 18px;
				box-shadow: 0 3px 6px rgba(0,0,0,0.2);
			">
				?
			</div>
		`,
		className: "undiscovered-marker",
		iconSize: [32, 32],
		iconAnchor: [16, 16],
	});
};

const Map = () => {
	const bangkokCenter = [13.7563, 100.5018];
	const currentQuarter = "Oct - Dec"; // ตุลาคม

	// ประมวลผลข้อมูล spots
	const processSpotData = () => {
		return Object.values(allSpotsDetailComplete).map((spot) => {
			const rankings = spot.quarterlyRankings[currentQuarter];
			const winner = rankings?.[0]; // อันดับ 1

			// เช็คว่า Sunrise Squad อยู่ใน rankings หรือไม่
			const sunriseSquadRank = rankings?.find(
				(club) => club.clubName === "Sunrise Squad"
			);
			const isDiscovered = !!sunriseSquadRank;
			const isSunriseLeading = sunriseSquadRank?.position === 1;

			return {
				id: spot.id,
				name: spot.name,
				coordinates: spot.coordinates,
				district: spot.district,
				type: spot.overview.type,
				clubs: spot.overview.clubs,
				radius: spot.overview.radius,
				isDiscovered,
				isSunriseLeading,
				winner: winner?.clubName,
				winnerPoints: winner?.points,
				sunriseRank: sunriseSquadRank?.position,
				sunrisePoints: sunriseSquadRank?.points,
				totalClubs: rankings?.length || 0,
				rankings: rankings || [],
			};
		});
	};

	const spotsData = processSpotData();
	console.log(radiusColor.mall.fillColor);

	return (
		<div className="w-full h-dvh relative">
			<MapContainer
				center={bangkokCenter}
				zoom={12}
				zoomControl={true}
				className="size-full"
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
					url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
				/>

				{spotsData.map((spot) => (
					<LayerGroup key={spot.id}>
						{/* Green Circle สำหรับ spots ที่ Sunrise Squad นำ */}
						<Circle
							center={[spot.coordinates.lat, spot.coordinates.lng]}
							radius={spot.radius}
							pathOptions={
								spot.isDiscovered
									? {
											fillColor: getRadiusColor(spot.type).fillColor,
											fillOpacity: 0.5,
											color: getRadiusColor(spot.type).color,
											weight: 2,
											opacity: 0.6,
									  }
									: {
											fillColor: "#D1D5DB",
											fillOpacity: 0.5,
											color: "#9CA3AF",
											weight: 2,
											opacity: 0.6,
									  }
							}
						/>

						{/* Markers */}
						<Marker
							position={[spot.coordinates.lat, spot.coordinates.lng]}
							icon={
								spot.isDiscovered
									? createClubMarker(spot.winner, spot.isSunriseLeading)
									: createUndiscoveredMarker()
							}
						>
							<Popup>
								<div className="min-w-[220px] p-2">
									<h3 className="text-lg font-bold mb-2 text-gray-800">
										{spot.name}
									</h3>
									<div className="text-sm text-gray-600 mb-3">
										📍 {spot.district} • {spot.type} • {spot.totalClubs} clubs
									</div>

									{spot.isDiscovered ? (
										<div className="space-y-2">
											<div className="bg-yellow-50 p-2 rounded">
												<div className="font-semibold text-yellow-800">
													🏆 Current Leader
												</div>
												<div className="text-sm">
													{spot.winner} • {spot.winnerPoints?.toLocaleString()}{" "}
													pts
												</div>
											</div>

											<div className="bg-orange-50 p-2 rounded">
												<div className="font-semibold text-orange-800">
													🟡 Sunrise Squad
												</div>
												<div className="text-sm">
													Rank #{spot.sunriseRank} •{" "}
													{spot.sunrisePoints?.toLocaleString()} pts
												</div>
											</div>

											{spot.isSunriseLeading && (
												<div className="bg-green-100 p-2 rounded text-green-800 text-sm font-semibold">
													🎯 DOMINATED BY SUNRISE SQUAD!
												</div>
											)}

											<div className="text-xs text-gray-500 pt-2 border-t">
												{spot.totalClubs} clubs competing • Oct-Dec 2024
											</div>
										</div>
									) : (
										<div className="space-y-2">
											<div className="bg-gray-100 p-3 rounded text-center">
												<div className="text-2xl mb-1">🔍</div>
												<div className="font-semibold text-gray-700 mb-1">
													Undiscovered Spot
												</div>
												<div className="text-sm text-gray-600">
													Sunrise Squad hasn&apos;t competed here yet
												</div>
											</div>

											<div className="bg-blue-50 p-2 rounded">
												<div className="font-semibold text-blue-800 text-sm">
													Current Leader: {spot.winner}
												</div>
												<div className="text-xs text-blue-600">
													{spot.winnerPoints?.toLocaleString()} points
												</div>
											</div>

											<div className="text-xs text-gray-500 text-center">
												Tap to explore this location!
											</div>
										</div>
									)}
								</div>
							</Popup>
						</Marker>
					</LayerGroup>
				))}
			</MapContainer>

			{/* Map Legend */}
			<div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg z-[1000] min-w-[200px]">
				<h4 className="font-bold text-gray-800 mb-3">Map Legend</h4>
				<div className="space-y-2 text-sm">
					<div className="flex items-center space-x-2">
						<div className="w-4 h-4 bg-orange-500 rounded flex items-center justify-center text-white text-xs">
							🏃‍♂️
						</div>
						<span>Discovered Spot</span>
					</div>
					<div className="flex items-center space-x-2">
						<div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs">
							?
						</div>
						<span>Undiscovered Spot</span>
					</div>
					<div className="flex items-center space-x-2">
						<div className="w-4 h-4 bg-green-500 rounded opacity-30"></div>
						<span>Sunrise Squad Leading</span>
					</div>
				</div>
				<div className="mt-3 pt-2 border-t text-xs text-gray-500">
					Current: Oct - Dec 2024
				</div>
			</div>
		</div>
	);
};

export default Map;
