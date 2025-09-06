// Italian language support for ts-select
if (typeof window.TsSelectLang !== 'undefined') {
	window.TsSelectLang.italian = {
		selectItem: 'Seleziona un elemento',
		selectItems: 'Seleziona elementi',
		selectAll: 'Seleziona tutto',
		selectNone: 'Deseleziona tutto',
		selectInverse: 'Inverti selezione',
		search: 'Cerca...',
		noResults: 'Nessun risultato',
		groupExpandedText: 'Clicca per comprimere il gruppo',
		groupCollapsedText: 'Clicca per espandere il gruppo',
		groupCheckboxTitle: 'Attiva/disattiva tutti gli elementi di questo gruppo',
		clear: 'Cancella',
		loading: 'Caricamento...',
		additionalInfoTitle: 'Informazioni aggiuntive'
	};
	
	// Set Italian as default if no language is set
	if (!window.TsSelectLang.current) {
		window.TsSelectLang.current = 'italian';
	}
}
