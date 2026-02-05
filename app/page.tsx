'use client';

import { useState, useEffect, useRef, useMemo } from "react";
import type React from "react";
import { useRouter } from "next/navigation";
import InfiniteGallery from "@/components/ui/3d-gallery-photography";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";
import { motion } from "framer-motion";
import { Heart, ChevronDown } from "lucide-react";

export default function Home() {
	const router = useRouter();
	const [phase, setPhase] = useState(0); // 0 = gallery, 1 = question
	const [answer, setAnswer] = useState<"none" | "yes" | "no">("none");
	const [noButtonHoverCount, setNoButtonHoverCount] = useState(0);
	const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
	const [isMounted, setIsMounted] = useState(false);
	const [windowSize, setWindowSize] = useState({ width: 1024, height: 768 });

	// Handle SSR - only access window after mount
	useEffect(() => {
		setIsMounted(true);
		setWindowSize({ width: window.innerWidth, height: window.innerHeight });
		
		const handleResize = () => {
			setWindowSize({ width: window.innerWidth, height: window.innerHeight });
		};
		
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const isMobile = windowSize.width < 768;

	const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

	const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
		e.preventDefault();
		// Use only the scroll direction and a very small fixed step
		// so fast scrolling doesn't instantly jump to the next section.
		const direction = Math.sign(e.deltaY);
		const step = 0.025; // Even smoother transition
		setPhase((prev) => clamp01(prev + direction * step));
	};

	// Handle touch events for mobile (use ref so value persists between renders)
	const touchStartYRef = useRef(0);

	const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
		const touch = e.touches[0];
		touchStartYRef.current = touch.clientY;
	};

	const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
		e.preventDefault();
		const touch = e.touches[0];
		const deltaY = touchStartYRef.current - touch.clientY;
		touchStartYRef.current = touch.clientY;
		const delta = deltaY * 0.0005; // Even smoother for mobile
		setPhase((prev) => clamp01(prev + delta));
	};

	// Your personal memories - all working images from the pics folder
	// Cross-checked with actual files in public/pics folder
	// Excluded: IMG_4770.HEIC (unsupported format)
	// Note: Some IMG_20260203 files were removed due to loading errors
	const sampleImages = [
		{ src: '/pics/196dc069-9109-440a-9200-5e0a38c59e02.jpg', alt: 'Our memory' },
		{ src: '/pics/28bf069a-44fa-495f-8bbf-bcd0526a1957.jpg', alt: 'Our memory' },
		{ src: '/pics/4af27184-1efd-40e8-a959-4e8b746cfce7.jpg', alt: 'Our memory' },
		{ src: '/pics/B612_20230603_195916_341.jpg', alt: 'Our memory' },
		{ src: '/pics/B612_20240401_012341_253.jpg', alt: 'Our memory' },
		{ src: '/pics/IMG_20251026_002733_043.webp', alt: 'Our memory' },
		{ src: '/pics/IMG_2226.jpeg', alt: 'Our memory' },
		{ src: '/pics/IMG_2235.JPG', alt: 'Our memory' },
		{ src: '/pics/IMG_2239-1.jpeg', alt: 'Our memory' },
		{ src: '/pics/IMG_2240-1.jpeg', alt: 'Our memory' },
		{ src: '/pics/IMG_8311.JPG', alt: 'Our memory' },
		{ src: '/pics/IMG-20260118-WA0005.jpg', alt: 'Our memory' },
		{ src: '/pics/IMG-20260118-WA0008.jpg', alt: 'Our memory' },
		{ src: '/pics/IMG-20260118-WA0014.jpg', alt: 'Our memory' },
		{ src: '/pics/IMG-20260118-WA0018.jpg', alt: 'Our memory' },
		{ src: '/pics/IMG-20260118-WA0020.jpg', alt: 'Our memory' },
		{ src: '/pics/IMG-20260118-WA0022.jpg', alt: 'Our memory' },
		{ src: '/pics/Screenshot_2023-06-03-20-43-46-607_com.android.chrome.jpg', alt: 'Our memory' },
		{ src: '/pics/Screenshot_20230401_235508_Instagram.jpg', alt: 'Our memory' },
		{ src: '/pics/Snapchat-1421021877.jpg', alt: 'Our memory' },
		{ src: '/pics/Snapchat-177148465.jpg', alt: 'Our memory' },
		{ src: '/pics/Snapchat-233726048.jpg', alt: 'Our memory' },
		{ src: '/pics/Snapchat-377506270.jpg', alt: 'Our memory' },
		{ src: '/pics/Snapchat-463918278.jpg', alt: 'Our memory' },
		{ src: '/pics/Snapchat-50296285.jpg', alt: 'Our memory' },
		{ src: '/pics/Snapchat-689105199.jpg', alt: 'Our memory' },
		{ src: '/pics/Snapchat-823104729~2.jpg', alt: 'Our memory' },
		{ src: '/pics/Snapchat-927321780.jpg', alt: 'Our memory' },
		{ src: '/pics/Snapchat-973969055.jpg', alt: 'Our memory' },
	];

	// Opacity controls for different phases
	const galleryOpacity = 1 - phase;
	const secondSectionOpacity = clamp01(phase);
	// Floating images fade in between phase 0.3 -> 0.7
	const floatingOpacity = clamp01((phase - 0.3) / 0.4);
	// Question + buttons fade in between phase 0.7 -> 1
	const questionOpacity = clamp01((phase - 0.7) / 0.3);

	// For the floating Valentine section, show a curated subset so it doesn’t look overcrowded
	const floatingImages = sampleImages.slice(
		0,
		Math.min(sampleImages.length, isMobile ? 12 : 18)
	);

	// Pre-generate heart configs once so mobile doesn’t lag on each scroll/touch
	const heartCount = isMobile ? 12 : 24;
	const fallingHeartsConfig = useMemo(
		() =>
			Array.from({ length: heartCount }).map(() => {
				const randomX = Math.random() * 100;
				const randomDelay = Math.random() * 5;
				const randomDuration = 10 + Math.random() * 5;
				const randomRotate = Math.random() * 360;
				const colors = [
					"#ff6b9d",
					"#ffc0cb",
					"#ff69b4",
					"#ff1493",
					"#ffb6c1",
					"#ffffff",
					"#ffd1dc",
					"#e91e63",
				];
				const randomColor = colors[Math.floor(Math.random() * colors.length)];
				const size = 0.4 + Math.random() * 0.6;

				return {
					randomX,
					randomDelay,
					randomDuration,
					randomRotate,
					randomColor,
					size,
				};
			}),
		[heartCount]
	);

	return (
		<div
			className="relative w-full h-screen overflow-hidden bg-black touch-none"
			onWheel={handleWheel}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
		>
			{/* Romantic Ambient Background */}
			<div className="fixed inset-0 romantic-ambient pointer-events-none z-0" />

			{/* Continuous Falling Hearts - Whole Page */}
			{isMounted && (
				<div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
					{fallingHeartsConfig.map(
						(
							{
								randomX,
								randomDelay,
								randomDuration,
								randomRotate,
								randomColor,
								size,
							},
							i
						) => (
							<motion.div
								key={`falling-heart-${i}`}
								className="absolute"
								initial={{
									x: `${randomX}%`,
									y: -100,
									opacity: 0.3,
									rotate: 0,
									scale: size,
								}}
								animate={{
									y: windowSize.height + 150,
									opacity: [0.3, 0.5, 0.4, 0.3, 0],
									rotate: randomRotate + 360,
									x: `${randomX + (Math.random() - 0.5) * 15}%`,
								}}
								transition={{
									duration: randomDuration,
									delay: randomDelay,
									ease: [0.25, 0.46, 0.45, 0.94],
									repeat: Infinity,
									repeatDelay: 0,
								}}
							>
								<Heart
									className="w-4 h-4 md:w-5 md:h-5"
									style={{
										fill: randomColor,
										color: randomColor,
										filter:
											"drop-shadow(0 0 6px rgba(255,255,255,0.4))",
									}}
								/>
							</motion.div>
						)
					)}
				</div>
			)}

			{/* 3D Gallery Section */}
			<motion.section 
				className="h-screen w-full absolute inset-0 z-10 bg-black"
				animate={{ opacity: galleryOpacity }}
				transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
			>
				<div className="absolute inset-0 bg-black/80 z-0" />
				<InfiniteGallery
					images={sampleImages}
					speed={1.2}
					zSpacing={3}
					visibleCount={12}
					falloff={{ near: 0.8, far: 14 }}
					className="h-screen w-full"
				/>
				
				{/* Animated Title Overlay */}
				<motion.div 
					className="h-screen inset-0 pointer-events-none fixed flex items-center justify-center text-center px-3 mix-blend-exclusion"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1.5 }}
				>
					<motion.div
						// Keep the title perfectly centered even during the intro
						// Only fade/scale instead of moving it up/down
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ 
							duration: 1.2,
							ease: [0.16, 1, 0.3, 1]
						}}
					>
						<h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight text-white drop-shadow-2xl px-4">
							<motion.span 
								className="italic inline-block"
								initial={{ opacity: 0, x: -30 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
							>
								Our
							</motion.span>
							{' '}
							<motion.span 
								className="inline-block"
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
							>
								Memories
							</motion.span>
						</h1>
						
						<motion.div
							className="flex items-center justify-center gap-2 sm:gap-3 mt-5 sm:mt-8 px-4"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 1.2, duration: 0.8 }}
						>
							<motion.div
								animate={{ scale: [1, 1.2, 1] }}
								transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
							>
								<Heart 
									className="w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9 text-pink-300 fill-pink-300 flex-shrink-0" 
									style={{ filter: 'drop-shadow(0 0 12px rgba(255,182,193,0.9))' }}
								/>
							</motion.div>
							<motion.span 
								className="text-white text-base sm:text-xl md:text-2xl font-light text-center font-cursive"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 1.4 }}
								style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)' }}
							>
							Happy Valentine&apos;s Day, My Forever Love
							</motion.span>
							<motion.div
								animate={{ scale: [1, 1.2, 1] }}
								transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
							>
								<Heart 
									className="w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9 text-pink-300 fill-pink-300 flex-shrink-0" 
									style={{ filter: 'drop-shadow(0 0 12px rgba(255,182,193,0.9))' }}
								/>
							</motion.div>
						</motion.div>
					</motion.div>
				</motion.div>

				{/* Scroll Down Indicator */}
				<motion.div 
					className="fixed bottom-8 sm:bottom-12 left-0 right-0 flex flex-col items-center z-10 pointer-events-none"
					initial={{ opacity: 0 }}
					animate={{ opacity: galleryOpacity }}
					transition={{ delay: 2, duration: 0.8 }}
				>
					<motion.p 
						className="text-white/80 text-xs sm:text-sm font-light mb-2 text-center px-4"
						style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
					>
						{isMobile ? 'Swipe up to continue' : 'Scroll down for a surprise'}
					</motion.p>
					<motion.div
						animate={{ y: [0, 8, 0] }}
						transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
						className="animate-pulse-glow rounded-full p-2"
					>
						<ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-white" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.6))' }} />
					</motion.div>
				</motion.div>
			</motion.section>

			{/* Valentine Question Section */}
			<motion.section
				className="h-screen w-full absolute inset-0 z-20 bg-gradient-to-b from-black via-[#080012] to-black romantic-ambient"
				animate={{ opacity: secondSectionOpacity }}
				style={{ pointerEvents: questionOpacity > 0.3 ? "auto" : "none" }}
				transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
			>
				<div className="relative flex w-full h-full items-center justify-center overflow-hidden">
					{/* Floating images using your photos - NO parallax to prevent shaking */}
					<div className="absolute inset-0 pointer-events-none">
						{/* Slow rotating circle so the whole ring moves very smoothly */}
						<motion.div
							className="absolute inset-0"
							style={{ transformOrigin: "50% 50%" }}
							animate={{ rotate: 360 }}
							transition={{
								duration: 90,
								repeat: Infinity,
								ease: "linear",
							}}
						>
							{floatingImages.map((img, idx) => {
								const total = floatingImages.length || 1;

								// Distribute images evenly around a circle.
								const angle = (idx / total) * Math.PI * 2;
								const radiusY = isMobile ? 28 : 34; // vertical radius in %
								const radiusX = isMobile ? 36 : 42; // horizontal radius in %
								const top = 50 + Math.sin(angle) * radiusY;
								const left = 50 + Math.cos(angle) * radiusX;

								return (
									<motion.div
										key={idx}
										className="absolute -translate-x-1/2 -translate-y-1/2"
										initial={{ opacity: 0, scale: 0.7 }}
										animate={{ 
											opacity: floatingOpacity,
											scale: questionOpacity > 0.3 ? 1 : 0.85
										}}
										transition={{ 
											duration: 1.4,
											delay: idx * 0.05,
											ease: [0.16, 1, 0.3, 1]
										}}
										style={{ 
											top: `${top}%`, 
											left: `${left}%`,
										}}
									>
										<div
											className="w-12 h-16 xs:w-14 xs:h-18 sm:w-16 sm:h-22 md:w-20 md:h-28 rounded-lg sm:rounded-xl overflow-hidden border border-white/20 bg-black/40"
											style={{ 
												boxShadow: '0 8px 32px rgba(255,105,180,0.2), 0 4px 16px rgba(0,0,0,0.4)'
											}}
										>
											<img
												src={img.src}
												alt={img.alt}
												className="w-full h-full object-cover"
											/>
										</div>
									</motion.div>
								);
							})}
						</motion.div>
					</div>

					{/* Center question + buttons */}
					<motion.div
						className="relative z-30 flex flex-col items-center text-center px-4 sm:px-6 max-w-lg sm:max-w-xl md:max-w-2xl mx-auto"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: questionOpacity, y: 0 }}
						transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
					>
						{/* BUBU & DUDU Image - Valentine Question */}
						<motion.div
							className="mb-4 sm:mb-6"
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: questionOpacity, scale: 1 }}
							transition={{ duration: 0.8, delay: 0.2 }}
						>
							<img 
								src="/pics/Bubu & dudu/7.png" 
								alt="Bubu asking Dudu to be their Valentine"
								className="w-48 h-auto xs:w-56 sm:w-72 md:w-80 lg:w-96 rounded-2xl shadow-2xl mx-auto"
								style={{ 
									boxShadow: '0 0 60px rgba(255,105,180,0.3), 0 20px 50px rgba(0,0,0,0.4)',
									border: '3px solid rgba(255,182,193,0.3)'
								}}
							/>
						</motion.div>

						{/* Buttons container with fixed height to prevent layout shift */}
						<div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 w-full sm:w-auto min-h-[120px] sm:min-h-[60px]">
							<button
								onClick={() => {
									setAnswer("yes");
									router.push("/celebration");
								}}
								className="px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 text-white text-base sm:text-lg font-semibold tracking-wide shadow-lg w-full sm:w-auto min-w-[160px] transition-all duration-200 hover:brightness-110 hover:shadow-pink-400/50 hover:shadow-xl active:scale-95"
								style={{ boxShadow: '0 0 30px rgba(255,105,180,0.5), 0 4px 15px rgba(0,0,0,0.2)' }}
							>
								💕 Yes! 💕
							</button>
							{noButtonHoverCount < 2 ? (
								<button
									onClick={() => {
										if (noButtonHoverCount >= 1) {
											setAnswer("yes");
											router.push("/celebration");
										} else {
											setAnswer("no");
										}
									}}
									onMouseEnter={() => {
										if (noButtonHoverCount === 0) {
											setNoButtonHoverCount(1);
										} else if (noButtonHoverCount === 1) {
											setNoButtonHoverCount(2);
											const buttonWidth = 160;
											const buttonHeight = 50;
											const maxX = Math.max(0, windowSize.width - buttonWidth - 40);
											const maxY = Math.max(0, windowSize.height - buttonHeight - 40);
											setNoButtonPosition({
												x: 40 + Math.random() * maxX,
												y: 40 + Math.random() * maxY
											});
										}
									}}
									onMouseLeave={() => {
										if (noButtonHoverCount === 1) {
											setNoButtonHoverCount(0);
										}
									}}
									className={`px-8 sm:px-10 py-3 sm:py-3.5 rounded-full text-white text-base sm:text-lg font-semibold tracking-wide w-full sm:w-auto min-w-[160px] transition-all duration-200 active:scale-95 ${
										noButtonHoverCount >= 1 
											? 'bg-gradient-to-r from-pink-400 to-pink-500 shadow-lg shadow-pink-400/40' 
											: 'border-2 border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white/10'
									}`}
								>
									{noButtonHoverCount >= 1 ? '💕 Yes! 💕' : 'Maybe later...'}
								</button>
							) : (
								/* Escaped button - now floating */
								<motion.button
									onClick={() => {
										setAnswer("yes");
										router.push("/celebration");
									}}
									onMouseEnter={() => {
										const buttonWidth = 160;
										const buttonHeight = 50;
										const maxX = Math.max(0, windowSize.width - buttonWidth - 40);
										const maxY = Math.max(0, windowSize.height - buttonHeight - 40);
										setNoButtonPosition({
											x: 40 + Math.random() * maxX,
											y: 40 + Math.random() * maxY
										});
									}}
									className="fixed px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 text-white text-base sm:text-lg font-semibold tracking-wide shadow-lg shadow-pink-400/40 min-w-[160px] z-50 transition-colors duration-200"
									initial={{ x: noButtonPosition.x, y: noButtonPosition.y }}
									animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
									transition={{ type: "spring", stiffness: 300, damping: 25 }}
									style={{ left: 0, top: 0 }}
								>
									💕 Yes! 💕
								</motion.button>
							)}
						</div>

						{answer === "no" && (
							<motion.p 
								className="mt-6 text-base md:text-lg text-pink-200 max-w-md text-center font-cursive"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								style={{ textShadow: '0 0 20px rgba(255,182,193,0.5)' }}
							>
								Too late, you are already my forever Valentine 💕
							</motion.p>
						)}
					</motion.div>
				</div>
			</motion.section>
		</div>
	);
}
