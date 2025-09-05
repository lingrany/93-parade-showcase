'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import VideoBackground, { VideoBackgroundRef } from './VideoBackground';

interface HeroParallaxProps {
  onVideoControlChange?: (ref: VideoBackgroundRef | null) => void;
}

export default function HeroParallax({ onVideoControlChange }: HeroParallaxProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 300]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<VideoBackgroundRef>(null);
  const fullText = 'China Victory Day Parade 2025';
  const englishText = '中国人民抗日战争暨世界反法西斯战争胜利80周年阅兵';

  useEffect(() => {
    setMounted(true);
    // 将视频控制引用传递给父组件
    if (onVideoControlChange && videoRef.current) {
      onVideoControlChange(videoRef.current);
    }
  }, [onVideoControlChange]);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  if (!mounted) {
    return (
      <section className="relative h-screen overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/70 via-black/60 to-yellow-900/70"></div>
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 font-serif leading-tight">
            <span className="bg-gradient-to-r from-red-500 via-yellow-400 to-red-600 bg-clip-text text-transparent">
              Loading...
            </span>
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* 背景视频 */}
      <VideoBackground ref={videoRef} className="z-0" />
      
      {/* 粒子效果背景 */}
      <div className="absolute inset-0 z-10">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500 rounded-full"
            initial={{
              x: (i * 64) % 1920,
              y: (i * 36) % 1080,
              opacity: 0
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: (i % 3) + 2,
              repeat: Infinity,
              delay: (i % 4) * 0.5
            }}
          />
        ))}
      </div>

      {/* 主要内容 */}
      <motion.div 
        style={{ y, opacity }} 
        className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8"
      >


        {/* 主标题 - 打字机效果 */}
        <motion.h1 
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 font-serif leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="bg-gradient-to-r from-red-500 via-yellow-400 to-red-600 bg-clip-text text-transparent">
            {currentText}
          </span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-red-500"
          >
            |
          </motion.span>
        </motion.h1>

        {/* 中文副标题 */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 max-w-4xl leading-relaxed"
        >
          {englishText}
        </motion.h2>

        {/* 统计数据 - 响应式网格 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 w-full max-w-md sm:max-w-lg lg:max-w-xl"
        >
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-red-500 mb-1 sm:mb-2">80</div>
            <div className="text-xs sm:text-sm text-gray-400">Victory Years</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-500 mb-1 sm:mb-2">500+</div>
            <div className="text-xs sm:text-sm text-gray-400">Equipment</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-red-500 mb-1 sm:mb-2">12K+</div>
            <div className="text-xs sm:text-sm text-gray-400">Personnel</div>
          </div>
        </motion.div>

        {/* 导航按钮 - 响应式布局 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-md sm:max-w-none"
        >
          <motion.a
            href="/equipment"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(239, 68, 68, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-red-500/25 transition-all duration-300 text-sm sm:text-base"
          >
            Equipment
          </motion.a>
          <motion.a
            href="/timeline"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(234, 179, 8, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 text-sm sm:text-base"
          >
            Timeline
          </motion.a>
          <motion.a
            href="/gallery"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(239, 68, 68, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-red-500/25 transition-all duration-300 text-sm sm:text-base"
          >
            Gallery
          </motion.a>
        </motion.div>
      </motion.div>

      {/* 滚动提示 - 隐藏在小屏幕上 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white text-center"
        >
          <div className="text-xs sm:text-sm mb-2">Scroll down to explore more</div>
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full mx-auto relative">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 sm:h-3 bg-white rounded-full absolute left-1/2 top-1 sm:top-2 transform -translate-x-1/2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}