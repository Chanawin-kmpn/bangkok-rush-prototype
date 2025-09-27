"use client";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null); // ✅ เพิ่ม ref สำหรับ dropdown

	// ✅ Animation สำหรับเปิด dropdown
	useGSAP(() => {
		if (isOpen && dropdownRef.current) {
			gsap.set(dropdownRef.current, {
				y: -20,
				opacity: 0,
				scale: 0.95,
			});

			gsap.to(dropdownRef.current, {
				y: 0,
				opacity: 1,
				scale: 1,
				duration: 0.3,
				ease: "back.out(1.7)",
			});
		}
	}, [isOpen]);

	const handleOpen = () => {
		setIsOpen((prev) => !prev);
	};

	// ✅ Function สำหรับปิด dropdown พร้อม animation
	const handleClose = () => {
		if (dropdownRef.current) {
			gsap.to(dropdownRef.current, {
				y: -10,
				opacity: 0,
				scale: 0.95,
				duration: 0.2,
				ease: "power2.in",
				onComplete: () => {
					setIsOpen(false);
				},
			});
		} else {
			setIsOpen(false);
		}
	};

	return (
		<>
			<nav className="glassmorphism p-4 relative rounded-full">
				<div className="flex justify-between items-center">
					<Link href="/">
						<Image
							src="/images/bangkok-rush-logo.png"
							width={80}
							height={40}
							alt="bangkok-rush-logo"
							className="cursor-pointer"
						/>
					</Link>
					<div>
						<div
							className="lg:hidden  p-[10px] cursor-pointer hover:bg-white/20 rounded-lg transition-colors"
							onClick={handleOpen}
						>
							<Menu />
						</div>
						<div className="space-x-8 hidden lg:block">
							<Link
								href="/map"
								className="text-[#5D6598] hover:text-primary transition-colors duration-300"
							>
								Map
							</Link>
							<Link
								href="/"
								className="text-[#5D6598] hover:text-primary transition-colors duration-300"
							>
								Explore Club
							</Link>
							<Link href="/" className="cta-btn">
								Login/Register
							</Link>
						</div>
					</div>
				</div>
				{isOpen && (
					<div
						ref={dropdownRef} // ✅ เพิ่ม ref
						className="bg-[#ffffff]/50 border rounded-[25px] border-[#fff] absolute top-full left-0 right-0 mt-4 backdrop-blur-sm p-4 shadow-lg lg:hidden"
					>
						<div className="flex flex-col space-y-4">
							<Link
								href="/map"
								className="text-[#5D6598] hover:text-primary transition-colors duration-300 py-2 hover:bg-white/10 rounded-lg px-2"
								onClick={handleClose}
							>
								Map
							</Link>
							<Link
								href="/"
								className="text-[#5D6598] hover:text-primary transition-colors duration-300 py-2 hover:bg-white/10 rounded-lg px-2"
								onClick={handleClose}
							>
								Explore Club
							</Link>
							<Link
								href="/"
								className="cta-btn inline-block text-center"
								onClick={handleClose}
							>
								Login/Register
							</Link>
						</div>
					</div>
				)}
			</nav>
		</>
	);
};

export default Navbar;
