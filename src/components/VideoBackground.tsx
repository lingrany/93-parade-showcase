'use client';
import { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';

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
    const [audioPromptVisible, setAudioPromptVisible] = useState(false);

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
        // 设置音量（优先尝试有声播放，音量较高）
        videoRef.current.volume = muted ? 0 : 0.8;
        
        // 尝试自动播放
        const playVideo = async () => {
          try {
            await videoRef.current?.play();
          } catch (error) {
            console.log('Video autoplay prevented, fallback to muted:', error);
            // 回退为静音播放并显示提示
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current.volume = 0;
              videoRef.current.play().catch(console.log);
            }
            setAudioPromptVisible(true);
            // 用户首次交互时开启声音
            const enableAudioOnInteraction = () => {
              if (videoRef.current) {
                videoRef.current.muted = false;
                videoRef.current.volume = 0.8;
                videoRef.current.play().catch(console.log);
                setAudioPromptVisible(false);
              }
              // 移除监听器
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
      <div className={`relative w-full h-full ${className}`}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {audioPromptVisible && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="pointer-events-auto bg-black/70 text-white px-4 py-2 rounded-lg border border-white/20 shadow-lg">
              Click anywhere to enable sound
            </div>
          </div>
        )}
      </div>
    );
  }
);

VideoBackground.displayName = 'VideoBackground';

export default VideoBackground;