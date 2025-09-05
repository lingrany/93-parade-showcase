'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { useAudio } from '../../hooks/useAudio';

// 所有图片数据
const allPhotos = [
  {
    id: 1,
    title: "DF-5C Strategic Missile",
    image: "/images/DF-5C_01.jpg",
    description: "China's advanced strategic intercontinental ballistic missile system"
  },
  {
    id: 2,
    title: "Military Formation",
    image: "/images/difference.jpg", 
    description: "Precision military formation during the Victory Day Parade"
  },
  {
    id: 3,
    title: "Parade Formation 02",
    image: "/images/fxs02.jpg",
    description: "Spectacular military parade formation showcase"
  },
  {
    id: 4,
    title: "Parade Formation 03", 
    image: "/images/fxs03.jpg",
    description: "Elite military units in perfect synchronization"
  },
  {
    id: 5,
    title: "Parade Formation 04",
    image: "/images/fxs04.jpg",
    description: "Ceremonial military parade demonstration"
  },
  {
    id: 6,
    title: "Parade Formation 05",
    image: "/images/fxs05.jpg",
    description: "Victory Day Parade commemorative formation"
  },
  {
    id: 7,
    title: "Parade Formation 06",
    image: "/images/fxs06.jpg",
    description: "Historical military parade documentation"
  },
  {
    id: 8,
    title: "Parade Formation 07",
    image: "/images/fxs07.jpg",
    description: "80th Anniversary Victory Day celebration"
  },
  {
    id: 9,
    title: "Victory Day Commemoration",
    image: "/images/girl_93.jpg",
    description: "Commemorating the victory in the War of Resistance"
  }
];

interface GalleryImage {
  id: number;
  title: string;
  image: string;
  description: string;
}

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  
  // 使用音频Hook
  const { play, pause, setVolume } = useAudio('/videos/93cut - Converted with FlexClip.mp3');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/20 to-black"></div>
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            ALL Photos
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Commemorating 80 Years of Victory - Historical Documentation
          </motion.p>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedImage(photo)}
              >
                <div className="relative overflow-hidden rounded-lg bg-gray-900 aspect-[4/3]">
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-bold text-white mb-2">{photo.title}</h3>
                      <p className="text-sm text-gray-300">{photo.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            className="relative max-w-4xl max-h-[90vh] bg-gray-900 rounded-lg overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
              
              <div className="relative h-96 md:h-[500px]">
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3">{selectedImage.title}</h3>
                <p className="text-gray-300">{selectedImage.description}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}