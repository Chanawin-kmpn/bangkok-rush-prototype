import BackgroundLayers from "../components/BackgroundLayers";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./globals.css";
import "leaflet/dist/leaflet.css";

export const metadata = {
	title: "Bangkok Rush",
	description: "Bangkok Rush | Prototype",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="relative bg-white">
				<BackgroundLayers position="top" />
				<div className="h-full mx-auto flex items-center flex-col py-4 gap-8 lg:gap-16 max-w-[1440px] lg:px-16 px-4">
					<Navbar />
					<div className="flex-1 w-full">{children}</div>
					<Footer />
				</div>
			</body>
		</html>
	);
}
