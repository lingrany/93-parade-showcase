'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAudio } from '../../hooks/useAudio';

// 2025年阅兵装备数据（基于官方资料）
const equipmentData = {
  "airForce": {
    "name": "Air Force Equipment",
    "description": "Advanced aerial platforms showcasing China's air superiority capabilities",
    "equipment": [
      {
        "name": "J-20S Twin-Seat Stealth Fighter",
        "type": "Fifth-Generation Fighter",
        "description": "World's first twin-seat stealth fighter. Rear seat serves as mission commander, capable of directing 6 Attack-11 or other loyal wingman drones.",
        "specifications": {
          "Combat Radius": ">2000 km",
          "Max Speed": "1.6 Mach (with WS-15 engine)",
          "Role": "Air Superiority & Command"
        },
        "image": "/images/equipment/j20s.jpg"
      },
      {
        "name": "J-35 Naval Stealth Fighter",
        "type": "Carrier-Based Fighter",
        "description": "Navy's first carrier-based fifth-generation fighter, mixed deployment with J-15T, marking China's entry into stealth carrier aviation era.",
        "specifications": {
          "Platform": "Aircraft Carrier",
          "Generation": "Fifth-Gen Stealth",
          "Role": "Naval Air Superiority"
        },
        "image": "/images/equipment/j35.jpg"
      },
      {
        "name": "J-15T Catapult Fighter",
        "type": "Multi-Role Carrier Fighter",
        "description": "Enhanced landing gear with catapult tow bar, dual-mode ski-jump/electromagnetic takeoff capability, significantly improved payload and sortie rate.",
        "specifications": {
          "Takeoff": "Ski-jump/Electromagnetic",
          "Enhancement": "Strengthened Landing Gear",
          "Capability": "Increased Payload"
        },
        "image": "/images/equipment/j15t.jpg"
      },
      {
        "name": "KJ-600 Carrier AEW Aircraft",
        "type": "Airborne Early Warning",
        "description": "Y-20 platform derivative with circular active phased array radar, providing 200+ km early warning coverage for carrier battle groups.",
        "specifications": {
          "Platform": "Y-20 Derivative",
          "Radar": "Active Phased Array",
          "Coverage": "200+ km"
        },
        "image": "/images/equipment/kj600.jpg"
      }
    ]
  },
  "missiles": {
    "name": "Strategic Missiles",
    "description": "Advanced missile systems representing China's strategic deterrence capabilities",
    "equipment": [
      {
        "name": "DF-61 ICBM (First Public Display)",
        "type": "Intercontinental Ballistic Missile",
        "description": "Land-based ICBM completing China's nuclear triad alongside DF-31, JL-3, and Jinglei-1 air-based long-range missiles.",
        "specifications": {
          "Type": "Land-Based ICBM",
          "Significance": "Nuclear Triad Completion",
          "Status": "First Public Appearance"
        },
        "image": "/images/equipment/df61.jpg"
      },
      {
        "name": "DF-5C Enhanced ICBM",
        "type": "Liquid-Fuel ICBM",
        "description": "Liquid-fuel intercontinental missile with >15,000 km range, grand finale appearance receiving thunderous applause.",
        "specifications": {
          "Range": ">15,000 km",
          "Fuel": "Liquid Propellant",
          "Position": "Parade Finale"
        },
        "image": "/images/equipment/df5c.jpg"
      },
      {
        "name": "KD-21 Hypersonic Missile",
        "type": "Air-Launched Hypersonic",
        "description": "H-6K mounted, >5 Mach speed, waverider warhead, ~3 tons weight, specialized for slow/fixed high-value targets.",
        "specifications": {
          "Speed": ">5 Mach",
          "Weight": "~3 tons",
          "Platform": "H-6K Bomber"
        },
        "image": "/images/equipment/kd21.jpg"
      },
      {
        "name": "HQ-26/HQ-29 Defense System",
        "type": "Anti-Ballistic Missile",
        "description": "Sea/land-based midcourse interception system capable of direct kinetic kill against ballistic missiles.",
        "specifications": {
          "Platform": "Sea/Land-Based",
          "Capability": "Midcourse Interception",
          "Method": "Direct Kinetic Kill"
        },
        "image": "/images/equipment/hq26.jpg"
      }
    ]
  },
  "naval": {
    "name": "Naval Systems",
    "description": "Advanced naval platforms and weapons systems",
    "equipment": [
      {
        "name": "Type 076 'Sichuan' Drone Carrier",
        "type": "Large Unmanned Attack Vessel",
        "description": "Electromagnetic catapult launch capability, includes stealth attack drones and ASW drones, realizing 'drone carrier' concept.",
        "specifications": {
          "Launch": "Electromagnetic Catapult",
          "Drones": "Stealth Attack & ASW",
          "Concept": "Drone Carrier"
        },
        "image": "/images/equipment/076.jpg"
      },
      {
        "name": "Orca Large USV + New UUV",
        "type": "Unmanned Maritime Systems",
        "description": "Modular payload capability, can deploy smart mines, launch torpedoes, conduct electronic warfare, mine countermeasures, and anti-ship strikes.",
        "specifications": {
          "Configuration": "Modular Payload",
          "Capabilities": "Multi-Mission",
          "Weapons": "Mines, Torpedoes"
        },
        "image": "/images/equipment/orca.jpg"
      },
      {
        "name": "YJ-17/YJ-20/YJ-19 Anti-Ship Trinity",
        "type": "Anti-Ship Missile Family",
        "description": "Equipped on large/medium surface vessels, air-based, and submarine platforms respectively, forming three-dimensional anti-ship fire network.",
        "specifications": {
          "YJ-17": "Surface Vessels",
          "YJ-20": "Air-Based Platform",
          "YJ-19": "Submarine Platform"
        },
        "image": "/images/equipment/yj-trinity.jpg"
      },
      {
        "name": "Naval Laser Weapon System",
        "type": "Directed Energy Weapon",
        "description": "Forms far-medium-close three-layer anti-missile network with HHQ-9C/16C/10A, first public demonstration.",
        "specifications": {
          "Integration": "Three-Layer Defense",
          "Status": "First Public Display",
          "Type": "Laser Cannon"
        },
        "image": "/images/equipment/laser.jpg"
      }
    ]
  },
  "groundSystems": {
    "name": "Ground Systems",
    "description": "Advanced ground-based equipment and unmanned systems",
    "equipment": [
      {
        "name": "Type 191 Modular Rocket System",
        "type": "Long-Range Rocket Artillery",
        "description": "Compatible with 300-750mm projectiles, rocket artillery cost with ballistic missile precision, range >500 km.",
        "specifications": {
          "Caliber": "300-750mm Compatible",
          "Range": ">500 km",
          "Precision": "Ballistic Missile Level"
        },
        "image": "/images/equipment/191.jpg"
      },
      {
        "name": "Mechanical Wolf & Dog Units",
        "type": "Quadruped Robots",
        "description": "Four-legged robots for mountain infantry support, interchangeable reconnaissance/attack/support modules.",
        "specifications": {
          "Type": "Quadruped Robot",
          "Role": "Infantry Support",
          "Modules": "Recon/Attack/Support"
        },
        "image": "/images/equipment/robot.jpg"
      }
    ]
  },
  "strategicStrike": {
    "name": "战略打击装备方队",
    "description": "维护国家安全的战略威慑力量",
    "equipment": [
      {
        "name": "东风-41洲际弹道导弹",
        "type": "洲际弹道导弹",
        "description": "中国最先进的陆基机动洲际弹道导弹",
        "specifications": {
          "射程": "14000km+",
          "弹头": "多弹头分导",
          "发射方式": "公路机动",
          "精度": "CEP<100m"
        },
        "image": "/images/equipment/df41-icbm.jpg"
      }
    ]
  }
};

