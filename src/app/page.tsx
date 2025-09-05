'use client';
import HeroParallax from '../../components/HeroParallax';
import ParadeStats from '../../components/ParadeStats';
import { motion, useScroll } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { VideoBackgroundRef } from '../../components/VideoBackground';
import { useLanguage } from '../hooks/useLanguage';

export default function Home() {
  const [videoController, setVideoController] = useState<VideoBackgroundRef | null>(null);
  const [isBackgroundVideoPaused, setIsBackgroundVideoPaused] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const videoSectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  
  // 使用语言Hook
  const { language, toggleLanguage } = useLanguage();

  // 监听滚动位置，当滚动到视频区域时暂停背景视频
  useEffect(() => {
    const unsubscribe = scrollY.on("change", () => {
      try {
        if (videoSectionRef.current && videoController && typeof window !== 'undefined') {
          const element = videoSectionRef.current;
          if (element && element.getBoundingClientRect) {
            const rect = element.getBoundingClientRect();
            const isVideoSectionVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVideoSectionVisible && !isBackgroundVideoPaused) {
              videoController.pauseVideo();
              setIsBackgroundVideoPaused(true);
            } else if (!isVideoSectionVisible && isBackgroundVideoPaused) {
              videoController.playVideo();
              setIsBackgroundVideoPaused(false);
            }
          }
        }
      } catch (error) {
        console.log('Scroll handler error:', error);
      }
    });

    return () => unsubscribe();
  }, [scrollY, videoController, isBackgroundVideoPaused]);

  const handleRestoreBackgroundVideo = () => {
    if (videoController && isBackgroundVideoPaused) {
      videoController.playVideo();
      setIsBackgroundVideoPaused(false);
    }
  };

  const handleEnableAudio = () => {
    if (videoController) {
      videoController.setVolume(0.3);
      setAudioEnabled(true);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* 语言切换和音频控制按钮 */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={toggleLanguage}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-white font-semibold"
        >
          {language === 'en' ? '中文' : 'English'}
        </button>
        {!audioEnabled && (
          <button
            onClick={handleEnableAudio}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-white font-semibold flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
            {language === 'en' ? 'Enable Audio' : '启用音频'}
          </button>
        )}
      </div>
      
      {/* 史诗级英雄区域 */}
      <HeroParallax onVideoControlChange={setVideoController} />

      {/* 官方统计数据展示 */}
      <div className="relative bg-gradient-to-b from-black via-gray-900/50 to-gray-900">
        {/* 背景图片 */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/fxs05.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-red-900/60 to-black/80" />
        </div>
        <div className="relative z-10">
          <ParadeStats />
        </div>
      </div>

      {/* 视频展示区域 */}
      <section ref={videoSectionRef} className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-black">
        {/* 背景图片 */}
        <div className="absolute inset-0 opacity-15">
          <img
            src="/images/fxs02.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-red-900/50 to-black/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
                {language === 'en' ? 'Official Parade Video' : '官方阅兵视频'}
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              {language === 'en' 
                ? 'Watch the complete 70-minute broadcast of China\'s Victory Day Parade 2025'
                : '观看中国2025年胜利日阅兵完整70分钟直播'
              }
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative aspect-video rounded-lg sm:rounded-2xl overflow-hidden shadow-2xl bg-black border border-red-500/20 sm:border-2">
              {/* B站视频嵌入 */}
              <iframe
                src="https://player.bilibili.com/player.html?bvid=BV1GHa3zSEB4&page=1&high_quality=1&danmaku=0&autoplay=0"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                className="w-full h-full"
                title="2025 Victory Day Parade - Bilibili"
              />
              
              {/* 视频信息覆盖层 */}
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                <div className="text-white text-sm font-semibold">Official Parade Video</div>
                <div className="text-gray-300 text-xs">
                  {isBackgroundVideoPaused ? 'Background video paused' : 'Scroll here to pause background'}
                </div>
              </div>
              
              {/* 控制按钮 */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                {isBackgroundVideoPaused && (
                  <button
                    onClick={handleRestoreBackgroundVideo}
                    className="px-3 py-2 bg-green-600/80 backdrop-blur-sm text-white rounded-lg text-sm hover:bg-green-700/80 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    <span>Resume Background</span>
                  </button>
                )}
                <a 
                  href="https://www.bilibili.com/video/BV1GHa3zSEB4/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-red-600/80 backdrop-blur-sm text-white rounded-lg text-sm hover:bg-red-700/80 transition-colors flex items-center gap-2"
                >
                  <span>Watch on Bilibili</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7z"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 导航卡片区域 */}
      <section className="relative py-20 bg-gradient-to-b from-black to-gray-900">
        {/* 背景图片 */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/fxs04.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-red-900/60 to-black/80" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
                {language === 'en' ? 'Explore More' : '探索更多'}
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {language === 'en' 
                ? 'Discover the history, equipment, and moments that define this historic celebration'
                : '探索定义这一历史性庆典的历史、装备和时刻'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <motion.a
              href="/equipment"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-red-900/20 to-red-800/10 rounded-xl p-8 border border-red-500/20 hover:border-red-500/40 transition-all duration-300"
            >
              <div className="text-4xl font-black mb-6 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
                ARSENAL
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {language === 'en' ? 'Equipment Details' : '装备详情'}
              </h3>
              <p className="text-gray-300 mb-6">
                {language === 'en' 
                  ? 'Comprehensive information about military equipment featured in the parade'
                  : '阅兵中展示的军事装备的全面信息'
                }
              </p>
              <div className="text-red-400 font-semibold flex items-center">
                Learn More
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                </svg>
              </div>
            </motion.a>

            <motion.a
              href="/timeline"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 rounded-xl p-8 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300"
            >
              <div className="text-4xl font-black mb-6 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                LEGACY
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {language === 'en' ? 'Historical Timeline' : '历史时间线'}
              </h3>
              <p className="text-gray-300 mb-6">
                {language === 'en' 
                  ? 'Journey through 80 years of history from victory to modern China'
                  : '穿越从胜利到现代中国的80年历史之旅'
                }
              </p>
              <div className="text-yellow-400 font-semibold flex items-center">
                Explore Timeline
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                </svg>
              </div>
            </motion.a>

            <motion.a
              href="/gallery"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-blue-900/20 to-blue-800/10 rounded-xl p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
            >
              <div className="text-4xl font-black mb-6 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                MOMENTS
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {language === 'en' ? 'Photo Gallery' : '图片画廊'}
              </h3>
              <p className="text-gray-300 mb-6">
                {language === 'en' 
                  ? 'High-resolution images capturing the grandeur and precision of the parade'
                  : '捕捉阅兵宏伟和精确的高分辨率图像'
                }
              </p>
              <div className="text-blue-400 font-semibold flex items-center">
                View Gallery
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                </svg>
              </div>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-green-900/20 to-green-800/10 rounded-xl p-8 border border-green-500/20"
            >
              <div className="text-4xl font-black mb-6 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                GLORY
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {language === 'en' ? 'Key Highlights' : '重点亮点'}
              </h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{language === 'en' ? '70-minute complete ceremony' : '70分钟完整仪式'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{language === 'en' ? '45 formations participated' : '45个方队参与'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{language === 'en' ? '500+ pieces of equipment' : '500+件装备'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{language === 'en' ? '12,000+ personnel' : '12,000+人员'}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}