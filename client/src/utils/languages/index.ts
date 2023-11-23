import BR from './br.json'
import US from './us.json'
import FR from './fr.json'
import DE from './de.json'
import ES from './es.json'
import HI from './hi.json'
import RU from './ru.json'
import ZH from './zh.json'
import JP from './jp.json'
import AR from './ar.json'

import { initReactI18next } from 'react-i18next'
import i18next from 'i18next'

const resources = {
    pt: BR,
    en: US,
    fr: FR,
    de: DE,
    es: ES,
    hi: HI,
    ru: RU,
    zh: ZH,
    jp: JP,
    ar: AR
}
let lng = navigator.language
lng = lng.split('-')[1].toLowerCase()

i18next.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem('lang') ?? lng,
    interpolation: {
        escapeValue: false
    }
})

export default i18next
