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
