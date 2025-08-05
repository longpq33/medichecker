import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'

export const useLanguage = () => {
  const { i18n, t } = useTranslation()

  const changeLanguage = useCallback((language: 'en' | 'vi') => {
    i18n.changeLanguage(language)
  }, [i18n])

  const currentLanguage = i18n.language

  return {
    t,
    changeLanguage,
    currentLanguage,
    isEnglish: currentLanguage === 'en',
    isVietnamese: currentLanguage === 'vi',
  }
} 