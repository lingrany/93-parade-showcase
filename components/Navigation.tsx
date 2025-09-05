'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const navigationItems = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/timeline', label: 'Timeline', icon: '📅' },
  { href: '/gallery', label: 'Gallery', icon: '📸' }
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* 底部固定导航 */}
      <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="bg-black/90 backdrop-blur-md rounded-full px-4 py-3 border border-red-500/30 shadow-2xl"
        >
          <div className="flex items-center gap-2 md:gap-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-full transition-all duration-300 ${
                  pathname === item.href
                    ? 'bg-red-600 text-white shadow-lg scale-110'
                    : 'text-gray-300 hover:text-white hover:bg-red-600/20 hover:scale-105'
                }`}
              >
                <span className="text-lg md:text-xl">{item.icon}</span>
                <span className="hidden sm:block font-medium text-sm md:text-base">{item.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </nav>


    </>
  );
}