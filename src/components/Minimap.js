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
			<TileLayer
				attribution='&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg"
			/>
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
  <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondery/60 opacity-75"></span>
  <span class="relative inline-flex size-3 rounded-full bg-secondery"></span>
</span>`,
						className: "custom-club-marker",
						iconSize: [0, 0],
						iconAnchor: [12 / 2, 12 / 2],
					})
				}
			/>
		</MapContainer>
	);
};

export default Minimap;
