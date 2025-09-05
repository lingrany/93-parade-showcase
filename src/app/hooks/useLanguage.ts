import { useState, useEffect } from 'react';

export type Language = 'en' | 'zh';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // 从localStorage读取保存的语言设置
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage: Language = language === 'en' ? 'zh' : 'en';
    setLanguage(newLanguage);
    
    // 保存到localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLanguage);
    }
  };

  const setLanguageDirectly = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  return {
    language,
    toggleLanguage,
    setLanguage: setLanguageDirectly
  };
};