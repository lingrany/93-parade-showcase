'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAudio } from '../../hooks/useAudio';

// 历史时间线数据
const timelineData = [
  {
    year: "1945",
    title: "Victory in Anti-Japanese War",
    description: "After 14 years of arduous resistance, the Chinese people achieved great victory in the Anti-Japanese War, making significant contributions to the global victory against fascism.",
    significance: "Marked the beginning of the Chinese nation standing up"
  },
  {
    year: "1949",
    title: "Founding of New China",
    description: "The People&apos;s Republic of China was established, marking the beginning of the Chinese nation&apos;s great journey toward rejuvenation.",
    significance: "The Chinese nation embarked on the great leap from standing up to becoming prosperous"
  },
  {
    year: "1964",
    title: "First Nuclear Test Success",
    description: "China&apos;s first atomic bomb test was successful, breaking the nuclear monopoly of superpowers and contributing to world peace.",
    significance: "Major breakthrough in China&apos;s defense technology"
  },
  {
    year: "1978",
    title: "Reform and Opening-up",
    description: "China began implementing reform and opening-up policies, embarking on the path of socialism with Chinese characteristics.",
    significance: "The Chinese nation welcomed the great leap from prosperity to strength"
  },
  {
    year: "1999",
    title: "50th Anniversary Military Parade",
    description: "The military parade for the 50th anniversary of New China was held at Tiananmen Square, showcasing tremendous achievements in military modernization.",
    significance: "Demonstrated brilliant achievements in defense and military construction since reform and opening-up"
  },
  {
    year: "2009",
    title: "60th Anniversary Military Parade",
    description: "The 60th anniversary parade displayed significant progress in military informatization and modernization levels.",
    significance: "Marked the People&apos;s Liberation Army&apos;s modernization reaching new heights"
  },
  {
    year: "2015",
    title: "70th WWII Victory Parade",
    description: "Commemorating the 70th anniversary of victory in the Chinese People&apos;s War of Resistance Against Japanese Aggression and World War II, the first non-National Day parade.",
    significance: "Demonstrated China&apos;s firm determination to maintain world peace"
  },
  {
    year: "2019",
    title: "70th Anniversary Military Parade",
    description: "The 70th anniversary parade showcased the new appearance and powerful strength of the People's Liberation Army in the new era.",
    significance: "Displayed great achievements in strengthening the military in the new era"
  },
  {
    year: "2025",
    title: "80th WWII Victory Parade",
    description: "Commemorating the 80th anniversary of victory in the Chinese People&apos;s War of Resistance Against Japanese Aggression and World War II, showcasing military achievements of the new era.",
    significance: "Demonstrates the bright prospects of the great rejuvenation of the Chinese nation"
  }
];

export default function TimelinePage() {
  // 使用音频Hook
  const { play, pause, setVolume } = useAudio('/videos/93cut - Converted with FlexClip.mp3');
  
  return (
    <main className="min-h-screen bg-black text-white">
      {/* 页面头部 */}
      <section className="relative py-20 bg-gradient-to-b from-red-900/30 via-black to-black overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-900/10 to-transparent"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
                Historical Timeline
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Journey through 80 years of history from victory to modern China&apos;s rise
            </p>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-red-500/25 transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
              Return to Victory Parade
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 时间线内容 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {timelineData.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* 时间线连接线 */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-600 to-red-800"></div>
                
                {/* 年份圆圈 */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center text-white font-bold text-lg z-10 border-4 border-black shadow-lg shadow-red-500/30">
                  <div className="text-center">
                    <div className="text-sm font-bold">{event.year.slice(-2)}</div>
                  </div>
                </div>
                
                {/* 内容卡片 */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 shadow-lg hover:shadow-red-500/10"
                  >
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                      <p className="text-red-400 font-semibold text-lg">{event.year}</p>
                    </div>
                    
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {event.description}
                    </p>
                    
                    <div className="bg-red-900/20 rounded-lg p-3 border-l-4 border-red-500">
                      <p className="text-red-200 text-sm font-medium">
                        <span className="text-red-400">Historical Significance: </span>
                        {event.significance}
                      </p>
                    </div>
                  </motion.div>
                </div>
                
                {/* 空白区域 */}
                <div className="w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 底部统计 */}
      <section className="py-16 bg-gradient-to-b from-black to-red-900/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-12">
              <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
                80 Years of Progress
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-5xl font-bold text-red-500 mb-2">80</div>
                <div className="text-gray-300">Years Since Victory</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-yellow-500 mb-2">76</div>
                <div className="text-gray-300">Years of New China</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-red-500 mb-2">47</div>
                <div className="text-gray-300">Years of Reform & Opening</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}