(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["jquery"], function (a0) {
      return (factory(a0));
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"));
  } else {
    factory(root["jQuery"]);
  }
}(this, function (jQuery) {

(function ($) {
  // Override ts-select language defaults with German
  $.fn.tsSelect = $.fn.tsSelect || {};
  $.fn.tsSelect.defaults = {
    // Search and actions
    searchPlaceholder: 'Suchen...',
    selectAllText: 'Alle auswählen',
    deselectAllText: 'Nichts auswählen',
    inverseText: 'Auswahl umkehren',
    
    // Messages
    noResultsText: 'Keine Ergebnisse für {0}',
    noOptionsText: 'Keine Optionen verfügbar',
    loadingText: 'Lädt...',
    
    // Selection messages
    countSelectedText: function (numSelected) {
      return (numSelected == 1) ? "{0} Element ausgewählt" : "{0} Elemente ausgewählt";
    },
    
    		// Group messages
		groupCollapsedText: 'Klicken Sie, um die Gruppe zu erweitern',
		groupExpandedText: 'Klicken Sie, um die Gruppe zu reduzieren',
		groupCheckboxTitle: 'Alle Elemente in dieser Gruppe umschalten',
    
    // Clear button
    clearButtonText: 'Löschen',
    clearButtonTitle: 'Alle Auswahlen löschen',
    
    // Resize handle
    resizeHandleText: '↕',
    resizeHandleTitle: 'Ziehen Sie, um die Dropdown-Höhe zu ändern',
    
    // Placeholder
    placeholderText: 'Element auswählen',
    placeholderTextMultiple: 'Elemente auswählen',
    
    // Multiple selection
    multipleSeparator: ', ',
    moreItemsText: function (remainingCount) {
      return `... +${remainingCount} weitere`;
    }
  };
  
  // Also expose as global for non-jQuery usage
  if (typeof window !== 'undefined') {
    window.TsSelectLang = window.TsSelectLang || {};
    window.TsSelectLang.defaults = $.fn.tsSelect.defaults;
  }
  
})(jQuery);

}));
