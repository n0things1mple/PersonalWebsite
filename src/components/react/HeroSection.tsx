import { AuroraBackground } from "../ui/aurora-background";
import { Spotlight } from "../ui/spotlight";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { TypewriterEffect } from "../ui/typewriter-effect";
import { motion } from "framer-motion";
import { SITE } from "../../lib/constants";

export default function HeroSection() {
  return (
    <section className="group relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* 极光背景 */}
      <AuroraBackground className="absolute inset-0" />

      {/* 鼠标跟随光效 */}
      <Spotlight size={500} />

      {/* 底部渐变过渡到主背景色 */}
      <div className="absolute bottom-0 left-0 right-0 z-[3] h-32 bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent" />

      {/* 内容 */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* 顶部小标签 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-accent-cyan)]"
        >
          Welcome to my world
        </motion.p>

        {/* 主标题 — 逐字生成 */}
        <h1
          className="mb-4 font-[family-name:var(--font-display)] font-bold leading-[1.05] tracking-tight"
          style={{ fontSize: "var(--text-hero)" }}
        >
          <TextGenerateEffect words={`Hi, I'm`} delay={600} />
          <br />
          <span
            className="inline-block bg-gradient-to-r from-[var(--color-accent-violet)] via-[var(--color-accent-pink)] to-[var(--color-accent-cyan)] bg-clip-text text-transparent"
          >
            <TextGenerateEffect words={SITE.author} delay={1000} />
          </span>
        </h1>

        {/* 打字机角色循环 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="mb-8 h-8 text-xl text-[var(--color-text-secondary)]"
        >
          <TypewriterEffect words={[...SITE.roles]} typingSpeed={70} pauseTime={2500} />
        </motion.div>

        {/* 简介文字 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.2 }}
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)]"
        >
          {SITE.description}
        </motion.p>

        {/* CTA 按钮组 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="/projects"
            className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-8 py-3.5 font-medium text-white transition-all duration-300"
          >
            {/* 按钮渐变背景 */}
            <span className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-violet)] to-[var(--color-accent-pink)]" />
            {/* 按钮悬停光效 */}
            <span className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-pink)] to-[var(--color-accent-violet)] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
            {/* 外发光 */}
            <span className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[var(--color-accent-violet)] to-[var(--color-accent-pink)] opacity-0 blur-lg transition-opacity duration-300 group-hover/btn:opacity-40" />
            <span className="relative">查看作品</span>
            <svg className="relative h-4 w-4 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>

          <a
            href="/about"
            className="group/btn relative inline-flex items-center gap-2 rounded-xl border border-[var(--color-border-hover)] px-8 py-3.5 font-medium text-[var(--color-text-secondary)] transition-all duration-300 hover:border-[var(--color-accent-violet)] hover:text-white hover:shadow-[0_0_20px_rgba(124,58,237,0.2)]"
          >
            <span className="absolute inset-0 rounded-xl bg-[var(--color-accent-violet)] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-10" />
            <span className="relative">了解我</span>
          </a>
        </motion.div>
      </div>

      {/* 底部滚动指示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 0.6 }}
        className="absolute bottom-12 left-1/2 z-10 -translate-x-1/2"
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
              className="h-1.5 w-1 rounded-full bg-[var(--color-accent-violet)]"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
