'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import VideoBackground, { VideoBackgroundRef } from './VideoBackground';
import { useLanguage } from '../app/hooks/useLanguage';

interface HeroParallaxProps {
  onVideoControlChange?: (controller: VideoBackgroundRef | null) => void;
}

const HeroParallax = forwardRef<VideoBackgroundRef, HeroParallaxProps>(({ onVideoControlChange }, ref) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 300]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);
  
  const videoRef = useRef<VideoBackgroundRef>(null);
  const { language } = useLanguage();
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'China Victory Day Parade 2025';
  const fullTextChinese = '中国人民抗日战争暨世界反法西斯战争胜利纪念';

  useImperativeHandle(ref, () => ({
    playVideo: () => videoRef.current?.playVideo(),
    pauseVideo: () => videoRef.current?.pauseVideo(),
    setVolume: (volume: number) => videoRef.current?.setVolume(volume)
  }));

  useEffect(() => {
    if (onVideoControlChange && videoRef.current) {
      onVideoControlChange(videoRef.current);
    }
  }, [onVideoControlChange]);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Background Video */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0"
      >
        <VideoBackground
          ref={videoRef}
          src="/videos/93cut.mp4"
          className="absolute inset-0"
          autoPlay={true}
          muted={false}
          loop={true}
        />
      </motion.div>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 红色粒子效果 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 80 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500 rounded-full opacity-70"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 20,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: -20,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
            style={{
              left: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
      >
        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-4xl md:text-6xl lg:text-8xl font-extrabold text-white drop-shadow-2xl mb-4"
        >
          {displayedText}
        </motion.h1>

        {/* Chinese Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-xl md:text-3xl lg:text-4xl font-bold text-red-400 drop-shadow-lg mb-8"
        >
          {fullTextChinese}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8 leading-relaxed"
        >
          {language === 'en' 
            ? 'Explore China\'s military modernization, historic moments, and cutting-edge defense technology through immersive 3D experiences and stunning visual storytelling.'
            : '通过沉浸式3D体验和精美的视觉叙事，探索中国的军事现代化、历史时刻和尖端防务技术。'
          }
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="flex flex-col md:flex-row gap-4"
        >
          <button className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            {language === 'en' ? 'Explore Equipment' : '探索装备'}
          </button>
          <button className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-105">
            {language === 'en' ? 'View Timeline' : '查看时间线'}
          </button>
        </motion.div>

        {/* Stats Counter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3 }}
          className="mt-16 grid grid-cols-3 gap-8 text-center"
        >
          <div>
            <div className="text-3xl md:text-4xl font-bold text-white">12,000+</div>
            <div className="text-sm md:text-base text-gray-300">
              {language === 'en' ? 'Parade Participants' : '阅兵参与者'}
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-white">580+</div>
            <div className="text-sm md:text-base text-gray-300">
              {language === 'en' ? 'Military Equipment' : '军事装备'}
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-white">160+</div>
            <div className="text-sm md:text-base text-gray-300">
              {language === 'en' ? 'Aircraft Flyover' : '飞机飞越'}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 4 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </motion.div>
        <p className="text-white text-sm mt-2">
          {language === 'en' ? 'Scroll to explore' : '滚动探索'}
        </p>
      </motion.div>
    </section>
  );
});

HeroParallax.displayName = 'HeroParallax';

export default HeroParallax;
