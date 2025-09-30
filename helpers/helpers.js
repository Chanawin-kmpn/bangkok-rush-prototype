import { radiusColor } from "../constants";

export const getRadiusColor = (type) => {
	const normalizedType = type.toLowerCase();
	const colorMap = {
		mall: radiusColor.mall,
		landmark: radiusColor.landmark,
		temple: radiusColor.temple,
		park: radiusColor.park,
		monument: radiusColor.monument,
	};
	return colorMap[normalizedType] || radiusColor.landmark; // default fallback
};

export const calculateMarkerSize = (radius, isLeading = false) => {
	// แปลง radius (string) เป็น number
	const radiusNum = parseInt(radius);

	// คำนวณขนาดพื้นฐานตาม radius
	let baseSize;
	if (radiusNum <= 400) {
		baseSize = 24; // Spot เล็ก
	} else if (radiusNum <= 600) {
		baseSize = 28; // Spot กลาง
	} else if (radiusNum <= 800) {
		baseSize = 32; // Spot ใหญ่
	} else if (radiusNum <= 1000) {
		baseSize = 36; // Spot ใหญ่มาก
	} else {
		baseSize = 40; // Spot ยักษ์
	}

	// เพิ่มขนาดถ้า Sunrise Squad นำ
	return isLeading ? baseSize + 6 : baseSize;
};
