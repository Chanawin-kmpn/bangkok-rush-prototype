"use client";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(false); // ✅ เพิ่ม state สำหรับควบคุมการแสดงผล
	const dropdownRef = useRef(null);
	const tl = useRef(null); // ✅ เก็บ timeline ไว้ใช้ซ้ำ

	useGSAP(() => {
		if (dropdownRef.current) {
			tl.current = gsap.timeline({ paused: true });

			gsap.set(dropdownRef.current, {
				y: -20,
				opacity: 0,
				scale: 0.95,
			});

			// Animation timeline
			tl.current.to(dropdownRef.current, {
				y: 0,
				opacity: 1,
				scale: 1,
				duration: 0.3,
				ease: "back.out(1.7)",
			});
		}
	}, [isVisible]); // ✅ dependency เปลี่ยนเป็น isVisible

	const handleOpen = () => {
		if (!isOpen) {
			// เปิด menu
			setIsVisible(true);
			setIsOpen(true);
			setTimeout(() => {
				if (tl.current) tl.current.play();
			}, 10); // รอให้ DOM update
		} else {
			// ปิด menu
			handleClose();
		}
	};

	const handleClose = () => {
		if (tl.current) {
			tl.current.reverse();
			// ✅ รอให้ animation เสร็จก่อนเปลี่ยน state
			tl.current.eventCallback("onReverseComplete", () => {
				setIsOpen(false);
				setIsVisible(false);
			});
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
							className="lg:hidden p-[10px] cursor-pointer hover:bg-white/20 rounded-lg transition-colors"
							onClick={handleOpen}
						>
							<Menu
								className={`transition-transform duration-200 ${
									isOpen ? "rotate-90" : "rotate-0"
								}`}
								color="#5D6598"
							/>
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
				{isVisible && (
					<div
						ref={dropdownRef}
						className="glassmorphism rounded-[25px] absolute top-full left-0 right-0 mt-4 backdrop-blur-sm p-4 shadow-lg z-50 lg:hidden"
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
