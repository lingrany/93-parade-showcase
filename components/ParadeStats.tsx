'use client';
import { motion } from 'framer-motion';
import CountUp from './CountUp';

export default function ParadeStats() {
  const stats = [
    {
      number: 70,
      suffix: " min",
      label: "Total Duration",
      labelZh: "阅兵总时长",
      color: "red",
      description: "Complete parade broadcast"
    },
    {
      number: 45,
      suffix: "",
      label: "Total Formations",
      labelZh: "方梯队总数",
      color: "yellow",
      description: "Including all military units"
    },
    {
      number: 27,
      suffix: "",
      label: "Equipment Formations",
      labelZh: "装备方队",
      color: "red",
      description: "Ground equipment displays"
    },
    {
      number: 500,
      suffix: "+",
      label: "Equipment Units",
      labelZh: "参阅装备",
      color: "yellow",
      description: "Total military hardware"
    },
    {
      number: 12000,
      suffix: "+",
      label: "Personnel",
      labelZh: "参阅官兵",
      color: "red",
      description: "Including veterans and honor guards"
    },
    {
      number: 84,
      suffix: "%",
      label: "New Equipment",
      labelZh: "新型装备",
      color: "yellow",
      description: "First public appearance"
    }
  ];

  return (
    <section className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
              Official Parade Statistics
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            Comprehensive data from the 2025 Victory Day Parade
          </p>
          <p className="text-sm text-gray-400">
            Source: Ministry of National Defense, People&apos;s Daily, CCTV News
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`text-center p-6 bg-gradient-to-br ${
                stat.color === 'red' 
                  ? 'from-red-900/20 to-red-800/10 border-red-500/20' 
                  : 'from-yellow-900/20 to-yellow-800/10 border-yellow-500/20'
              } rounded-xl border hover:border-opacity-40 transition-all duration-300 group`}
            >
              <div className={`text-3xl md:text-4xl font-bold mb-3 ${
                stat.color === 'red' ? 'text-red-500' : 'text-yellow-500'
              }`}>
                <CountUp end={stat.number} suffix={stat.suffix} />
              </div>
              <div className="text-gray-300 text-lg font-semibold mb-1">
                {stat.label}
              </div>
              <div className="text-gray-500 text-sm mb-2">
                {stat.labelZh}
              </div>
              <div className="text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 7大作战群展示 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
              Seven Combat Groups
            </span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { name: "Land Combat", nameZh: "陆上作战群", formations: 4, icon: "GROUND", color: "from-red-500 to-red-700" },
              { name: "Naval Combat", nameZh: "海上作战群", formations: 3, icon: "NAVAL", color: "from-blue-500 to-blue-700" },
              { name: "Air Defense", nameZh: "防空反导群", formations: 4, icon: "SHIELD", color: "from-green-500 to-green-700" },
              { name: "Information Warfare", nameZh: "信息作战群", formations: 3, icon: "CYBER", color: "from-purple-500 to-purple-700" },
              { name: "Unmanned Systems", nameZh: "无人作战群", formations: 5, icon: "DRONE", color: "from-orange-500 to-orange-700" },
              { name: "Logistics Support", nameZh: "后装保障群", formations: 4, icon: "SUPPLY", color: "from-yellow-500 to-yellow-700" },
              { name: "Strategic Strike", nameZh: "战略打击群", formations: 4, icon: "STRIKE", color: "from-indigo-500 to-indigo-700" }
            ].map((group, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/50 hover:border-red-500/30 transition-all duration-300 text-center group"
              >
                <div className={`text-2xl font-black mb-4 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r ${group.color} bg-clip-text text-transparent`}>
                  {group.icon}
                </div>
                <h4 className="text-white font-bold text-lg mb-2">{group.name}</h4>
                <p className="text-gray-400 text-sm mb-3">{group.nameZh}</p>
                <div className="text-red-400 font-semibold">
                  {group.formations} Formations
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}