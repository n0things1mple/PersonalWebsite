import DeskScene from "./DeskScene";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { TypewriterEffect } from "../ui/typewriter-effect";
import { motion } from "framer-motion";
import { SITE } from "../../lib/constants";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden lg:flex-row">
      {/* 背景微光 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(226,166,61,0.08)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(78,205,196,0.06)_0%,_transparent_50%)]" />

      {/* 左侧: 文字内容 */}
      <div className="relative z-10 flex w-full flex-col justify-center px-8 pt-28 lg:w-[45%] lg:pl-[6%] lg:pt-0">
        {/* 顶部小标签 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-accent-teal)]"
        >
          Welcome to my workspace
        </motion.p>

        {/* 主标题 */}
        <h1
          className="mb-3 font-[family-name:var(--font-display)] font-bold leading-[1.05] tracking-tight"
          style={{ fontSize: "var(--text-hero)" }}
        >
          <TextGenerateEffect words={`Hi, I'm`} delay={400} />
          <br />
          <span className="inline-block bg-gradient-to-r from-[var(--color-accent-gold)] via-[var(--color-accent-coral)] to-[var(--color-accent-teal)] bg-clip-text text-transparent">
            <TextGenerateEffect words={SITE.author} delay={800} />
          </span>
        </h1>

        {/* 打字机角色 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mb-6 h-8 text-xl text-[var(--color-text-secondary)]"
        >
          <TypewriterEffect words={[...SITE.roles]} typingSpeed={70} pauseTime={2500} />
        </motion.div>

        {/* 简介 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.9 }}
          className="mb-8 max-w-md text-base leading-relaxed text-[var(--color-text-secondary)]"
        >
          {SITE.description}
        </motion.p>

        {/* CTA 按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.2 }}
          className="flex flex-wrap items-center gap-4"
        >
          <a
            href="/projects"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-7 py-3 font-medium text-[var(--color-bg-primary)] transition-all duration-300"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-gold)] to-[var(--color-accent-coral)]" />
            <span className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[var(--color-accent-gold)] to-[var(--color-accent-coral)] opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-40" />
            <span className="relative font-semibold">查看作品</span>
            <svg className="relative h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="/about"
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border-hover)] px-7 py-3 font-medium text-[var(--color-text-secondary)] transition-all duration-300 hover:border-[var(--color-accent-gold)] hover:text-[var(--color-text-primary)]"
          >
            了解我
          </a>
        </motion.div>
      </div>

      {/* 右侧: 3D 工作台场景 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative h-[50vh] w-full lg:h-screen lg:w-[55%]"
      >
        <DeskScene />
        {/* 提示文字 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.6 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-[var(--color-text-muted)] lg:bottom-8"
        >
          拖拽旋转 · 悬停探索
        </motion.p>
      </motion.div>

      {/* 底部滚动指示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 lg:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest text-[var(--color-text-muted)]">SCROLL</span>
          <div className="flex h-8 w-5 items-start justify-center rounded-full border border-[var(--color-border-hover)] p-1">
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1 rounded-full bg-[var(--color-accent-gold)]"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
