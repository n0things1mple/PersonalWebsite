import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { ScrollReveal, StaggerContainer, StaggerItem } from "../ui/scroll-reveal";

// 示例项目数据 — 后续用 Content Collections 动态获取替换
const FEATURED_PROJECTS = [
  {
    title: "AI 智能助手",
    description: "基于大语言模型的智能对话系统，支持多轮对话、上下文理解和知识检索。",
    tags: ["React", "TypeScript", "LLM", "Node.js"],
    image: "",
    href: "/projects",
    className: "sm:col-span-2 sm:row-span-2",
  },
  {
    title: "创意设计平台",
    description: "在线协作设计工具，支持实时多人编辑和版本管理。",
    tags: ["Vue", "Canvas", "WebSocket"],
    image: "",
    href: "/projects",
    className: "",
  },
  {
    title: "数据可视化仪表盘",
    description: "实时数据监控和可视化分析平台，支持自定义图表。",
    tags: ["D3.js", "Python", "FastAPI"],
    image: "",
    href: "/projects",
    className: "",
  },
  {
    title: "移动端 App",
    description: "跨平台移动应用，流畅的原生体验。",
    tags: ["React Native", "TypeScript"],
    image: "",
    href: "/projects",
    className: "",
  },
  {
    title: "开源组件库",
    description: "一套精心设计的 UI 组件库，注重可访问性和开发体验。",
    tags: ["React", "Storybook", "CSS"],
    image: "",
    href: "/projects",
    className: "sm:col-span-2",
  },
];

// 项目图标占位 — 当没有图片时显示
function ProjectIconPlaceholder({ index }: { index: number }) {
  const icons = [
    // 机器人
    <svg key={0} className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h9a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0015.75 4.5h-9A2.25 2.25 0 004.5 6.75v10.5A2.25 2.25 0 006.75 19.5zm.75-12h7.5m-7.5 3h7.5m-7.5 3h7.5" /></svg>,
    // 画笔
    <svg key={1} className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>,
    // 图表
    <svg key={2} className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
    // 手机
    <svg key={3} className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>,
    // 代码
    <svg key={4} className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>,
  ];
  return icons[index % icons.length];
}

export default function FeaturedProjects() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24">
      <ScrollReveal>
        <p className="mb-2 text-center text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-accent-cyan)]">
          Portfolio
        </p>
        <h2
          className="mb-4 text-center font-[family-name:var(--font-display)] font-bold"
          style={{ fontSize: "var(--text-display)" }}
        >
          <span className="bg-gradient-to-r from-[var(--color-accent-violet)] to-[var(--color-accent-pink)] bg-clip-text text-transparent">
            精选项目
          </span>
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-[var(--color-text-secondary)]">
          这里展示了我最引以为豪的作品，涵盖全栈开发、设计和创意技术。
        </p>
      </ScrollReveal>

      <StaggerContainer staggerDelay={0.08}>
        <BentoGrid>
          {FEATURED_PROJECTS.map((project, i) => (
            <StaggerItem key={project.title}>
              <BentoGridItem
                title={project.title}
                description={project.description}
                tags={project.tags}
                href={project.href}
                className={`h-full ${project.className}`}
                icon={<ProjectIconPlaceholder index={i} />}
              />
            </StaggerItem>
          ))}
        </BentoGrid>
      </StaggerContainer>

      {/* 查看全部按钮 */}
      <ScrollReveal delay={0.4}>
        <div className="mt-10 text-center">
          <a
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent-violet)] transition-colors hover:text-[var(--color-accent-pink)]"
          >
            查看全部项目
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
