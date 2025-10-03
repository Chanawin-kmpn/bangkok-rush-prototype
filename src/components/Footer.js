"use client";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ArrowUpRight, Facebook, Instagram, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

const Footer = () => {
	// ✅ สร้าง array สำหรับเก็บ refs
	const linkRefs = useRef([]);
	const backgroundRefs = useRef([]);

	const links = [
		{ href: "/", text: "My Club" },
		{ href: "/", text: "Explore Club" },
		{ href: "/", text: "Create Club" },
	];

	useGSAP(() => {
		// ✅ สร้าง animation สำหรับแต่ละ link
		linkRefs.current.forEach((link, index) => {
			if (link && backgroundRefs.current[index]) {
				const tl = gsap.timeline({ paused: true });

				tl.to(backgroundRefs.current[index], {
					scale: 10,
					duration: 0.5,
					ease: "power3.in",
				});

				const handleMouseEnter = () => tl.play();
				const handleMouseLeave = () => tl.reverse();

				link.addEventListener("mouseenter", handleMouseEnter);
				link.addEventListener("mouseleave", handleMouseLeave);

				// Cleanup สำหรับแต่ละ link
				return () => {
					link.removeEventListener("mouseenter", handleMouseEnter);
					link.removeEventListener("mouseleave", handleMouseLeave);
				};
			}
		});
	});

	return (
		<footer className="w-full">
			<div className="flex flex-col items-center glassmorphism p-6 rounded-[40px] gap-8 lg:flex-row lg:justify-between lg:p-20">
				<div className="flex flex-col gap-6 items-center lg:items-start lg:max-w-[700px]">
					<Link href="/">
						<Image
							src="/images/bangkok-rush-logo.png"
							width={300}
							height={150}
							alt="bangkok-rush-logo"
							className="object-contain w-auto h-40"
						/>
					</Link>
					<p className="text-gray-600 lg:text-left font-bold">
						The modern platform for creating and discovering amazing events.
						Connect with your community and build memorable experiences.
					</p>
				</div>
				<div className="flex gap-16 items-center">
					<div className="flex flex-col gap-2">
						{links.map((link, index) => (
							<Link
								key={index}
								ref={(el) => (linkRefs.current[index] = el)}
								href={link.href}
								className="relative inline-flex items-center justify-between p-4 rounded-full font-medium transition-shadow duration-300 overflow-hidden cursor-pointer select-none w-[200px]"
							>
								<div
									className="absolute right-[9px] top-1/2 -translate-y-1/2 size-10 bg-white rounded-full shadow-sm"
									ref={(el) => (backgroundRefs.current[index] = el)}
								/>

								<span className="relative text-slate-600 font-semibold z-10">
									{link.text}
								</span>

								<div className="relative z-10">
									<ArrowUpRight size={24} color="#5D6598" />
								</div>
							</Link>
						))}
					</div>
					<div className="flex flex-col py-3 gap-6">
						<Link
							href="/"
							className="bg-white size-10 p-2 rounded-[10px] shadow-sm hover:shadow-md transition-shadow"
						>
							<Facebook color="#5D6598" />
						</Link>
						<Link
							href="/"
							className="bg-white size-10 p-2 rounded-[10px] shadow-sm hover:shadow-md transition-shadow"
						>
							<Instagram color="#5D6598" />
						</Link>
						<Link
							href="/"
							className="bg-white size-10 p-2 rounded-[10px] shadow-sm hover:shadow-md transition-shadow"
						>
							<Mail color="#5D6598" />
						</Link>
					</div>
				</div>
			</div>
			<div className="flex flex-col justify-between items-center gap-4 px-4 py-6 lg:flex-row lg:p-10">
				<div>
					<p className="font-fciconicBW text-textGray text-xs lg:text-base">
						Copyright © 2025 Bangkok Rush. All rights reserved.
					</p>
				</div>
				<div className="space-x-2 [&_a]:text-xs [&_a]:hover:text-primary lg:[&_a]:text-base text-textGray [&_a]:transition-all">
					<Link href="/">Privacy Policy</Link>
					<span>|</span>
					<Link href="/">Term of Conditions</Link>
					<span>|</span>
					<Link href="/">Cookies Policy</Link>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
