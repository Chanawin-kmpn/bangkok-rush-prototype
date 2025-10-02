"use client";
import { createContext, useCallback, useContext, useState } from "react";
import { getCurrentQuarterFromDate } from "../helpers/helpers";
import { QUARTERS } from "../constants";

const QuartersContext = createContext();

export const QuartersProvider = ({ children, defaultQuarter = null }) => {
	// Initialize with current quarter or provided default
	const [currentQuarter, setCurrentQuarter] = useState(
		defaultQuarter || getCurrentQuarterFromDate()
	);

	// Get quarter info
	const getCurrentQuarterInfo = useCallback(() => {
		return QUARTERS.find((q) => q.key === currentQuarter) || QUARTERS[2]; // Default to Q3
	}, [currentQuarter]);

	// Change quarter with validation
	const changeQuarter = useCallback((newQuarter) => {
		const validQuarter = QUARTERS.find((q) => q.key === newQuarter);
		if (validQuarter) {
			setCurrentQuarter(newQuarter);
			return true;
		}
		console.warn(`Invalid quarter: ${newQuarter}`);
		return false;
	}, []);

	// Get next quarter
	const getNextQuarter = useCallback(() => {
		const currentIndex = QUARTERS.findIndex((q) => q.key === currentQuarter);
		const nextIndex = (currentIndex + 1) % QUARTERS.length;
		return QUARTERS[nextIndex].key;
	}, [currentQuarter]);

	// Get previous quarter
	const getPreviousQuarter = useCallback(() => {
		const currentIndex = QUARTERS.findIndex((q) => q.key === currentQuarter);
		const prevIndex =
			currentIndex === 0 ? QUARTERS.length - 1 : currentIndex - 1;
		return QUARTERS[prevIndex].key;
	}, [currentQuarter]);

	// Navigate quarters
	const goToNextQuarter = useCallback(() => {
		changeQuarter(getNextQuarter());
	}, [changeQuarter, getNextQuarter]);

	const goToPreviousQuarter = useCallback(() => {
		changeQuarter(getPreviousQuarter());
	}, [changeQuarter, getPreviousQuarter]);

	// Check if it's current real-world quarter
	const isCurrentRealQuarter = useCallback(() => {
		return currentQuarter === getCurrentQuarterFromDate();
	}, [currentQuarter]);

	// Get quarter index (0-3)
	const getCurrentQuarterIndex = useCallback(() => {
		return QUARTERS.findIndex((q) => q.key === currentQuarter);
	}, [currentQuarter]);

	// Context value
	const value = {
		// State
		currentQuarter,
		quarters: QUARTERS,

		// Actions
		setCurrentQuarter,
		changeQuarter,
		goToNextQuarter,
		goToPreviousQuarter,

		// Computed values
		getCurrentQuarterInfo,
		getCurrentQuarterIndex,
		getNextQuarter,
		getPreviousQuarter,
		isCurrentRealQuarter,

		// Utilities
		getCurrentQuarterFromDate,
	};

	return (
		<QuartersContext.Provider value={value}>
			{children}
		</QuartersContext.Provider>
	);
};

export const useQuarters = () => {
	const context = useContext(QuartersContext);

	if (!context) {
		throw new Error("useQuarters must be used within a QuartersProvider");
	}

	return context;
};
