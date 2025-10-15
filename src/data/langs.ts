import { Lang } from '@/types/lang.ts';
import React, { ContextType, Dispatch, SetStateAction } from 'react';

export const langs = {
  en: "English",
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
  es: "Español",
} as const satisfies Record<string, string>;

export function isLangSupported(lang: string): lang is Lang {
  return lang in langs;
}

export const LanguageContext = React.createContext<
  [Lang, Dispatch<SetStateAction<Lang>>] | undefined
>(undefined);

export const useLang = () => {
  return React.useContext(LanguageContext) ??
    (["en", () => {}] as NonNullable<ContextType<typeof LanguageContext>>);
};
