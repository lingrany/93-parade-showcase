'use client';
import { motion } from 'framer-motion';
import CountUp from './CountUp';
import { useLanguage } from '../app/hooks/useLanguage';

export default function ParadeStats() {
  const { language } = useLanguage();
  const combatGroups = [
    {
      name: "INFANTRY",
      description: "Elite ground forces showcasing precision and discipline",
      color: "from-red-500 to-red-700"
    },
    {
      name: "ARMOR",
      description: "Advanced tank formations and armored vehicles",
      color: "from-orange-500 to-red-600"
    },
    {
      name: "ARTILLERY",
      description: "Long-range precision strike capabilities",
      color: "from-yellow-500 to-orange-600"
    },
    {
      name: "AIR DEFENSE",
      description: "Comprehensive sky protection systems",
      color: "from-green-500 to-yellow-600"
    },
    {
      name: "NAVAL",
      description: "Maritime power projection forces",
      color: "from-blue-500 to-green-600"
    },
    {
      name: "AEROSPACE",
      description: "Air superiority and space capabilities",
      color: "from-indigo-500 to-blue-600"
    },
    {
      name: "STRATEGIC",
      description: "Nuclear deterrent and strategic forces",
      color: "from-purple-500 to-indigo-600"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Official Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
              {language === 'en' ? 'Official Parade Statistics' : '官方阅兵统计数据'}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            {language === 'en' 
              ? 'Commemorating 80 years of victory with unprecedented scale and precision'
              : '以前所未有的规模和精度纪念胜利80周年'
            }
          </p>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-red-500 mb-2">
                <CountUp end={12000} duration={2} />+
              </div>
              <div className="text-gray-300 text-sm md:text-base">
                {language === 'en' ? 'Personnel' : '参阅人员'}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">
                <CountUp end={580} duration={2} />+
              </div>
              <div className="text-gray-300 text-sm md:text-base">
                {language === 'en' ? 'Equipment' : '装备'}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-blue-500 mb-2">
                <CountUp end={160} duration={2} />+
              </div>
              <div className="text-gray-300 text-sm md:text-base">
                {language === 'en' ? 'Aircraft' : '飞机'}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-green-500 mb-2">
                <CountUp end={70} duration={2} />
              </div>
              <div className="text-gray-300 text-sm md:text-base">
                {language === 'en' ? 'Minutes' : '分钟'}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Seven Combat Groups */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
              {language === 'en' ? 'Seven Combat Groups' : '七大作战群'}
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {combatGroups.map((group, index) => (
              <motion.div
                key={group.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-xl p-6 border border-gray-700/50 hover:border-red-500/40 transition-all duration-300"
              >
                <div className={`text-3xl font-black mb-4 bg-gradient-to-r ${group.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                  {group.name}
                </div>
                <h4 className="text-lg font-bold text-white mb-3">{group.name} Forces</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {group.description}
                </p>
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-yellow-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}