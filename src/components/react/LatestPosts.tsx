import { ScrollReveal, StaggerContainer, StaggerItem } from "../ui/scroll-reveal";

// 示例博客数据 — 后续用 Content Collections 动态获取
const DEMO_POSTS = [
  {
    title: "从零开始搭建个人网站：Astro + Tailwind 实战",
    description: "记录我使用 Astro 框架和 Tailwind CSS 搭建个人作品集网站的全过程，包括技术选型、设计系统搭建和部署上线。",
    date: "2026-02-27",
    tags: ["Astro", "Tailwind", "教程"],
    readTime: "8 分钟",
  },
  {
    title: "2026 年前端开发趋势展望",
    description: "分析当前前端技术栈的发展方向，从框架选型到 AI 辅助开发，探讨未来的可能性。",
    date: "2026-02-20",
    tags: ["前端", "趋势", "AI"],
    readTime: "6 分钟",
  },
  {
    title: "用 Framer Motion 打造丝滑动画体验",
    description: "深入讲解 Framer Motion 在 React 项目中的实战应用，从基础动画到复杂交互效果。",
    date: "2026-02-15",
    tags: ["React", "动画", "Framer Motion"],
    readTime: "10 分钟",
  },
];

export default function LatestPosts() {
  return (
    <section className="relative py-24">
      {/* 背景装饰 */}
      <div className="absolute right-0 top-0">
        <div className="h-[400px] w-[400px] rounded-full bg-[var(--color-accent-pink)] opacity-[0.03] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <p className="mb-2 text-center text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-accent-cyan)]">
            Blog
          </p>
          <h2
            className="mb-4 text-center font-[family-name:var(--font-display)] font-bold"
            style={{ fontSize: "var(--text-display)" }}
          >
            <span className="bg-gradient-to-r from-[var(--color-accent-cyan)] to-[var(--color-accent-violet)] bg-clip-text text-transparent">
              最新文章
            </span>
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-center text-[var(--color-text-secondary)]">
            分享我的技术探索、项目心得和学习笔记。
          </p>
        </ScrollReveal>

        <StaggerContainer staggerDelay={0.12} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DEMO_POSTS.map((post) => (
            <StaggerItem key={post.title}>
              <a
                href="/blog"
                className="group flex h-full flex-col rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6 transition-all duration-300 hover:border-[var(--color-accent-violet)] hover:shadow-[0_0_30px_rgba(124,58,237,0.12)]"
              >
                {/* 日期和阅读时间 */}
                <div className="mb-3 flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                  <time>{post.date}</time>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>

                {/* 标题 */}
                <h3 className="mb-3 font-[family-name:var(--font-display)] text-lg font-semibold leading-snug text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-accent-violet)]">
                  {post.title}
                </h3>

                {/* 描述 */}
                <p className="mb-4 flex-grow text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {post.description}
                </p>

                {/* 标签 */}
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[var(--color-bg-elevated)] px-2.5 py-0.5 text-xs text-[var(--color-accent-cyan)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 阅读更多箭头 */}
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[var(--color-accent-violet)] opacity-0 transition-all duration-300 group-hover:opacity-100">
                  阅读更多
                  <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal delay={0.4}>
          <div className="mt-10 text-center">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent-violet)] transition-colors hover:text-[var(--color-accent-pink)]"
            >
              查看全部文章
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
