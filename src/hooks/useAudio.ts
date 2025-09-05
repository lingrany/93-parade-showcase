'use client';

import { useEffect, useRef } from 'react';

export const useAudio = (audioPath: string, autoPlay: boolean = true) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // 创建音频元素
    const audio = new Audio(audioPath);
    audioRef.current = audio;
    
    // 设置音频属性
    audio.loop = true;
    audio.volume = 0.3; // 设置音量为30%，避免过于响亮
    
    // 如果需要自动播放
    if (autoPlay) {
      // 添加一些延迟以确保页面完全加载
      const playPromise = setTimeout(() => {
        audio.play().catch(error => {
          console.log('Audio play failed:', error);
        });
      }, 500);
      
      return () => {
        clearTimeout(playPromise);
      };
    }
    
    // 页面可见性变化处理函数
    const handleVisibilityChange = () => {
      if (audioRef.current) {
        if (document.hidden) {
          // 页面隐藏时暂停音频
          audioRef.current.pause();
        } else {
          // 页面显示时播放音频
          audioRef.current.play().catch(error => {
            console.log('Audio play failed:', error);
          });
        }
      }
    };
    
    // 页面卸载前暂停音频
    const handleBeforeUnload = () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
    
    // 添加事件监听器
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // 清理函数
    return () => {
      // 暂停并清理音频
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      
      // 移除事件监听器
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [audioPath, autoPlay]);
  
  // 返回控制函数
  const play = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.log('Audio play failed:', error);
      });
    }
  };
  
  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };
  
  const setVolume = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  };
  
  return { play, pause, setVolume };
};