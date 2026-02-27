import { ScrollReveal } from "../ui/scroll-reveal";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SITE } from "../../lib/constants";

// 统计数据
const STATS = [
  { value: "3+", label: "年经验" },
  { value: "20+", label: "完成项目" },
  { value: "10K+", label: "代码提交" },
  { value: "5+", label: "技术栈" },
];

function AnimatedStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-accent-gold)]">
        {value}
      </div>
      <div className="mt-1 text-sm text-[var(--color-text-muted)]">{label}</div>
    </motion.div>
  );
}

export default function AboutPreview() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* 背景装饰 */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2">
        <div className="h-[500px] w-[500px] rounded-full bg-[var(--color-accent-gold)] opacity-[0.03] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* 左侧: 头像区域 */}
          <ScrollReveal direction="left">
            <div className="relative mx-auto max-w-md lg:mx-0">
              {/* 头像外框装饰 */}
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]">
                {/* 渐变占位 — 之后替换为真实头像 */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-gold)] via-[var(--color-bg-elevated)] to-[var(--color-accent-coral)] opacity-30" />
                <div className="flex h-full items-center justify-center">
                  <span className="font-[family-name:var(--font-display)] text-8xl font-bold text-[var(--color-text-primary)] opacity-20">
                    {SITE.author.charAt(0)}
                  </span>
                </div>
                {/* 角落装饰 */}
                <div className="absolute -right-2 -top-2 h-24 w-24 rounded-full bg-[var(--color-accent-gold)] opacity-20 blur-2xl" />
                <div className="absolute -bottom-2 -left-2 h-20 w-20 rounded-full bg-[var(--color-accent-coral)] opacity-20 blur-2xl" />
              </div>
              {/* 浮动标签 */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 top-8 rounded-xl bg-[var(--color-bg-secondary)] px-4 py-2 shadow-lg border border-[var(--color-border-default)]"
              >
                <span className="text-2xl">👋</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-4 bottom-12 rounded-xl bg-[var(--color-bg-secondary)] px-4 py-2 shadow-lg border border-[var(--color-border-default)]"
              >
                <span className="text-sm text-[var(--color-accent-teal)]">{"<Code />"}</span>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* 右侧: 文字和统计 */}
          <div>
            <ScrollReveal direction="right">
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-accent-teal)]">
                About Me
              </p>
              <h2
                className="mb-6 font-[family-name:var(--font-display)] font-bold"
                style={{ fontSize: "var(--text-title)" }}
              >
                关于<span className="bg-gradient-to-r from-[var(--color-accent-gold)] to-[var(--color-accent-coral)] bg-clip-text text-transparent">我</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1}>
              <p className="mb-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
                我是一名热爱技术与创意的开发者，专注于构建美观且实用的数字产品。
                从前端交互到后端架构，我享受将想法转化为现实的每一个过程。
              </p>
              <p className="mb-8 text-lg leading-relaxed text-[var(--color-text-secondary)]">
                工作之余，我喜欢探索新技术、拍摄视频，并通过博客分享我的学习心得。
              </p>
            </ScrollReveal>

            {/* 统计数据 */}
            <ScrollReveal direction="right" delay={0.2}>
              <div className="mb-8 grid grid-cols-4 gap-4 rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6">
                {STATS.map((stat, i) => (
                  <AnimatedStat key={stat.label} {...stat} delay={0.3 + i * 0.1} />
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.3}>
              <a
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-bg-elevated)] px-6 py-3 font-medium text-[var(--color-text-primary)] transition-all duration-300 hover:bg-[var(--color-accent-gold)] hover:shadow-[0_0_20px_rgba(226,166,61,0.3)]"
              >
                了解更多
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
