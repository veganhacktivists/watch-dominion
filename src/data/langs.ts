import { Lang } from "@/types/lang.ts";

export const langs: Record<Lang, string> = {
  'en': 'English',
  'it': 'Italian',
};

export function isLangSupported(lang: string): lang is Lang {
  return lang in langs;
}
