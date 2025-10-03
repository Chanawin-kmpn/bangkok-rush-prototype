"use client";
import React, { useRef, useState } from "react";
import Button from "./Button";
import { Check } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const DropdownButton = ({
	label,
	icon,
	options = [],
	value,
	onChange,
	dropdownTitle = "Options",
	showReset = false,
	resetLabel = "Reset to Default",
	defaultValue = "default",
	minWidth = "240px",
	className = "",
}) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);

	const dropdownRef = useRef(null);
	const dropdownTl = useRef(null);

	// GSAP Animation for Dropdown
	useGSAP(() => {
		if (dropdownRef.current) {
			dropdownTl.current = gsap.timeline({ paused: true });

			gsap.set(dropdownRef.current, {
				y: -20,
				opacity: 0,
				scale: 0.95,
			});

			dropdownTl.current.to(dropdownRef.current, {
				y: 0,
				opacity: 1,
				scale: 1,
				duration: 0.3,
				ease: "back.out(1.7)",
			});
		}
	}, [isDropdownVisible]);

	const handleDropdownToggle = () => {
		if (!isDropdownOpen) {
			setIsDropdownVisible(true);
			setIsDropdownOpen(true);
			setTimeout(() => {
				if (dropdownTl.current) dropdownTl.current.play();
			}, 10);
		} else {
			handleDropdownClose();
		}
	};

	const handleDropdownClose = () => {
		if (dropdownTl.current) {
			dropdownTl.current.reverse();
			dropdownTl.current.eventCallback("onReverseComplete", () => {
				setIsDropdownOpen(false);
				setIsDropdownVisible(false);
			});
		}
	};

	const handleOptionSelect = (optionValue) => {
		onChange(optionValue);
		handleDropdownClose();
	};

	const handleReset = () => {
		onChange(defaultValue);
		handleDropdownClose();
	};

	return (
		<div className={`relative ${className}`}>
			<Button
				label={label}
				icon={icon}
				onClick={handleDropdownToggle}
				className={`${isDropdownOpen ? "border-primary/70 bg-primary/5" : ""}`}
			/>

			{/* Dropdown Menu */}
			{isDropdownVisible && (
				<div
					ref={dropdownRef}
					className="glassmorphism rounded-2xl absolute top-full right-0 mt-4 backdrop-blur-sm shadow-xl z-50"
					style={{ minWidth }}
				>
					<div className="p-2">
						{/* Title */}
						<div className="text-xs font-fciconicBW text-gray-500 px-3 py-2 uppercase tracking-wide">
							{dropdownTitle}
						</div>

						{/* Options */}
						<div className="space-y-1">
							{options.map((option) => (
								<button
									key={option.value}
									onClick={() => handleOptionSelect(option.value)}
									className={`w-full font-fciconicBW text-dark text-left px-3 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-between group ${
										value === option.value
											? "bg-gradient-to-r from-secondery/10 to-primary/10 text-primary font-medium"
											: "text-textGray hover:bg-white/50"
									}`}
								>
									<span className="text-sm">{option.label}</span>
									{value === option.value && (
										<Check size={16} className="text-primary" />
									)}
								</button>
							))}
						</div>

						{/* Reset Button */}
						{showReset && value !== defaultValue && (
							<div className="mt-3 pt-3 border-t border-gray-200">
								<button
									onClick={handleReset}
									className="w-full text-xs text-center text-gray-500 hover:text-primary transition-colors py-2"
								>
									{resetLabel}
								</button>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default DropdownButton;
