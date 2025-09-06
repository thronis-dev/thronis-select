// French language support for ts-select
if (typeof window.TsSelectLang !== 'undefined') {
	window.TsSelectLang.french = {
		selectItem: 'Sélectionner un élément',
		selectItems: 'Sélectionner des éléments',
		selectAll: 'Tout sélectionner',
		selectNone: 'Tout désélectionner',
		selectInverse: 'Inverser la sélection',
		search: 'Rechercher...',
		noResults: 'Aucun résultat',
		groupExpandedText: 'Cliquer pour réduire le groupe',
		groupCollapsedText: 'Cliquer pour développer le groupe',
		groupCheckboxTitle: 'Basculer tous les éléments de ce groupe',
		clear: 'Effacer',
		loading: 'Chargement...',
		additionalInfoTitle: 'Informations supplémentaires'
	};
	
	// Set French as default if no language is set
	if (!window.TsSelectLang.current) {
		window.TsSelectLang.current = 'french';
	}
}
