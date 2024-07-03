import { Lang } from "@/types/lang.ts";

export const langs = {
  en: 'English',
  it: 'Italian',
} as const satisfies Record<string, string>;

export function isLangSupported(lang: string): lang is Lang {
  return lang in langs;
}
