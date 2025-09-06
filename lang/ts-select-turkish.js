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
  // Override ts-select language defaults with Turkish
  $.fn.tsSelect = $.fn.tsSelect || {};
  $.fn.tsSelect.defaults = {
    // Search and actions
    searchPlaceholder: 'Ara...',
    selectAllText: 'Tümü',
    deselectAllText: 'Hiçbiri',
    inverseText: 'Tersini Seç',
    
    // Messages
    noResultsText: 'Sonuç bulunamadı',
    noOptionsText: 'Seçenek bulunamadı',
    loadingText: 'Yükleniyor...',
    
    // Selection messages
    countSelectedText: function (numSelected) {
      return (numSelected == 1) ? "{0} Seçildi" : "{0} Seçildi";
    },
    
    		// Group messages
		groupCollapsedText: 'Grubu genişletmek için tıklayın',
		groupExpandedText: 'Grubu daraltmak için tıklayın',
		groupCheckboxTitle: 'Bu gruptaki tüm öğeleri değiştir',
    
    // Clear button
    clearButtonText: 'Temizle',
    clearButtonTitle: 'Tüm seçimleri temizle',
    
    // Resize handle
    resizeHandleText: '↕',
    resizeHandleTitle: 'Açılır menü yüksekliğini değiştirmek için sürükleyin',
    
    // Placeholder
    placeholderText: 'Öğe Seç',
    placeholderTextMultiple: 'Öğeler Seç',
    
    // Multiple selection
    multipleSeparator: ', ',
    moreItemsText: function (remainingCount) {
      return `... +${remainingCount} tane daha`;
    },
    
    // Info tooltip
    additionalInfoTitle: 'Ek Bilgi'
  };
  
  // Also expose as global for non-jQuery usage
  if (typeof window !== 'undefined') {
    window.TsSelectLang = window.TsSelectLang || {};
    window.TsSelectLang.defaults = $.fn.tsSelect.defaults;
  }
  
})(jQuery);

}));
