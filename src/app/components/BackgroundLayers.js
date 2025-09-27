import React from "react";

const BackgroundLayers = ({ position }) => {
	const backgroundPosition = position === "bottom" ? "bottom-0" : "";
	return (
		<div
			className={`fixed inset-0 w-screen h-screen -z-50 pointer-events-none ${backgroundPosition}`}
		>
			<div className="absolute inset-0 bg-[url(/images/backgrounds/bg-noise.png)] bg-repeat opacity-30" />
			<div className="absolute inset-0 bg-[url(/images/backgrounds/bg-blur1.png)] bg-no-repeat bg-right bg-cover opacity-70" />
			<div className="absolute inset-0 bg-[url(/images/backgrounds/bg-blur2.png)] bg-no-repeat bg-left bg-cover opacity-70" />
			<div className="absolute inset-0 bg-[url(/images/backgrounds/bg-blur4.png)] bg-no-repeat bottom-0 bg-right bg-cover opacity-70" />
			<div className="absolute inset-0 bg-[url(/images/backgrounds/bg-blur3.png)] bg-no-repeat bg-left bottom-0 bg-cover opacity-30" />
		</div>
	);
};

export default BackgroundLayers;
