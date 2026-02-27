import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** 合并 Tailwind 类名，自动处理冲突 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 格式化日期 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** 计算阅读时间（中文按 400 字/分钟） */
export function readingTime(text: string): string {
  const words = text.length;
  const minutes = Math.ceil(words / 400);
  return `${minutes} 分钟`;
}
