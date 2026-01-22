import { en, de, type Translations } from '$lib/i18n';

const STORAGE_KEY = 'kprime-lang';

export type Language = 'en' | 'de';

function getInitialLanguage(): Language {
	// Check localStorage first
	if (typeof localStorage !== 'undefined') {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored === 'en' || stored === 'de') {
			return stored;
		}
	}

	// Fall back to browser language
	if (typeof navigator !== 'undefined') {
		const browserLang = navigator.language.split('-')[0];
		if (browserLang === 'de') {
			return 'de';
		}
	}

	// Default to English
	return 'en';
}

const translations: Record<Language, Translations> = { en, de };

let language = $state<Language>(getInitialLanguage());

export const languageStore = {
	get current() {
		return language;
	},

	get t() {
		return translations[language];
	},

	set(lang: Language) {
		language = lang;
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem(STORAGE_KEY, lang);
		}
	},

	toggle() {
		this.set(language === 'en' ? 'de' : 'en');
	}
};
