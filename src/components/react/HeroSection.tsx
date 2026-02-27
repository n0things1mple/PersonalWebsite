import DeskScene from "./DeskScene";
import { motion } from "framer-motion";
import { SITE } from "../../lib/constants";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden" style={{ background: "linear-gradient(to bottom, #FFE0B0, #FFF5E8)" }}>
      {/* 全屏 3D 场景 */}
      <div className="absolute inset-0">
        <DeskScene />
      </div>

      {/* 左上角名字 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute left-8 top-8 z-10 lg:left-12"
      >
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.25em] text-amber-600/80">
          Welcome to my workspace
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-700 lg:text-4xl">
          {SITE.author}
          <span className="text-amber-500">.</span>
        </h1>
      </motion.div>

      {/* 底部提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <p className="text-xs tracking-wider text-amber-700/40">
          悬停探索 · 点击物品进入对应页面
        </p>
      </motion.div>
    </section>
  );
}
