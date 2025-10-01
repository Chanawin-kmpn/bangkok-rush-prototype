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
import { allSpotsDetailComplete } from "../../data/spotDetails";
import { radiusColor } from "../../constants";
import { calculateMarkerSize, getRadiusColor } from "../../helpers/helpers";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import ScoreBar from "./ScoreBar";
import GradientLinkBtn from "./GradientLinkBtn";

// สร้าง custom marker สำหรับ club ที่นำ
const createClubMarker = (clubLogo, radius, isLeading = false) => {
	const size = calculateMarkerSize(radius, isLeading);
	const imageSize = Math.floor(size * 3);

	return new L.DivIcon({
		html: `
			<div style="width= 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
				<img src="${clubLogo}" style="width: ${imageSize}px; height: ${imageSize}px; object-fit: cover; border-radius: 2px;" />
				
			</div>
		`,
		className: "custom-club-marker",
		iconSize: [size, size],
		iconAnchor: [size / 2, size],
	});
};

// สร้าง marker สำหรับ undiscovered spot
const createUndiscoveredMarker = ({ radius }) => {
	const size = calculateMarkerSize(radius);
	return new L.DivIcon({
		html: `
			<div style="width= 100%; height: 100%; display: flex; justify-content: center; align-items: center; font-size: 18px">
				?
			</div>
		`,
		className: "undiscovered-marker",
		iconSize: [size, size],
		iconAnchor: [size / 2, size / 2],
	});
};

const Map = () => {
	const bangkokCenter = [13.7563, 100.5018];
	const currentQuarter = "Jul - Sep"; // ตุลาคม

	// ประมวลผลข้อมูล spots
	const processSpotData = () => {
		return Object.values(allSpotsDetailComplete).map((spot) => {
			const rankings = spot.quarterlyRankings[currentQuarter];
			const winner = rankings?.[0]; // อันดับ 1

			const topThree =
				rankings?.slice(0, 3).map((club) => ({
					position: club.position,
					clubName: club.clubName,
					clubLogo: club.clubLogo,
					points: club.points,
					crown: club.crown,
					leader: club.leader,
					members: club.members,
				})) || [];

			// เช็คว่า Sunrise Squad อยู่ใน rankings หรือไม่
			const sunriseSquadRank = rankings?.find(
				(club) => club.clubName === "Sunrise Squad"
			);
			const isDiscovered = !!sunriseSquadRank;
			const isSunriseLeading = sunriseSquadRank?.position === 1;

			return {
				id: spot.id,
				name: spot.name,
				image: spot.img,
				coordinates: spot.coordinates,
				district: spot.district,
				type: spot.overviews.type,
				clubs: spot.overviews.clubs,
				radius: spot.overviews.radius,
				status: spot.overviews.status,
				isDiscovered,
				isSunriseLeading,
				topThree: topThree,
				winner: winner?.clubName,
				winnerPoints: winner?.points,
				winnerLogo: winner?.clubLogo,
				sunriseRank: sunriseSquadRank,
				totalClubs: rankings?.length || 0,
				rankings: rankings || [],
			};
		});
	};

	const spotsData = processSpotData();

	return (
		<div className="w-full h-dvh relative  rounded-[40px] overflow-hidden">
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
									? createClubMarker(
											spot.winnerLogo,
											spot.radius,
											spot.isSunriseLeading
									  )
									: createUndiscoveredMarker(spot.radius)
							}
						>
							<Popup>
								<div className="min-w-[400px] flex flex-col">
									<div className="relative w-full h-[270px] rounded-t-[12px] overflow-hidden">
										<Image
											src={spot.image}
											fill
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											alt="spot-image"
											className="object-cover object-[0%_45%]"
										/>
									</div>
									<div className="flex flex-col p-4 gap-4">
										<div className="flex items-center justify-between">
											<div className="flex flex-col gap-2">
												<div className="flex items-center gap-2">
													<h3 className="text-lg">{spot.name}</h3>
													<span
														className={cn("font-fciconicBW ", {
															"text-success": spot.status === "Available",
															"text-error": spot.status === "Closed",
														})}
													>
														{spot.status}
													</span>
												</div>
												<div className="flex gap-1 items-center text-textGray">
													<MapPin size={16} />
													<span>
														{spot.district} • {spot.type}
													</span>
												</div>
											</div>
										</div>
										{spot.isDiscovered ? (
											<div className="space-y-4">
												<div className="space-y-2">
													<h4 className="font-fciconicBW text-dark text-sm">
														Top Club Rank
													</h4>
													<div className="flex flex-col gap-2">
														{spot.topThree.map(
															({
																clubName,
																clubLogo,
																position,
																points,
																members,
																leader,
															}) => (
																<ScoreBar
																	clubName={clubName}
																	clubLogo={clubLogo}
																	position={position}
																	leader={leader}
																	members={members}
																	points={points}
																	key={clubName}
																	isPopup
																/>
															)
														)}
													</div>
												</div>
												<div className="space-y-2">
													<h4 className="font-fciconicBW text-dark text-sm">
														Your Club Rank
													</h4>
													<div className="flex flex-col gap-2">
														<ScoreBar
															clubName={spot.sunriseRank.clubName}
															clubLogo={spot.sunriseRank.clubLogo}
															position={spot.sunriseRank.position}
															leader={spot.sunriseRank.leader}
															members={spot.sunriseRank.members}
															points={spot.sunriseRank.points}
															isPopup
														/>
													</div>
												</div>
												<div>
													<GradientLinkBtn
														label="View Details"
														isGradient
														link={`map/${spot.id}`}
													/>
												</div>
											</div>
										) : (
											<div></div>
										)}
									</div>
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
