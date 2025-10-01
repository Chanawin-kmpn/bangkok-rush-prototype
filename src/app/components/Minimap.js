import React from "react";
import { Circle, MapContainer, Marker, TileLayer } from "react-leaflet";

const Minimap = ({ lat, lng, radius }) => {
	return (
		<MapContainer
			center={[lat, lng]}
			zoom={14}
			className="w-full h-full"
			zoomControl={false}
			dragging={false}
			scrollWheelZoom={false}
		>
			<TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
			<Circle
				center={[lat, lng]}
				radius={radius}
				fillColor="#4CAF50"
				fillOpacity={0.2}
				color="#4CAF50"
			/>
			<Marker
				position={[lat, lng]}
				icon={
					new L.DivIcon({
						html: `<span class="relative flex size-3">
  <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
  <span class="relative inline-flex size-3 rounded-full bg-red-500"></span>
</span>`,
						iconSize: [0, 0],
						iconAnchor: [12 / 2, 12 / 2],
					})
				}
			/>
		</MapContainer>
	);
};

export default Minimap;
