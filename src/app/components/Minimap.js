import React from "react";
import { Circle, MapContainer, Marker, TileLayer } from "react-leaflet";

const Minimap = ({ lat, lng }) => {
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
				radius={300}
				fillColor="#4CAF50"
				fillOpacity={0.2}
				color="#4CAF50"
			/>
			<Marker
				position={[lat, lng]}
				icon={
					new L.DivIcon({
						html: '<div style="width: 20px; height: 20px; background: #F44336; border-radius: 50%; border: 2px solid white;"></div>',
						iconSize: [20, 20],
						iconAnchor: [10, 10],
					})
				}
			/>
		</MapContainer>
	);
};

export default Minimap;
