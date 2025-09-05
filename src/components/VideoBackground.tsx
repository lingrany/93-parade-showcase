'use client';
import { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';

export interface VideoBackgroundRef {
  playVideo: () => void;
  pauseVideo: () => void;
  setVolume: (volume: number) => void;
}

interface VideoBackgroundProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

const VideoBackground = forwardRef<VideoBackgroundRef, VideoBackgroundProps>(
  ({ src, className = '', autoPlay = true, muted = false, loop = true }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useImperativeHandle(ref, () => ({
      playVideo: () => {
        if (videoRef.current) {
          videoRef.current.play().catch(console.log);
        }
      },
      pauseVideo: () => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      },
      setVolume: (volume: number) => {
        if (videoRef.current) {
          videoRef.current.muted = volume === 0;
          videoRef.current.volume = Math.max(0, Math.min(1, volume));
        }
      }
    }));

    useEffect(() => {
      if (videoRef.current && autoPlay) {
        // 设置音量
        videoRef.current.volume = muted ? 0 : 0.3;
        
        // 尝试自动播放
        const playVideo = async () => {
          try {
            await videoRef.current?.play();
          } catch (error) {
            console.log('Video autoplay prevented:', error);
            // 如果自动播放失败，添加用户交互监听器
            const enableAudioOnInteraction = () => {
              if (videoRef.current) {
                videoRef.current.muted = false;
                videoRef.current.volume = 0.3;
                videoRef.current.play().catch(console.log);
              }
              // 移除监听器，只需要一次交互
              document.removeEventListener('click', enableAudioOnInteraction);
              document.removeEventListener('keydown', enableAudioOnInteraction);
              document.removeEventListener('scroll', enableAudioOnInteraction);
            };
            
            document.addEventListener('click', enableAudioOnInteraction);
            document.addEventListener('keydown', enableAudioOnInteraction);
            document.addEventListener('scroll', enableAudioOnInteraction);
          }
        };
        
        playVideo();
      }
    }, [autoPlay, muted]);

    return (
      <video
        ref={videoRef}
        className={`w-full h-full object-cover ${className}`}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }
);

VideoBackground.displayName = 'VideoBackground';

export default VideoBackground;