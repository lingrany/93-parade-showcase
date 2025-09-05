'use client';
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

interface VideoBackgroundProps {
  className?: string;
}

export interface VideoBackgroundRef {
  pauseVideo: () => void;
  playVideo: () => void;
  muteVideo: () => void;
  unmuteVideo: () => void;
}

const VideoBackground = forwardRef<VideoBackgroundRef, VideoBackgroundProps>(
  ({ className = '' }, ref) => {
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useImperativeHandle(ref, () => ({
      pauseVideo: () => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      },
      playVideo: () => {
        if (videoRef.current) {
          // 尝试正常播放，如果失败则尝试静音播放
          videoRef.current.play().catch(error => {
            console.log('Video play failed:', error);
            // 如果正常播放失败，尝试静音后播放
            if (videoRef.current) {
              const wasMuted = videoRef.current.muted;
              videoRef.current.muted = true;
              videoRef.current.play().catch(mutedError => {
                console.log('Muted video play also failed:', mutedError);
                // 恢复原来的静音状态
                if (videoRef.current) {
                  videoRef.current.muted = wasMuted;
                }
              });
            }
          });
        }
      },
      muteVideo: () => {
        if (videoRef.current) {
          videoRef.current.muted = true;
        }
      },
      unmuteVideo: () => {
        if (videoRef.current) {
          videoRef.current.muted = false;
        }
      }
    }));

    useEffect(() => {
      // 检查视频文件是否存在
      const checkVideo = async () => {
        try {
          const response = await fetch('/videos/93cut.mp4', { method: 'HEAD' });
          if (response.ok) {
            setVideoLoaded(true);
          } else {
            setVideoError(true);
          }
        } catch (error) {
          setVideoError(true);
        }
      };

      checkVideo();
    }, []);

    // 视频加载完成后尝试播放
    useEffect(() => {
      if (videoLoaded && videoRef.current) {
        // 添加一个小延迟以确保DOM完全渲染
        const timer = setTimeout(() => {
          if (videoRef.current) {
            // 尝试正常播放，如果失败则尝试静音播放
            videoRef.current.play().catch(error => {
              console.log('Auto-play failed:', error);
              // 如果正常播放失败，尝试静音后播放
              if (videoRef.current) {
                const wasMuted = videoRef.current.muted;
                videoRef.current.muted = true;
                videoRef.current.play().catch(mutedError => {
                  console.log('Muted auto-play also failed:', mutedError);
                  // 恢复原来的静音状态
                  if (videoRef.current) {
                    videoRef.current.muted = wasMuted;
                  }
                });
              }
            });
          }
        }, 100);

        return () => clearTimeout(timer);
      }
    }, [videoLoaded]);

    if (videoError || !videoLoaded) {
      // 回退到渐变背景
      return (
        <div className={`absolute inset-0 ${className}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/70 via-black/60 to-yellow-900/70"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiPjxwYXRoIGQ9Im0wIDBoMTAwdjEwMEgweiIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Im0wIDBoNTB2NTBIMHptNTAgNTBoNTB2NTBINTB6IiBmaWxsPSIjMTExIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')] opacity-10"></div>
        </div>
      );
    }

    return (
      <div className={`absolute inset-0 ${className}`}>
        <video
          ref={videoRef}
          autoPlay
          muted={false}
          loop
          playsInline
          className="w-full h-full object-cover opacity-50"
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoError(true)}
        >
          <source src="/videos/93cut.mp4" type="video/mp4" />
        </video>
        {/* 视频覆盖层 */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/60 via-black/50 to-yellow-900/60"></div>
      </div>
    );
  }
);

VideoBackground.displayName = 'VideoBackground';

export default VideoBackground;