export default function EquipmentPage() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof equipmentData>('airForce');
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null);
  const [backgroundImage, setBackgroundImage] = useState('');
  
  // 使用音频Hook
  const { play, pause, setVolume } = useAudio('/videos/93cut - Converted with FlexClip.mp3');

  const categories = Object.keys(equipmentData) as (keyof typeof equipmentData)[];

  // 随机背景图片
  const backgroundImages = [
    '/images/DF-5C_01.jpg',
    '/images/difference.jpg', 
    '/images/fxs02.jpg',
    '/images/fxs03.jpg',
    '/images/fxs04.jpg',
    '/images/fxs05.jpg',
    '/images/fxs06.jpg',
    '/images/fxs07.jpg',
    '/images/girl_93.jpg'
  ];

  useEffect(() => {
    // 随机选择背景图片
    const randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    setBackgroundImage(randomImage);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* 背景图片 */}
      {backgroundImage && (
        <div className="fixed inset-0 z-0">
          <img
            src={backgroundImage}
            alt="Background"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-red-900/60 to-black/80" />
        </div>
      )}

      {/* 页面头部 */}
      <section className="relative z-10 py-20 bg-gradient-to-b from-red-900/20 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
                Military Equipment 2025
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Discover the cutting-edge military systems debuting at China&apos;s 80th Victory Day Parade
            </p>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
              Back to Home
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 装备分类导航 */}
      <section className="py-8 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {equipmentData[category].name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 装备展示区域 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              {equipmentData[selectedCategory].name}
            </h2>
            <p className="text-gray-300 text-lg">
              {equipmentData[selectedCategory].description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {equipmentData[selectedCategory].equipment.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-red-500/20 hover:border-red-500/40 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedEquipment(item)}
              >
                {/* 装备图片占位符 */}
                <div className="h-48 bg-gradient-to-br from-red-900/30 to-yellow-900/30 flex items-center justify-center">
                  <div className="text-6xl">🚀</div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                  <p className="text-red-400 text-sm mb-3">{item.type}</p>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {item.description}
                  </p>
                  
                  {/* 关键规格 */}
                  <div className="space-y-2">
                    {Object.entries(item.specifications).slice(0, 2).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-gray-400">{key}:</span>
                        <span className="text-white font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="mt-4 w-full py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-lg text-red-400 text-sm transition-colors">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 装备详情模态框 */}
      {selectedEquipment && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedEquipment(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {selectedEquipment.name}
                  </h3>
                  <p className="text-red-400">{selectedEquipment.type}</p>
                </div>
                <button
                  onClick={() => setSelectedEquipment(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>
              
              {/* 装备图片占位符 */}
              <div className="h-64 bg-gradient-to-br from-red-900/30 to-yellow-900/30 rounded-lg flex items-center justify-center mb-6">
                <div className="text-white text-xl font-bold">Equipment Image</div>
              </div>
              
              <p className="text-gray-300 mb-6">{selectedEquipment.description}</p>
              
              {/* 详细规格 */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-4">Technical Specifications</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(selectedEquipment.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-400">{key}:</span>
                      <span className="text-white font-semibold">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}