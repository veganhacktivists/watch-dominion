import { Lang } from "@/types/lang.ts";

export const langs = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  it: 'Italiano',
} as const satisfies Record<string, string>;

export function isLangSupported(lang: string): lang is Lang {
  return lang in langs;
}
