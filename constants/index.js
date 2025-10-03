export const radiusColor = {
	mall: {
		fillColor: "#FF6B35",
		color: "#FFB800",
	},
	landmark: {
		fillColor: "#7B68EE",
		color: "#4A90E2",
	},
	temple: {
		fillColor: "#FFA184",
		color: "#FF5D2C",
	},
	park: {
		fillColor: "#98FB98",
		color: "#228B22",
	},
	monument: {
		fillColor: "#CD853F",
		color: "#8B4513",
	},
};

export const QUARTERS = [
	{
		key: "Jan - Mar",
		label: "Q1: Jan - Mar",
		months: ["January", "February", "March"],
		shortLabel: "Q1",
	},
	{
		key: "Apr - Jun",
		label: "Q2: Apr - Jun",
		months: ["April", "May", "June"],
		shortLabel: "Q2",
	},
	{
		key: "Jul - Sep",
		label: "Q3: Jul - Sep",
		months: ["July", "August", "September"],
		shortLabel: "Q3",
	},
	{
		key: "Oct - Dec",
		label: "Q4: Oct - Dec",
		months: ["October", "November", "December"],
		shortLabel: "Q4",
	},
];

export const filterOptions = [
	{ value: "default", label: "Default Order" },
	{ value: "position-asc", label: "Best Position First" },
	{ value: "position-desc", label: "Worst Position First" },
	{ value: "score-desc", label: "Highest Score First" },
	{ value: "score-asc", label: "Lowest Score First" },
];

export const quarterOptions = [
	{
		value: "Jan - Mar",
		label: "Jan - Mar",
	},
	{
		value: "Apr - Jun",
		label: "Apr - Jun",
	},
	{
		value: "Jul - Sep",
		label: "Jul - Sep",
	},
	{
		value: "Oct - Dec",
		label: "Oct - Dec",
	},
];
