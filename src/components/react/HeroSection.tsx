import DeskScene from "./DeskScene";
import { motion } from "framer-motion";
import { SITE } from "../../lib/constants";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 背景微光 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(226,166,61,0.06)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(78,205,196,0.04)_0%,_transparent_50%)]" />

      {/* 全屏 3D 场景 */}
      <div className="absolute inset-0">
        <DeskScene />
      </div>

      {/* 顶部名字 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute left-8 top-24 z-10 lg:left-12"
      >
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.25em] text-[var(--color-accent-teal)]">
          Welcome to my workspace
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-text-primary)] lg:text-4xl">
          {SITE.author}
          <span className="text-[var(--color-accent-gold)]">.</span>
        </h1>
      </motion.div>

      {/* 底部提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs tracking-wider text-[var(--color-text-muted)]">
            悬停探索 · 点击物品进入对应页面
          </p>
        </div>
      </motion.div>
    </section>
  );
}
