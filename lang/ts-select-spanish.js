// Spanish language support for ts-select
if (typeof window.TsSelectLang !== 'undefined') {
	window.TsSelectLang.spanish = {
		selectItem: 'Seleccionar elemento',
		selectItems: 'Seleccionar elementos',
		selectAll: 'Seleccionar todo',
		selectNone: 'Deseleccionar todo',
		selectInverse: 'Invertir selección',
		search: 'Buscar...',
		noResults: 'Sin resultados',
		groupExpandedText: 'Hacer clic para contraer grupo',
		groupCollapsedText: 'Hacer clic para expandir grupo',
		groupCheckboxTitle: 'Alternar todos los elementos de este grupo',
		clear: 'Limpiar',
		loading: 'Cargando...',
		additionalInfoTitle: 'Información adicional'
	};
	
	// Set Spanish as default if no language is set
	if (!window.TsSelectLang.current) {
		window.TsSelectLang.current = 'spanish';
	}
}
