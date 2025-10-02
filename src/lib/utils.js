import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { allSpotsDetailComplete } from "../../data/spotDetails";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}
