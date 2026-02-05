'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CelebrationPage() {
	const [isMounted, setIsMounted] = useState(false);
	const [viewportWidth, setViewportWidth] = useState(1024);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	// BUBU & DUDU celebration images – use every image you added
	const bubuDuduImages = [
		{ src: '/pics/Bubu & dudu/1.png', alt: 'Bubu and Dudu smiling together' },
		{ src: '/pics/Bubu & dudu/2.png', alt: 'Cute Bubu and Dudu moment' },
		{ src: '/pics/Bubu & dudu/3.png', alt: 'Bubu holding Dudu close' },
		{ src: '/pics/Bubu & dudu/4.png', alt: 'Playful Bubu and Dudu' },
		{ src: '/pics/Bubu & dudu/5.png', alt: 'Sweet Bubu and Dudu hug' },
		{ src: '/pics/Bubu & dudu/6.png', alt: 'Romantic Bubu and Dudu' },
		{ src: '/pics/Bubu & dudu/7.png', alt: 'Valentine Bubu and Dudu' },
		{ src: '/pics/Bubu & dudu/8.png', alt: 'Bubu and Dudu cuddling' },
		{ src: '/pics/Bubu & dudu/9.png', alt: 'Bubu giving chocolates to Dudu' },
	];

	useEffect(() => {
		setIsMounted(true);
		setViewportWidth(typeof window !== "undefined" ? window.innerWidth : 1024);

		const handleResize = () => {
			setViewportWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		// Auto-rotate images every 4 seconds
		const interval = setInterval(() => {
			setCurrentImageIndex((prev) => (prev + 1) % bubuDuduImages.length);
		}, 4000);

		return () => {
			clearInterval(interval);
			window.removeEventListener("resize", handleResize);
		};
	}, [bubuDuduImages.length]);

	const isMobile = viewportWidth < 768;

	// Stagger animation for children
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15,
				delayChildren: 0.3,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: "spring",
				stiffness: 100,
				damping: 12,
			},
		},
	};

	const imageVariants = {
		hidden: { opacity: 0, scale: 0.8, rotate: -10 },
		visible: {
			opacity: 1,
			scale: 1,
			rotate: 0,
			transition: {
				type: "spring",
				stiffness: 100,
				damping: 15,
				delay: 0.5,
			},
		},
	};

	return (
		<div className="min-h-screen w-full bg-gradient-to-b from-[#1a0a1a] via-[#2d0a2d] to-[#1a0a1a] overflow-hidden relative">
			{/* Subtle background pattern */}
			<div className="absolute inset-0 opacity-20">
				<div className="absolute inset-0" style={{
					backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255,105,180,0.15) 0%, transparent 40%),
									radial-gradient(circle at 80% 70%, rgba(255,182,193,0.15) 0%, transparent 40%)`
				}} />
			</div>

			{/* Floating hearts - desktop only to keep mobile super smooth */}
			{isMounted && !isMobile && (
				<div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
					{[...Array(isMobile ? 8 : 15)].map((_, i) => {
						const randomX = Math.random() * 100;
						const randomDelay = Math.random() * 8;
						const randomDuration = 12 + Math.random() * 8;
						const colors = ['#ff6b9d', '#ffc0cb', '#ff69b4', '#ffb6c1'];
						const randomColor = colors[Math.floor(Math.random() * colors.length)];
						const size = 0.5 + Math.random() * 0.5;

						return (
							<motion.div
								key={i}
								className="absolute"
								initial={{ x: `${randomX}%`, y: -50, opacity: 0 }}
								animate={{
									y: '110vh',
									opacity: [0, 0.6, 0.6, 0],
									rotate: 360,
								}}
								transition={{
									duration: randomDuration,
									delay: randomDelay,
									repeat: Infinity,
									ease: "linear",
								}}
							>
								<Heart
									className="w-4 h-4"
									style={{
										fill: randomColor,
										color: randomColor,
										transform: `scale(${size})`,
										filter: 'drop-shadow(0 0 4px rgba(255,182,193,0.5))',
									}}
								/>
							</motion.div>
						);
					})}
				</div>
			)}

			{/* Main content */}
			<motion.div
				className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				{/* Sparkle icon */}
				<motion.div variants={itemVariants} className="mb-4">
					<Sparkles className="w-8 h-8 text-pink-300" style={{ filter: 'drop-shadow(0 0 10px rgba(255,182,193,0.8))' }} />
				</motion.div>

				{/* Main heading - single line */}
				<motion.h1
					variants={itemVariants}
					className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-center whitespace-nowrap"
					style={{
						background: 'linear-gradient(135deg, #ffd1dc 0%, #ffffff 50%, #ffb6c1 100%)',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						textShadow: '0 0 60px rgba(255,182,193,0.5)',
					}}
				>
					You Made Me Complete!
				</motion.h1>

				{/* Subtitle */}
				<motion.p
					variants={itemVariants}
					className="mt-4 text-xl sm:text-2xl md:text-3xl font-cursive text-pink-200 text-center"
					style={{ textShadow: '0 0 20px rgba(255,182,193,0.5)' }}
				>
					I love you more than words can say
				</motion.p>

				{/* BUBU & DUDU Image Carousel */}
				<motion.div
					variants={imageVariants}
					className="mt-8 relative"
				>
					<div className="relative w-72 h-48 xs:w-80 xs:h-56 sm:w-96 sm:h-64 md:w-[28rem] md:h-72 lg:w-[32rem] lg:h-80 rounded-3xl overflow-hidden"
						style={{
							boxShadow: '0 0 80px rgba(255,105,180,0.4), 0 25px 60px rgba(0,0,0,0.5)',
							border: '4px solid rgba(255,182,193,0.3)',
						}}
					>
						{bubuDuduImages.map((img, index) => (
							<motion.img
								key={img.src}
								src={img.src}
								alt={img.alt}
								className="absolute inset-0 w-full h-full object-cover"
								initial={{ opacity: 0 }}
								animate={{
									opacity: currentImageIndex === index ? 1 : 0,
									scale: currentImageIndex === index ? 1 : 1.1,
								}}
								transition={{ duration: 0.8, ease: "easeInOut" }}
							/>
						))}
					</div>

					{/* Image indicators */}
					<div className="flex justify-center gap-2 mt-4">
						{bubuDuduImages.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentImageIndex(index)}
								className={`w-2 h-2 rounded-full transition-all duration-300 ${
									currentImageIndex === index
										? 'bg-pink-400 w-6'
										: 'bg-white/30 hover:bg-white/50'
								}`}
							/>
						))}
					</div>
				</motion.div>

				{/* Love message card */}
				<motion.div
					variants={itemVariants}
					className="mt-8 max-w-md mx-auto p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10"
					style={{ boxShadow: '0 0 40px rgba(255,105,180,0.15)' }}
				>
					<p className="text-base sm:text-lg text-white/90 text-center leading-relaxed">
						Every moment with you is a treasure.
					</p>
					<p className="mt-3 text-lg sm:text-xl text-pink-300 font-medium text-center">
						You are my today and all of my tomorrows.
					</p>
					<p className="mt-4 text-sm text-white/60 text-center">
						Forever yours 💕
					</p>
				</motion.div>

				{/* Bubu & Dudu mini gallery using every image */}
				<motion.div
					variants={itemVariants}
					className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto"
				>
					{bubuDuduImages.map((img, index) => (
						<motion.div
							key={img.src}
							className="relative rounded-2xl overflow-hidden bg-black/40 border border-white/10"
							initial={{ opacity: 0, y: 20, scale: 0.9, rotate: index % 2 === 0 ? -4 : 3 }}
							animate={{ opacity: 1, y: 0, scale: 1, rotate: index % 2 === 0 ? -2 : 2 }}
							transition={{ delay: 0.2 + index * 0.05, duration: 0.5, ease: 'easeOut' }}
							whileHover={{ scale: 1.05, rotate: 0 }}
						>
							<img
								src={img.src}
								alt={img.alt}
								className="w-full h-32 sm:h-36 md:h-40 object-cover"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
						</motion.div>
					))}
				</motion.div>

				{/* Pulsing heart */}
				<motion.div
					variants={itemVariants}
					className="mt-8"
				>
					<motion.div
						animate={{ scale: [1, 1.15, 1] }}
						transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
					>
						<Heart
							className="w-12 h-12 sm:w-16 sm:h-16 text-pink-400 fill-pink-400"
							style={{
								filter: 'drop-shadow(0 0 30px rgba(255,105,180,0.8)) drop-shadow(0 0 60px rgba(255,20,147,0.5))',
							}}
						/>
					</motion.div>
				</motion.div>

				{/* Back button */}
				<motion.div variants={itemVariants} className="mt-8">
					<Link href="/">
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium backdrop-blur-sm transition-all hover:bg-white/20"
						>
							← Back to Memories
						</motion.button>
					</Link>
				</motion.div>
			</motion.div>
		</div>
	);
}
