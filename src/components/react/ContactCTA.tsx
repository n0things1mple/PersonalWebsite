import { ScrollReveal } from "../ui/scroll-reveal";
import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "../../lib/constants";

export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(226,166,61,0.05)] to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(226,166,61,0.1)_0%,_transparent_70%)]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <ScrollReveal>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-accent-teal)]">
            Get in Touch
          </p>
          <h2
            className="mb-6 font-[family-name:var(--font-display)] font-bold"
            style={{ fontSize: "var(--text-display)" }}
          >
            一起创造
            <span className="bg-gradient-to-r from-[var(--color-accent-gold)] via-[var(--color-accent-coral)] to-[var(--color-accent-teal)] bg-clip-text text-transparent">
              精彩
            </span>
            的事物
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-lg text-[var(--color-text-secondary)]">
            无论是项目合作、技术交流还是随便聊聊，都欢迎联系我。
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-8 py-3.5 font-medium text-white transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-gold)] to-[var(--color-accent-coral)]" />
              <span className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[var(--color-accent-gold)] to-[var(--color-accent-coral)] opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-40" />
              <span className="relative">联系我</span>
              <svg className="relative h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </a>
          </div>
        </ScrollReveal>

        {/* 社交链接 */}
        <ScrollReveal delay={0.3}>
          <div className="mt-10 flex items-center justify-center gap-6">
            {SOCIAL_LINKS.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-3 text-[var(--color-text-muted)] transition-colors duration-200 hover:border-[var(--color-accent-gold)] hover:text-[var(--color-accent-gold)]"
                title={link.name}
              >
                {link.icon === 'github' && (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                )}
                {link.icon === 'bilibili' && (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/>
                  </svg>
                )}
                {link.icon === 'email' && (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                )}
              </motion.a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
