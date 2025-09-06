// Polish language support for ts-select
if (typeof window.TsSelectLang !== 'undefined') {
	window.TsSelectLang.polish = {
		selectItem: 'Wybierz element',
		selectItems: 'Wybierz elementy',
		selectAll: 'Zaznacz wszystkie',
		selectNone: 'Odznacz wszystkie',
		selectInverse: 'Odwróć zaznaczenie',
		search: 'Szukaj...',
		noResults: 'Brak wyników',
		groupExpandedText: 'Kliknij, aby zwinąć grupę',
		groupCollapsedText: 'Kliknij, aby rozwinąć grupę',
		groupCheckboxTitle: 'Przełącz wszystkie elementy w tej grupie',
		clear: 'Wyczyść',
		loading: 'Ładowanie...',
		additionalInfoTitle: 'Dodatkowe informacje'
	};
	
	// Set Polish as default if no language is set
	if (!window.TsSelectLang.current) {
		window.TsSelectLang.current = 'polish';
	}
}
