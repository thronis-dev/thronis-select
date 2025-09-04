(function(){
	'use strict';

	if (typeof jQuery !== 'undefined') {
		jQuery.fn.tsSelect = function() {
			return this.each(function() {
				if (this.tagName === 'SELECT' && !this.dataset.tsSelectInitialized) {
					initializeSelect(this);
				}
			});
		};

		// Helper function to update group checkbox states
		function updateAllGroupCheckboxStates(wrapper, selectEl) {
			const itemsContainer = wrapper.querySelector('.ts-select-menu');
			if (itemsContainer) {
				itemsContainer.querySelectorAll('.ts-select-group-label').forEach(groupLabel => {
					const groupCheckbox = groupLabel.querySelector('input[type="checkbox"]');
					if (groupCheckbox) {
						const groupId = groupLabel.dataset.groupId;
						const group = selectEl.querySelector(`optgroup[label="${groupId}"], group[label="${groupId}"]`);
						if (group) {
							// Manually update group checkbox state
							const groupOptions = Array.from(group.querySelectorAll('option'));
							const selectedOptions = groupOptions.filter(opt => opt.selected);
							
							if (selectedOptions.length === 0) {
								groupCheckbox.checked = false;
								groupCheckbox.indeterminate = false;
							} else if (selectedOptions.length === groupOptions.length) {
								groupCheckbox.checked = true;
								groupCheckbox.indeterminate = false;
							} else {
								groupCheckbox.checked = false;
								groupCheckbox.indeterminate = true;
							}
						}
					}
				});
			}
		}

		jQuery.fn.tsVal = function(value) {
			if (this.length === 0) {
				return this;
			}
			
			const first = this[0];
			
			if (!first) {
				return this;
			}
			
			let wrapper = null;
			if (first.tagName === 'SELECT') {
				if (first.id) {
					wrapper = document.getElementById(`ts-select-${first.id}`);
					if (!wrapper) {
						wrapper = document.querySelector(`[data-ts-select-for="${first.id}"]`);
					}
				}
			} else if (first.classList && first.classList.contains('ts-select') && first.classList.contains('dropdown')) {
				wrapper = first;
			}
			
			if (wrapper && typeof wrapper.getVal === 'function' && typeof wrapper.setVal === 'function') {
				if (arguments.length === 0) {
					return wrapper.getVal();
				} else {
					wrapper.setVal(value);
					return this;
				}
			}
			
			if (arguments.length === 0) {
				return undefined;
			}
			
			return this;
		};
		
		// Add selectAll method
		jQuery.fn.selectAll = function() {
			if (this.length === 0) return this;
			
			const selectEl = this[0];
			if (selectEl.tagName !== 'SELECT') return this;
			
			// Select all options except placeholders
			Array.from(selectEl.options).forEach(option => {
				if (!option.dataset.placeholder) {
					option.selected = true;
				}
			});
			
			// Update the ts-select component if it exists
			const wrapper = document.querySelector(`[data-ts-select-for="${selectEl.id}"]`);
			if (wrapper) {
				const toggleInput = wrapper.querySelector('.ts-select-toggle');
				const clearBtn = wrapper.querySelector('.ts-select-clear');
				updateToggleLabel(toggleInput, selectEl, clearBtn);
				
				// Update all checkbox states in the dropdown
				const itemsContainer = wrapper.querySelector('.ts-select-menu');
				if (itemsContainer) {
					itemsContainer.querySelectorAll('[data-index]').forEach(item => {
						const checkbox = item.querySelector('input[type="checkbox"]');
						if (checkbox) {
							const optionIndex = item.getAttribute('data-index');
							const option = selectEl.options[optionIndex];
							checkbox.checked = option && option.selected;
						}
					});
				}
				
				// Update group checkbox states
				updateAllGroupCheckboxStates(wrapper, selectEl);
			}
			
			return this;
		};
		
		// Add selectNone method
		jQuery.fn.selectNone = function() {
			if (this.length === 0) return this;
			
			const selectEl = this[0];
			if (selectEl.tagName !== 'SELECT') return this;
			
			// Deselect all options
			Array.from(selectEl.options).forEach(option => {
				option.selected = false;
			});
			
			// Update the ts-select component if it exists
			const wrapper = document.querySelector(`[data-ts-select-for="${selectEl.id}"]`);
			if (wrapper) {
				const toggleInput = wrapper.querySelector('.ts-select-toggle');
				const clearBtn = wrapper.querySelector('.ts-select-clear');
				updateToggleLabel(toggleInput, selectEl, clearBtn);
				
				// Update all checkbox states in the dropdown
				const itemsContainer = wrapper.querySelector('.ts-select-menu');
				if (itemsContainer) {
					itemsContainer.querySelectorAll('[data-index]').forEach(item => {
						const checkbox = item.querySelector('input[type="checkbox"]');
						if (checkbox) {
							checkbox.checked = false;
						}
					});
				}
				
				// Update group checkbox states
				if (itemsContainer) {
					itemsContainer.querySelectorAll('.ts-select-group-label').forEach(groupLabel => {
						const groupCheckbox = groupLabel.querySelector('input[type="checkbox"]');
						if (groupCheckbox) {
							groupCheckbox.checked = false;
							groupCheckbox.indeterminate = false;
						}
					});
				}
			}
			
			return this;
		};
		
		// Add selectInverse method
		jQuery.fn.selectInverse = function() {
			if (this.length === 0) return this;
			
			const selectEl = this[0];
			if (selectEl.tagName !== 'SELECT') return this;
			
			// Invert selection for all options except placeholders
			Array.from(selectEl.options).forEach(option => {
				if (!option.dataset.placeholder) {
					option.selected = !option.selected;
				}
			});
			
			// Update the ts-select component if it exists
			const wrapper = document.querySelector(`[data-ts-select-for="${selectEl.id}"]`);
			if (wrapper) {
				const toggleInput = wrapper.querySelector('.ts-select-toggle');
				const clearBtn = wrapper.querySelector('.ts-select-clear');
				updateToggleLabel(toggleInput, selectEl, clearBtn);
				
				// Update all checkbox states in the dropdown
				const itemsContainer = wrapper.querySelector('.ts-select-menu');
				if (itemsContainer) {
					itemsContainer.querySelectorAll('[data-index]').forEach(item => {
						const checkbox = item.querySelector('input[type="checkbox"]');
						if (checkbox) {
							const optionIndex = item.getAttribute('data-index');
							const option = selectEl.options[optionIndex];
							checkbox.checked = option && option.selected;
						}
					});
				}
				
				// Update group checkbox states
				updateAllGroupCheckboxStates(wrapper, selectEl);
			}
			
			return this;
		};
	}

	const BOOTSTRAP_READY = typeof window.bootstrap !== 'undefined';

	function createElement(tag, className, attrs) {
		const el = document.createElement(tag);
		if (className) el.className = className;
		if (attrs) {
			Object.keys(attrs).forEach((k) => {
				if (k === 'text') el.textContent = attrs[k];
				else if (k === 'html') el.innerHTML = attrs[k];
				else el.setAttribute(k, attrs[k]);
			});
		}
		return el;
	}

	function getSelectedOptions(selectEl) {
		return Array.from(selectEl.options).filter((o) => o.selected && !o.disabled);
	}

	function getVisibleItems(container) {
		return Array.from(container.querySelectorAll('[data-index]')).filter((el) => !el.classList.contains('d-none'));
	}

	function scrollToFirstSelectedItem(container, selectElement) {
		// Find the first selected item in the dropdown
		const selectedItems = container.querySelectorAll('[data-index]');
		let firstSelectedItem = null;
		
		for (let item of selectedItems) {
			const optionIndex = item.getAttribute('data-index');
			const option = selectElement.options[optionIndex];
			if (option && option.selected) {
				firstSelectedItem = item;
				break;
			}
		}
		
		// If we found a selected item, scroll to it instantly (no animation)
		if (firstSelectedItem) {
			firstSelectedItem.scrollIntoView({ 
				behavior: 'auto', 
				block: 'nearest',
				inline: 'nearest'
			});
		}
	}

	function applyMaxItems(container, maxItems) {
		if (!maxItems) return;
		
		// Don't override height if container is being custom resized
		if (container.dataset.customResize === 'true') return;
		
		const firstItem = container.querySelector('[data-index]:not([style*="display: none"])');
		let itemHeight = 50; // Updated to match new minimum height
		if (firstItem) {
			const rect = firstItem.getBoundingClientRect();
			if (rect && rect.height) itemHeight = rect.height;
		}
		container.style.maxHeight = `${Math.max(1, maxItems) * itemHeight}px`;
		container.style.overflow = 'auto';
	}

	function updateToggleLabel(toggleInput, selectEl, clearBtn) {
		const placeholderOpt = !selectEl.multiple ? Array.from(selectEl.options).find(o => o.dataset && o.dataset.placeholder === 'true') : null;
		const selected = getSelectedOptions(selectEl).filter(o => !placeholderOpt || o !== placeholderOpt);
		
		// Update clear button visibility
		if (clearBtn) {
			if (selected.length === 0) {
				clearBtn.style.display = 'none';
			} else {
				clearBtn.style.display = 'inline-block';
			}
		}
		
		if (selectEl.multiple) {
			if (selected.length === 0) {
				toggleInput.value = '';
				toggleInput.style.color = 'transparent';
				toggleInput.title = '';
			} else {
			// Get display text for each selected option (HTML or text)
			const selectedTexts = selected.map((o) => {
				const htmlContent = o.getAttribute('data-html');
				return htmlContent || o.textContent;
			});
			const formatAttribute = selectEl.getAttribute('ts-label-format');
			const displayText = createSmartDisplayText(selectedTexts, formatAttribute);
				
				toggleInput.value = displayText;
				toggleInput.style.color = '#000000';
				
			// For tooltip, always show full details regardless of format
				const tooltipText = `${selected.length} Selected. ${selectedTexts.join(', ')}`;
				toggleInput.title = tooltipText;
			}
		} else {
			if (selected.length === 0) {
				// For single select with no selection, show placeholder text
				const singlePlaceholder = selectEl.getAttribute('placeholder') || (window.TsSelectLang && window.TsSelectLang.defaults && window.TsSelectLang.defaults.placeholderText) || 'Select Item';
				toggleInput.value = singlePlaceholder;
				toggleInput.style.color = '#6c757d'; // Gray color for placeholder
				toggleInput.title = singlePlaceholder;
			} else {
				// Check if option has HTML content
				const htmlContent = selected[0].getAttribute('data-html');
				const displayText = htmlContent || selected[0].textContent;
				toggleInput.value = displayText;
				toggleInput.style.color = '#000000';
				toggleInput.title = displayText;
			}
		}
	}
	
	function createSmartDisplayText(selectedTexts, formatAttribute) {
		if (selectedTexts.length === 0) return '';
		if (selectedTexts.length === 1) return selectedTexts[0];
		
		// Handle different format options
		if (formatAttribute === 'count') {
			// Show just the count
			return `${selectedTexts.length} Selected`;
		}
		
		// Handle ">x" format (e.g., ">3", ">5", ">10")
		if (formatAttribute && formatAttribute.startsWith('>')) {
			const threshold = parseInt(formatAttribute.substring(1));
			if (!isNaN(threshold)) {
				if (selectedTexts.length <= threshold) {
					// Show all item texts if count <= threshold
					return selectedTexts.join(', ');
				} else {
					// Show count if count > threshold
					return `${selectedTexts.length} Selected`;
				}
			}
		}
		
		// Default behavior (original logic)
		let displayText = selectedTexts[0];
		let totalLength = displayText.length;
		
		const maxLength = 50;
		
		for (let i = 1; i < selectedTexts.length; i++) {
			const nextItem = selectedTexts[i];
			const separator = ', ';
			
			if (totalLength + separator.length + nextItem.length > maxLength) {
				const remainingCount = selectedTexts.length - i;
				displayText += `, ... +${remainingCount} more`;
				break;
			}
			
			displayText += separator + nextItem;
			totalLength += separator.length + nextItem.length;
		}
		
		return displayText;
	}

	function buildDropdownItem(option, isMultiple, index) {
		// Skip placeholder options in single select mode - they shouldn't be visible in dropdown
		if (!isMultiple && option.dataset && option.dataset.placeholder === 'true') {
			return null;
		}
		
		const a = createElement('button', 'dropdown-item d-flex align-items-center gap-2 pe-1 w-100 mb-1px optionSelect', { type: 'button', 'data-index': String(index) });
		
		if (isMultiple) {
			const chk = createElement('input', 'optionCheck form-check-input ', { type: 'checkbox' });
			chk.checked = option.selected;
			chk.disabled = option.disabled;
			a.appendChild(chk);
		} else {
			const radio = createElement('input', 'optionRadio form-check-input ', { type: 'radio', name: `radio-${option.closest('select').id || 'select'}` });
			radio.checked = option.selected;
			radio.disabled = option.disabled;
			a.appendChild(radio);
		}

		const idValue = option.getAttribute('data-id');
		if (idValue) {
			const badge = createElement('span', 'badge text-bg-light bg-gradient ts-select-id-badge', { text: idValue });
            badge.title = "ID : "+idValue
			a.appendChild(badge);
		}

		// Check if option has HTML content
		const htmlContent = option.getAttribute('data-html');
		if (htmlContent) {
			// Render HTML content
			const label = createElement('span', 'flex-grow-1 text-truncate');
			label.innerHTML = htmlContent;
			a.appendChild(label);
		} else {
			// Use regular text content
		const label = createElement('span', 'flex-grow-1 text-truncate', { text: option.textContent });
		a.appendChild(label);
		}

		const info = option.getAttribute('data-info');
		if (info) {
			const infoEl = createElement('small', 'text-muted ms-2 ts-select-info', { text: info });
			infoEl.title = "Additional Info";
            a.appendChild(infoEl);
		}

		if (option.disabled) a.classList.add('disabled');
		return a;
	}

	function buildActionsBox() {
		const box = createElement('div', 'ts-select-actions');
		const allText = (window.TsSelectLang && window.TsSelectLang.defaults && window.TsSelectLang.defaults.selectAllText) || 'All';
		const noneText = (window.TsSelectLang && window.TsSelectLang.defaults && window.TsSelectLang.defaults.deselectAllText) || 'None';
		const inverseText = (window.TsSelectLang && window.TsSelectLang.defaults && window.TsSelectLang.defaults.inverseText) || 'Inverse';
		
		const btnAll = createElement('button', 'btnSelectAction  w-100 btn  btn-sm btn-light btn-gradient', { type: 'button', text: allText });
		const btnNone = createElement('button', 'btnSelectAction w-100 btn  btn-sm btn-light btn-gradient', { type: 'button', text: noneText });
		const btnInverse = createElement('button', 'btnSelectAction w-100  btn btn-sm btn-light btn-gradient', { type: 'button', text: inverseText });
		box.append(btnAll, btnNone, btnInverse);
		return { box, btnAll, btnNone, btnInverse };
	}

	function updateSelectLanguage(wrapper, searchWrap, actions, toggleInput, clearBtn) {
		if (!window.TsSelectLang) return;
		
		if (searchWrap) {
			const searchInput = searchWrap.querySelector('.inputSelectSearch');
			if (searchInput) {
				searchInput.placeholder = window.TsSelectLang.get('search');
			}
		}
		
		if (actions) {
			if (actions.btnAll) actions.btnAll.textContent = window.TsSelectLang.get('all');
			if (actions.btnNone) actions.btnNone.textContent = window.TsSelectLang.get('none');
			if (actions.btnInverse) actions.btnInverse.textContent = window.TsSelectLang.get('inverse');
		}
		
		if (clearBtn) {
			clearBtn.innerHTML = window.TsSelectLang.get('clear');
		}
		
		if (toggleInput && !toggleInput.getAttribute('data-custom-placeholder')) {
			toggleInput.placeholder = window.TsSelectLang.get('selectItem');
		}
	}

	function initializeSelect(selectEl) {
		if (selectEl.dataset.tsSelectInitialized === 'true') return;
		selectEl.dataset.tsSelectInitialized = 'true';

		const searchableAttr = selectEl.getAttribute('ts-searchable');
		const isSearchable = searchableAttr === null ? true : (searchableAttr === 'true');
		
		const sizeMax = parseInt(selectEl.getAttribute('ts-size') || '', 10);
		
		const actionsBoxAttr = selectEl.getAttribute('ts-actions-box');
		const showActions = selectEl.multiple && (actionsBoxAttr === null ? true : (actionsBoxAttr === 'true'));
		
		const resizeAttr = selectEl.getAttribute('ts-resize');
		const showResize = resizeAttr === 'true';
		
		const hasGroups = selectEl.querySelector('optgroup, group') !== null;
		
		const noResultsText = selectEl.dataset.noResults || (window.TsSelectLang && window.TsSelectLang.defaults && window.TsSelectLang.defaults.noResultsText) || 'No Results Found';

		const wrapper = createElement('div', 'ts-select dropdown');
		if (selectEl.id) {
			wrapper.setAttribute('data-ts-select-for', selectEl.id);
			wrapper.setAttribute('aria-controls', selectEl.id);
			wrapper.id = `ts-select-${selectEl.id}`;
		}
		if (selectEl.disabled) wrapper.classList.add('disabled');

		const toggleInput = createElement('input', 'form-control ts-select-toggle pe-4', { type: 'text', readonly: 'true', 'data-bs-toggle': 'dropdown' });
		const defaultPlaceholder = selectEl.multiple ? 
			((window.TsSelectLang && window.TsSelectLang.defaults && window.TsSelectLang.defaults.placeholderTextMultiple) || 'Select Items') :
			((window.TsSelectLang && window.TsSelectLang.defaults && window.TsSelectLang.defaults.placeholderText) || 'Select Item');
		toggleInput.placeholder = selectEl.getAttribute('placeholder') || defaultPlaceholder;
		
		if (!selectEl.multiple) {
			let placeholderOption = Array.from(selectEl.options).find(o => o.value === '' && o.dataset.placeholder === 'true');
			if (!placeholderOption) {
				placeholderOption = document.createElement('option');
				placeholderOption.value = '';
				placeholderOption.textContent = toggleInput.placeholder;
				placeholderOption.setAttribute('hidden', '');
				placeholderOption.setAttribute('disabled', '');
				placeholderOption.dataset.placeholder = 'true';
				selectEl.insertBefore(placeholderOption, selectEl.firstChild);
			}
			const optionsList = Array.from(selectEl.options);
			const hasSelectedAttr = optionsList.some(opt => opt.hasAttribute('selected'));
			if (!hasSelectedAttr) {
				optionsList.forEach(opt => opt.selected = false);
				placeholderOption.selected = true;
			}
		}
		
		const menu = createElement('div', 'dropdown-menu p-2 pb-2');

		let searchWrap = null;
		let searchInput = null;
		if (isSearchable) {
			searchWrap = createElement('div', 'ts-select-search');
			const searchPlaceholder = (window.TsSelectLang && window.TsSelectLang.defaults && window.TsSelectLang.defaults.searchPlaceholder) || 'Search...';
			searchInput = createElement('input', 'inputSelectSearch form-control form-control-sm', { type: 'search', placeholder: searchPlaceholder });
			searchWrap.appendChild(searchInput);
			
					menu.appendChild(searchWrap);
			
			searchInput.addEventListener('input', function(e) {
				const searchTerm = e.target.value.toLowerCase();
				const items = itemsContainer.querySelectorAll('[data-index]');
				const groups = itemsContainer.querySelectorAll('.ts-select-group-label');
				let hasVisibleItems = false;
				
				// First, hide all items and groups (both CSS class and inline style)
				items.forEach((item, index) => {
					item.classList.add('d-none');
					item.style.setProperty('display', 'none', 'important');
				});
				groups.forEach(groupLabel => {
					groupLabel.classList.add('d-none');
					groupLabel.style.setProperty('display', 'none', 'important');
				});
				
				if (searchTerm) {
					// Show items that match the search term
				items.forEach((item, index) => {
					const optionText = item.textContent.toLowerCase();
					if (optionText.includes(searchTerm)) {
						item.classList.remove('d-none');
							item.style.setProperty('display', 'flex', 'important');
						hasVisibleItems = true;
					}
				});
				
					// Show groups that match the search term
					groups.forEach(groupLabel => {
				const groupText = groupLabel.textContent.toLowerCase();
				if (groupText.includes(searchTerm)) {
					groupLabel.classList.remove('d-none');
							groupLabel.style.setProperty('display', 'flex', 'important');
						}
					});
					
					// Now show parent groups only if they have visible descendants
					groups.forEach(groupLabel => {
			const level = parseInt(groupLabel.dataset.level || '0', 10);
						let hasVisibleDescendants = false;
						
						// Check if any descendants are visible
						let currentElement = groupLabel.nextElementSibling;
						while (currentElement) {
							if (currentElement.classList && currentElement.classList.contains('ts-select-group-label')) {
								const currentLevel = parseInt(currentElement.dataset.level || '0', 10);
								if (currentLevel <= level) break;
								if (!currentElement.classList.contains('d-none') && currentElement.style.display !== 'none') {
									hasVisibleDescendants = true;
									break;
								}
							} else if (currentElement.hasAttribute && currentElement.hasAttribute('data-index')) {
								if (!currentElement.classList.contains('d-none') && currentElement.style.display !== 'none') {
									hasVisibleDescendants = true;
									break;
								}
							}
							currentElement = currentElement.nextElementSibling;
						}
						
						if (hasVisibleDescendants) {
							groupLabel.classList.remove('d-none');
							groupLabel.style.setProperty('display', 'flex', 'important');
						}
					});
				} else {
					// No search term - show all items and groups
					items.forEach((item, index) => {
						item.classList.remove('d-none');
						item.style.removeProperty('display');
						hasVisibleItems = true;
					});
					groups.forEach(groupLabel => {
						groupLabel.classList.remove('d-none');
						groupLabel.style.removeProperty('display');
					});
				}
				
				if (searchTerm && hasVisibleItems) {
					const firstVisible = itemsContainer.querySelector('[data-index]:not(.d-none)');
					if (firstVisible) {
						firstVisible.scrollIntoView({ block: 'nearest' });
					}
				}
				
				refreshNoResultsVisibility();
			});
			
			searchInput.addEventListener('keydown', function(e) {
				if (e.key === 'Enter') {
					e.preventDefault();
					if (showActions) {
						const firstActionBtn = actions.box.querySelector('button');
						if (firstActionBtn) firstActionBtn.focus();
					} else {
						const firstVisibleItem = itemsContainer.querySelector('[data-index]:not(.d-none)');
						if (firstVisibleItem) {
							firstVisibleItem.focus();
						}
					}
				}
			});
		}

		let actions = null;
		if (showActions) {
			actions = buildActionsBox();
					menu.appendChild(actions.box);
			
			actions.btnAll.addEventListener('click', function() {
				Array.from(selectEl.options).forEach(opt => {
					if (!opt.disabled && !opt.dataset.placeholder) opt.selected = true;
				});
				selectEl.dispatchEvent(new Event('change', { bubbles: true }));
				syncFromOptions();
			});
			
			actions.btnNone.addEventListener('click', function() {
				Array.from(selectEl.options).forEach(opt => opt.selected = false);
				selectEl.dispatchEvent(new Event('change', { bubbles: true }));
				syncFromOptions();
			});
			
			actions.btnInverse.addEventListener('click', function() {
				Array.from(selectEl.options).forEach(opt => {
					if (!opt.disabled && !opt.dataset.placeholder) opt.selected = !opt.selected;
				});
				selectEl.dispatchEvent(new Event('change', { bubbles: true }));
				syncFromOptions();
			});
		}

		const itemsContainer = createElement('div', 'ts-select-menu list-group list-group-flush');
		if (sizeMax) applyMaxItems(itemsContainer, sizeMax);
		menu.appendChild(itemsContainer);

		let resizeHandle = null;
		if (showResize) {
			let minHeight = 40;
			let maxHeight = 600;
			
			resizeHandle = createElement('div', 'ts-select-resize-handle');
			const resizeHandleText = (window.TsSelectLang && window.TsSelectLang.defaults && window.TsSelectLang.defaults.resizeHandleText) || '↕';
			resizeHandle.innerHTML = resizeHandleText;
			const resizeHandleTitle = (window.TsSelectLang && window.TsSelectLang.defaults && window.TsSelectLang.defaults.resizeHandleTitle) || 'Drag to resize dropdown height';
			resizeHandle.title = resizeHandleTitle;
			resizeHandle.style.cursor = 'ns-resize';
			resizeHandle.style.height = '8px';
			resizeHandle.style.backgroundColor = '#f8f9fa';
			resizeHandle.style.borderTop = '1px solid #dee2e6';
			resizeHandle.style.borderBottom = '1px solid #dee2e6';
			
		let isResizing = false;
		let startY = 0;
		let startHeight = 0;
			
			resizeHandle.addEventListener('mousedown', function(e) {
				isResizing = true;
				startY = e.clientY;
				startHeight = itemsContainer.offsetHeight;
				
				document.addEventListener('mousemove', handleMouseMove);
				document.addEventListener('mouseup', handleMouseUp);
				
				document.body.style.cursor = 'ns-resize';
				resizeHandle.style.backgroundColor = '#007bff';
			});

		function handleMouseMove(e) {
			if (!isResizing) return;
			
			const deltaY = e.clientY - startY;
			const newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight + deltaY));
			
				// Set custom height and disable max-height calculations
				itemsContainer.style.height = `${newHeight}px`;
				itemsContainer.style.maxHeight = 'none';
				itemsContainer.style.overflowY = 'auto';
				itemsContainer.style.overflowX = 'hidden';
				
				// Prevent applyMaxItems from overriding our custom height
				itemsContainer.dataset.customResize = 'true';
		}

		function handleMouseUp() {
			isResizing = false;
			
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
			
				document.body.style.cursor = '';
				resizeHandle.style.backgroundColor = '#f8f9fa';
				
				// Store the custom height
				wrapper.dataset.customHeight = itemsContainer.style.height;
				
				// Mark that resize is complete but keep custom height
				itemsContainer.dataset.customResize = 'true';
				
				// Ensure all items maintain their original dimensions
				const allItems = itemsContainer.querySelectorAll('.ts-select-group-label, .optionSelect');
				allItems.forEach(item => {
					// Reset any height-related inline styles that might have been set
					item.style.removeProperty('height');
					item.style.removeProperty('min-height');
					item.style.removeProperty('max-height');
				});
			}
			
			menu.appendChild(resizeHandle);
		}
		
		const groupControls = [];

		function toggleGroup(group, labelEl, level) {
			const isExpanded = labelEl.dataset.expanded === 'true';
			const groupLabel = group.getAttribute('label') || String(Math.random());
			
			if (isExpanded) {
				hideGroupDescendants(labelEl, level);
				
				const groupCollapsedTitle = (window.TsSelectLang && window.TsSelectLang.defaults && window.TsSelectLang.defaults.groupCollapsedText) || 'Click to expand group';
				labelEl.title = groupCollapsedTitle;
				labelEl.dataset.expanded = 'false';
				labelEl.classList.add('collapsed');
			} else {
				showGroupDescendants(labelEl, level);
				
				labelEl.title = 'Click to collapse group';
				labelEl.dataset.expanded = 'true';
				labelEl.classList.remove('collapsed');
			}
			
			// Force a reflow to ensure changes are applied
			itemsContainer.offsetHeight;
		}
		
		function hideGroupDescendants(groupLabelEl, groupLevel) {
			let nextElement = groupLabelEl.nextElementSibling;
			let hiddenCount = 0;
			
			while (nextElement) {
		if (nextElement.classList && nextElement.classList.contains('ts-select-group-label')) {
					const nextLevel = parseInt(nextElement.dataset.level || '0', 10);
			if (nextLevel <= groupLevel) {
				break;
			}
		}
		
		if (nextElement.hasAttribute('data-index') || nextElement.classList.contains('ts-select-group-label')) {
					// Use more forceful hiding method
					nextElement.style.setProperty('display', 'none', 'important');
					nextElement.classList.add('d-none'); // Add Bootstrap hidden class
					hiddenCount++;
		}
				
				nextElement = nextElement.nextElementSibling;
			}
		}
		
		function showGroupDescendants(groupLabelEl, groupLevel) {
			let nextElement = groupLabelEl.nextElementSibling;
			let shownCount = 0;
			
			while (nextElement) {
		if (nextElement.classList && nextElement.classList.contains('ts-select-group-label')) {
			const nextLevel = parseInt(nextElement.dataset.level || '0', 10);
			if (nextLevel <= groupLevel) {
				break;
			}
		}
		
				if (nextElement.hasAttribute('data-index') || nextElement.classList.contains('ts-select-group-label')) {
					// Use more forceful showing method
					nextElement.style.setProperty('display', 'flex', 'important');
					nextElement.classList.remove('d-none'); // Remove Bootstrap hidden class
					shownCount++;
					
			if (nextElement.classList.contains('optionSelect')) {
						nextElement.classList.add('d-flex', 'align-items-center', 'gap-2', 'pe-1', 'w-100', 'mb-1px');
			}
		}
				
				nextElement = nextElement.nextElementSibling;
			}
		}

		function renderNode(node, level, parentGroupLabel = null) {
			const isGroupTag = node.tagName === 'OPTGROUP' || node.tagName === 'GROUP';
			if (isGroupTag) {
				const group = node;
				const labelEl = createElement('div', 'ts-select-group-label dropdown-item px-1 py-1');
		labelEl.dataset.level = String(level);
		labelEl.classList.add(`level-${level}`);
		labelEl.dataset.groupId = group.getAttribute('label') || String(Math.random());
		labelEl.dataset.expanded = 'true';
		labelEl.style.cursor = 'pointer';
				const groupExpandedTitle = (window.TsSelectLang && window.TsSelectLang.defaults && window.TsSelectLang.defaults.groupExpandedText) || 'Click to collapse group';
				labelEl.title = groupExpandedTitle;
		
		let groupCheckbox = null;
		if (selectEl.multiple) {
			groupCheckbox = createElement('input', 'form-check-input ts-select-group-check', { type: 'checkbox' });
					const groupCheckboxTitle = (window.TsSelectLang && window.TsSelectLang.defaults && window.TsSelectLang.defaults.groupCheckboxTitle) || 'Toggle all items in this group';
					groupCheckbox.title = groupCheckboxTitle;
			labelEl.appendChild(groupCheckbox);
		}
		
		labelEl.appendChild(createElement('span', 'ts-select-group-text', { text: (group.getAttribute('label') || '') }));
				
				labelEl.addEventListener('click', (e) => {
					if (e.target.type === 'checkbox') {
						return;
					}
					
					toggleGroup(group, labelEl, level);
				});
				
				// Add keyboard navigation to group labels
				labelEl.addEventListener('keydown', function(e) {
					if (e.key === 'ArrowDown') {
					e.preventDefault();
					e.stopPropagation();
						
						// Find next focusable item after this group
						let nextElement = this.nextElementSibling;
						while (nextElement) {
							if (nextElement.classList.contains('ts-select-group-label') || nextElement.hasAttribute('data-index')) {
								if (!nextElement.classList.contains('d-none')) {
									nextElement.focus();
									break;
								}
							}
							nextElement = nextElement.nextElementSibling;
						}
					} else if (e.key === 'ArrowUp') {
						e.preventDefault();
						e.stopPropagation();
						
						// Find previous focusable item before this group
						let prevElement = this.previousElementSibling;
						while (prevElement) {
							if (prevElement.classList.contains('ts-select-group-label') || prevElement.hasAttribute('data-index')) {
								if (!prevElement.classList.contains('d-none')) {
									prevElement.focus();
									break;
								}
							}
							prevElement = prevElement.previousElementSibling;
						}
					} else if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						e.stopPropagation();
						
						// Toggle the group checkbox
						const groupCheckbox = this.querySelector('input[type="checkbox"]');
						if (groupCheckbox) {
							groupCheckbox.checked = !groupCheckbox.checked;
							groupCheckbox.dispatchEvent(new Event('change'));
							
							// Update all group checkbox states after keyboard change
							setTimeout(() => {
								groupControls.forEach(ctrl => {
									if (ctrl.checkbox) {
										// Find the correct group for this control
										const controlGroup = selectEl.querySelector(`optgroup[label="${ctrl.groupId}"], group[label="${ctrl.groupId}"]`);
										if (controlGroup) {
											updateGroupCheckboxState(ctrl.checkbox, controlGroup);
										}
									}
								});
							}, 10);
						}
					}
				});
				
				// Make group label focusable
				labelEl.setAttribute('tabindex', '0');
				
				itemsContainer.appendChild(labelEl);
				
				Array.from(group.children).forEach(child => {
					renderNode(child, level + 1, group.getAttribute('label'));
				});
				
				if (groupCheckbox) {
					updateGroupCheckboxState(groupCheckbox, group);
					// Add to groupControls array for proper management
					groupControls.push({
						checkbox: groupCheckbox,
						groupId: group.getAttribute('label') || String(Math.random())
					});
					
					// Add event listener to group checkbox
					groupCheckbox.addEventListener('change', function(e) {
						const isChecked = e.target.checked;
						const groupId = group.getAttribute('label');
						
						// Function to recursively toggle all descendants
						function toggleGroupDescendants(groupId, isChecked) {
							// Check if search is active
							const searchInput = wrapper.querySelector('.inputSelectSearch');
							const isSearchActive = searchInput && searchInput.value.trim() !== '';
							
							// Find ALL descendants at any depth by traversing the DOM tree
							function findAllDescendants(startElement) {
								const descendants = [];
								let currentElement = startElement.nextElementSibling;
								
								while (currentElement) {
									// Stop if we hit another element at the same or higher level
									if (currentElement.classList.contains('ts-select-group-label')) {
										const currentLevel = parseInt(currentElement.dataset.level || '0', 10);
										const startLevel = parseInt(startElement.dataset.level || '0', 10);
										
										if (currentLevel <= startLevel) {
											break; // We've reached the end of this group's descendants
										}
									}
									
									// Add this element to descendants
									descendants.push(currentElement);
									currentElement = currentElement.nextElementSibling;
								}
								
								return descendants;
							}
							
							// Find the group label element
							const groupLabel = itemsContainer.querySelector(`[data-group-id="${groupId}"]`);
							if (!groupLabel) {
								return;
							}
							
							// Get all descendants using DOM traversal
							const allDescendants = findAllDescendants(groupLabel);
							
							allDescendants.forEach((item, index) => {
								// If search is active, only toggle visible items
								if (isSearchActive) {
									// Check if item is visible (not hidden by search)
									const isVisible = !item.classList.contains('d-none') && item.style.display !== 'none';
									if (!isVisible) {
										return; // Skip hidden items during search
									}
								}
								
								// Toggle the item itself (if it has a checkbox) - including group labels
								const chk = item.querySelector('input[type="checkbox"]');
								if (chk) {
									chk.checked = isChecked;
									
									// Update the corresponding select option if it's not a group
									if (!item.classList.contains('ts-select-group-label')) {
										const optionIndex = parseInt(item.getAttribute('data-index'), 10);
										const option = selectEl.options[optionIndex];
										if (option) {
											option.selected = isChecked;
										}
									}
								}
							});
						}
						
						// Start recursive toggle from current group
						toggleGroupDescendants(groupId, isChecked);
						
						// Update all group checkboxes to reflect current state
						groupControls.forEach(ctrl => {
							if (ctrl.checkbox !== groupCheckbox) {
								// Find the correct group for this control
								const controlGroup = selectEl.querySelector(`optgroup[label="${ctrl.groupId}"], group[label="${ctrl.groupId}"]`);
								if (controlGroup) {
									updateGroupCheckboxState(ctrl.checkbox, controlGroup);
								}
							}
						});
						
						// Update toggle label and clear button
						selectEl.dispatchEvent(new Event('change', { bubbles: true }));
						syncFromOptions();
					});
				}
				
			} else {
				const option = node;
				const index = Array.from(selectEl.options).indexOf(option);
				
				const item = buildDropdownItem(option, selectEl.multiple, index);
				
				// Skip if buildDropdownItem returns null (placeholder options in single select)
				if (!item) return;
				
				item.classList.add(`level-${level}`);
				
				if (parentGroupLabel) {
					item.dataset.parentGroup = parentGroupLabel;
				}
				
				// Add keyboard navigation to options
				item.addEventListener('keydown', function(e) {
					if (e.key === 'ArrowDown') {
						e.preventDefault();
						e.stopPropagation();
						
						// Find next focusable item after this option
						let nextElement = this.nextElementSibling;
						while (nextElement) {
							if (nextElement.classList.contains('ts-select-group-label') || nextElement.hasAttribute('data-index')) {
								if (!nextElement.classList.contains('d-none')) {
									nextElement.focus();
									break;
								}
							}
							nextElement = nextElement.nextElementSibling;
						}
					} else if (e.key === 'ArrowUp') {
						e.preventDefault();
						e.stopPropagation();
						
						// Find previous focusable item before this option
						let prevElement = this.previousElementSibling;
						while (prevElement) {
							if (prevElement.classList.contains('ts-select-group-label') || prevElement.hasAttribute('data-index')) {
								if (!prevElement.classList.contains('d-none')) {
									prevElement.focus();
									break;
								}
							}
							prevElement = prevElement.previousElementSibling;
						}
					} else if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						e.stopPropagation();
						
						// Toggle the option checkbox/radio
						const checkbox = this.querySelector('input[type="checkbox"], input[type="radio"]');
						if (checkbox) {
							if (checkbox.type === 'checkbox') {
								checkbox.checked = !checkbox.checked;
							} else if (checkbox.type === 'radio') {
								checkbox.checked = true;
							}
							checkbox.dispatchEvent(new Event('change'));
							
							// Update all group checkbox states after keyboard change
							setTimeout(() => {
								groupControls.forEach(ctrl => {
									if (ctrl.checkbox) {
										// Find the correct group for this control
										const controlGroup = selectEl.querySelector(`optgroup[label="${ctrl.groupId}"], group[label="${ctrl.groupId}"]`);
										if (controlGroup) {
											updateGroupCheckboxState(ctrl.checkbox, controlGroup);
										}
									}
								});
							}, 10);
						}
					}
				});
				
				// Make option focusable
				item.setAttribute('tabindex', '0');
				
				itemsContainer.appendChild(item);
			}
		}

		const noRes = createElement('div', 'text-muted py-1 small ts-select-no-results', { text: noResultsText });
		noRes.style.display = 'none';
		menu.appendChild(noRes);

		Array.from(selectEl.children).forEach(child => renderNode(child, 0));

		const clearButtonTitle = (window.TsSelectLang && window.TsSelectLang.defaults && window.TsSelectLang.defaults.clearButtonTitle) || 'Clear';
		const clearBtn = createElement('span', 'ts-select-clear', { title: clearButtonTitle });
		clearBtn.innerHTML = '&times;';
		clearBtn.style.display = 'none'; // Hidden by default

		selectEl.style.display = 'none';
		selectEl.parentNode.insertBefore(wrapper, selectEl);
		wrapper.appendChild(selectEl);
		wrapper.appendChild(toggleInput);
		wrapper.appendChild(clearBtn);
		wrapper.appendChild(menu);

		// Now that clearBtn is created, we can call updateToggleLabel
		updateToggleLabel(toggleInput, selectEl, clearBtn);

		if (window.TsSelectLang) {
			document.addEventListener('tsSelectLanguageChanged', function(e) {
				updateSelectLanguage(wrapper, searchWrap, actions, toggleInput, clearBtn);
			});
		}

		let dd = null;
		if (BOOTSTRAP_READY && window.bootstrap.Dropdown) {
			dd = new window.bootstrap.Dropdown(toggleInput, { autoClose: 'outside' });
			
					// Listen for dropdown shown event to focus search input
		toggleInput.addEventListener('shown.bs.dropdown', function() {
			if (searchInput && isSearchable) {
				// Small delay to ensure dropdown is fully rendered
				setTimeout(() => {
					searchInput.focus();
				}, 50);
			}
			
			// Always refresh no results visibility when dropdown opens
			refreshNoResultsVisibility();
			
			// Restore custom height if it was set
			if (wrapper.dataset.customHeight) {
				itemsContainer.style.height = wrapper.dataset.customHeight;
				itemsContainer.style.maxHeight = 'none';
				itemsContainer.style.overflowY = 'auto';
				itemsContainer.dataset.customResize = 'true';
			}
			
			// Scroll to first selected item immediately when dropdown opens
			scrollToFirstSelectedItem(itemsContainer, selectEl);
		});
		}
		
		// Listen for dropdown hidden event to reset custom resize state
		toggleInput.addEventListener('hidden.bs.dropdown', function() {
			// Reset custom resize state when dropdown is closed
			itemsContainer.dataset.customResize = 'false';
		});
		
		// Old keyboard handler removed - using new one below
		
		// Prevent text selection completely
		toggleInput.addEventListener('selectstart', function(e) {
			e.preventDefault();
			e.stopPropagation();
			return false;
		});
		
		toggleInput.addEventListener('mousedown', function(e) {
			e.preventDefault();
			e.stopPropagation();
			return false;
		});
		
		toggleInput.addEventListener('dragstart', function(e) {
			e.preventDefault();
			e.stopPropagation();
			return false;
		});
		
		toggleInput.addEventListener('mouseup', function(e) {
			e.preventDefault();
			e.stopPropagation();
			return false;
		});
		

		
		// Prevent focus outline
		toggleInput.addEventListener('focus', function(e) {
			this.style.outline = 'none';
			this.style.boxShadow = 'none';
			// Also prevent text selection on focus
			this.setSelectionRange(0, 0);
		});

		function refreshNoResultsVisibility() {
		// For non-searchable selects, always check visibility regardless of dropdown state
			if (!isSearchable) {
				const visible = getVisibleItems(itemsContainer);
				if (visible.length === 0) {
					noRes.textContent = noResultsText;
					noRes.classList.add('show');
				// Remove any inline display style to let CSS handle it
				noRes.style.removeProperty('display');
				} else {
					noRes.classList.remove('show');
				noRes.style.display = 'none';
				}
				return;
			}
			
			// For searchable selects, only check when dropdown is open
			const isOpen = menu.classList.contains('show');
			if (!isOpen) return;
			
			const visible = getVisibleItems(itemsContainer);
			const term = (searchInput && typeof searchInput.value === 'string') ? searchInput.value.trim() : '';
			if (visible.length === 0) {
				const addNewCallbackName = selectEl.getAttribute('ts-add-new');
				if (term && addNewCallbackName) {
					const noResultsForText = `${noResultsText} for "${term}"`;
					const addThisItemText = 'Add This Item';
					noRes.innerHTML = `${noResultsForText}. <button type="button" class="btn btn-sm btn-link p-0 ms-1 ts-select-add-new">${addThisItemText}</button>`;
					const addBtn = noRes.querySelector('.ts-select-add-new');
					if (addBtn) {
						addBtn.addEventListener('click', (e) => {
							e.preventDefault();
							e.stopPropagation();
							try {
								const fn = window[addNewCallbackName];
								if (typeof fn === 'function') {
									fn(term);
								} else {
									console.warn('ts-add-new not found or not a function:', addNewCallbackName);
								}
							} catch (err) {
								console.error('Error calling ts-add-new:', err);
							}
						});
					}
				} else {
					const messageText = term ? `${noResultsText} for "${term}"` : noResultsText;
					noRes.textContent = messageText;
				}
				noRes.classList.add('show');
				// Remove any inline display style to let CSS handle it
				noRes.style.removeProperty('display');
			} else {
				noRes.classList.remove('show');
				noRes.style.display = 'none';
			}
		}

		function syncFromOptions() {
			const buttons = itemsContainer.querySelectorAll('[data-index]');
			buttons.forEach((btn) => {
				const idx = parseInt(btn.getAttribute('data-index'), 10);
				const opt = selectEl.options[idx];
				if (!opt) return;
				if (selectEl.multiple) {
					const chk = btn.querySelector('input[type="checkbox"]');
					if (chk) chk.checked = !!opt.selected;
					btn.classList.toggle('active', !!opt.selected);
				} else {
					const radio = btn.querySelector('input[type="radio"]');
					if (radio) radio.checked = !!opt.selected;
					btn.classList.toggle('active', !!opt.selected);
				}
			});
			if (selectEl.multiple && groupControls.length > 0) {
				groupControls.forEach(ctrl => {
					if (!ctrl.checkbox) return;
					
					// Use the same recursive logic for updating group states
					const controlGroup = selectEl.querySelector(`optgroup[label="${ctrl.groupId}"], group[label="${ctrl.groupId}"]`);
					if (controlGroup) {
						updateGroupCheckboxState(ctrl.checkbox, controlGroup);
					}
				});
			}
			updateToggleLabel(toggleInput, selectEl, clearBtn);
		}

		function updateGroupCheckboxState(checkbox, group) {
			const groupId = group.getAttribute('label');
			
			// Find ALL descendants at any depth using DOM traversal
			function findAllDescendants(startElement) {
				const descendants = [];
				let currentElement = startElement.nextElementSibling;
				
				while (currentElement) {
					// Stop if we hit another element at the same or higher level
					if (currentElement.classList.contains('ts-select-group-label')) {
						const currentLevel = parseInt(currentElement.dataset.level || '0', 10);
						const startLevel = parseInt(startElement.dataset.level || '0', 10);
						
						if (currentLevel <= startLevel) {
							break; // We've reached the end of this group's descendants
						}
					}
					
					// Add this element to descendants
					descendants.push(currentElement);
					currentElement = currentElement.nextElementSibling;
				}
				
				return descendants;
			}
			
			// Find the group label element
			const groupLabel = itemsContainer.querySelector(`[data-group-id="${groupId}"]`);
			if (!groupLabel) {
				return;
			}
			
			// Get all descendants using DOM traversal
			const allDescendants = findAllDescendants(groupLabel);
			
			// Count total items (excluding group labels) and checked items
			let totalItems = 0;
			let checkedItems = 0;
			
			allDescendants.forEach(item => {
				// Only count items that have checkboxes (not group labels)
				if (!item.classList.contains('ts-select-group-label')) {
					totalItems++;
					const chk = item.querySelector('input[type="checkbox"]');
					if (chk && chk.checked) {
						checkedItems++;
					}
				}
			});
			
			// Update checkbox state
			if (checkedItems === 0) {
				checkbox.checked = false;
				checkbox.indeterminate = false;
			} else if (checkedItems === totalItems) {
				checkbox.checked = true;
				checkbox.indeterminate = false;
			} else {
				checkbox.checked = false;
				checkbox.indeterminate = true;
			}
		}

		clearBtn.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			
			// Clear all options
			Array.from(selectEl.options).forEach(opt => opt.selected = false);
			
			// For single select, select the placeholder option if it exists
			if (!selectEl.multiple) {
				const placeholderOpt = Array.from(selectEl.options).find(o => o.dataset && o.dataset.placeholder === 'true');
				if (placeholderOpt) {
					placeholderOpt.selected = true;
				}
			}
			
			selectEl.dispatchEvent(new Event('change', { bubbles: true }));
			syncFromOptions();
		});

		itemsContainer.addEventListener('click', function(e) {
			let target = e.target;
			
			// Find the closest option item (button with data-index) if clicking on child elements
			if (!target.hasAttribute('data-index')) {
				target = target.closest('[data-index]');
			}
			
			if (target && target.hasAttribute('data-index')) {
				const index = parseInt(target.getAttribute('data-index'), 10);
				const option = selectEl.options[index];
				if (!option || option.disabled) return;
				
				if (selectEl.multiple) {
					option.selected = !option.selected;
					const checkbox = target.querySelector('input[type="checkbox"]');
					if (checkbox) checkbox.checked = option.selected;
					target.classList.toggle('active', option.selected);
				} else {
					Array.from(selectEl.options).forEach(opt => opt.selected = false);
					option.selected = true;
					itemsContainer.querySelectorAll('[data-index]').forEach(item => {
						item.classList.remove('active');
						const radio = item.querySelector('input[type="radio"]');
						if (radio) radio.checked = false;
					});
					target.classList.add('active');
					const radio = target.querySelector('input[type="radio"]');
					if (radio) radio.checked = true;
					
					// Add 100ms delay before closing dropdown so user can see radio button change
					if (dd) {
						setTimeout(() => {
							dd.hide();
						}, 100);
					}
				}
				
				selectEl.dispatchEvent(new Event('change', { bubbles: true }));
				syncFromOptions();
			}
		});

		wrapper.getVal = function() {
			if (selectEl.multiple) {
				return Array.from(getSelectedOptions(selectEl)).map(o => o.value);
			} else {
				const selected = getSelectedOptions(selectEl);
				return selected.length > 0 ? selected[0].value : '';
			}
		};

		wrapper.setVal = function(value) {
			const ph = Array.from(selectEl.options).find(o => o.dataset && o.dataset.placeholder === 'true');
			if (value === null || value === undefined || value === '') {
				Array.from(selectEl.options).forEach(opt => opt.selected = false);
				if (!selectEl.multiple && ph) ph.selected = true;
			} else if (Array.isArray(value)) {
				const stringValues = value.map(v => String(v));
				Array.from(selectEl.options).forEach(opt => {
					opt.selected = stringValues.includes(String(opt.value));
				});
				if (!selectEl.multiple && ph) ph.selected = false;
			} else {
				const stringValue = String(value);
				selectEl.value = stringValue;
				if (ph) ph.selected = false;
			}
			selectEl.dispatchEvent(new Event('change', { bubbles: true }));
			syncFromOptions();
		};

		selectEl.addEventListener('change', () => syncFromOptions());

		const observer = new MutationObserver((mutations) => {
			for (const m of mutations) {
				if (m.type === 'attributes' && m.attributeName === 'disabled') {
					if (selectEl.disabled) wrapper.classList.add('disabled'); else wrapper.classList.remove('disabled');
				}
			}
		});
		observer.observe(selectEl, { attributes: true });

		syncFromOptions();
		
		if (!hasGroups) {
			wrapper.style.setProperty('--ts-checkbox-margin-left', '0px');
		} else {
			wrapper.style.setProperty('--ts-checkbox-margin-left', '6px');
		}
		
		// Simple keyboard support for opening dropdown and focusing search
		toggleInput.addEventListener('keydown', function(e) {
			if (e.key === 'Enter' || e.key === 'ArrowDown') {
				e.preventDefault();
				e.stopPropagation();
				
				if (dd && !menu.classList.contains('show')) {
					// Open dropdown
					dd.show();
					
					// Focus search input after a short delay to ensure dropdown is fully rendered
					if (isSearchable && searchInput) {
						setTimeout(() => {
							searchInput.focus();
						}, 100);
					}
				}
			}
		});
		
		// Keyboard navigation from search input
		if (searchInput) {
			searchInput.addEventListener('keydown', function(e) {
				if (e.key === 'ArrowDown') {
					e.preventDefault();
					e.stopPropagation();
					
					// Try to focus action buttons first (if they exist)
					if (actions && actions.box) {
						const firstActionBtn = actions.box.querySelector('button');
						if (firstActionBtn) {
							firstActionBtn.focus();
							return;
						}
					}
					
					// If no action buttons, focus first focusable item (options or groups)
					// Use direct DOM traversal to find all focusable items
					const allFocusableItems = [];
					
					// Find all direct children of itemsContainer
					Array.from(itemsContainer.children).forEach(child => {
						if (!child.classList.contains('d-none')) {
							// Check if it's a group label or option
							if (child.classList.contains('ts-select-group-label') || child.hasAttribute('data-index')) {
								allFocusableItems.push(child);
							}
						}
					});
					
					if (allFocusableItems.length > 0) {
						allFocusableItems[0].focus();
					}
				}
			});
		}
		
		// Keyboard navigation from action buttons
		if (actions && actions.box) {
			actions.box.addEventListener('keydown', function(e) {
				if (e.key === 'ArrowDown') {
					e.preventDefault();
					e.stopPropagation();
					
					// Move focus to first focusable item (options or groups)
					// Use direct DOM traversal to find all focusable items
					const allFocusableItems = [];
					
					// Find all direct children of itemsContainer
					Array.from(itemsContainer.children).forEach(child => {
						if (!child.classList.contains('d-none')) {
							// Check if it's a group label or option
							if (child.classList.contains('ts-select-group-label') || child.hasAttribute('data-index')) {
								allFocusableItems.push(child);
							}
						}
					});
					
					if (allFocusableItems.length > 0) {
						allFocusableItems[0].focus();
					}
				}
			});
		}
	}

	function autoInit() {
		const selects = document.querySelectorAll('select.ts-select, select[ts-select]');
		selects.forEach(select => {
			if (!select.dataset.tsSelectInitialized) {
				initializeSelect(select);
			}
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', autoInit);
			} else {
		autoInit();
	}

	window.TsSelect = {
		init: function(selectEl) {
			if (selectEl) {
				initializeSelect(selectEl);
			} else {
				autoInit();
			}
		},
		
		// Method to select all options
		selectAll: function(selectId) {
			const selectEl = document.getElementById(selectId);
			if (!selectEl) return;
			
			// Select all options except placeholders
			Array.from(selectEl.options).forEach(option => {
				if (!option.dataset.placeholder) {
					option.selected = true;
				}
			});
			
			// Update the ts-select component if it exists
			const wrapper = document.querySelector(`[data-ts-select-for="${selectId}"]`);
			if (wrapper) {
				const toggleInput = wrapper.querySelector('.ts-select-toggle');
				const clearBtn = wrapper.querySelector('.ts-select-clear');
				updateToggleLabel(toggleInput, selectEl, clearBtn);
			}
		},
		
		// Method to deselect all options
		selectNone: function(selectId) {
			const selectEl = document.getElementById(selectId);
			if (!selectEl) return;
			
			// Deselect all options
			Array.from(selectEl.options).forEach(option => {
				option.selected = false;
			});
			
			// Update the ts-select component if it exists
			const wrapper = document.querySelector(`[data-ts-select-for="${selectId}"]`);
			if (wrapper) {
				const toggleInput = wrapper.querySelector('.ts-select-toggle');
				const clearBtn = wrapper.querySelector('.ts-select-clear');
				updateToggleLabel(toggleInput, selectEl, clearBtn);
			}
		},
		
		// Method to invert selection
		selectInverse: function(selectId) {
			const selectEl = document.getElementById(selectId);
			if (!selectEl) return;
			
			// Invert selection for all options except placeholders
			Array.from(selectEl.options).forEach(option => {
				if (!option.dataset.placeholder) {
					option.selected = !option.selected;
				}
			});
			
			// Update the ts-select component if it exists
			const wrapper = document.querySelector(`[data-ts-select-for="${selectId}"]`);
			if (wrapper) {
				const toggleInput = wrapper.querySelector('.ts-select-toggle');
				const clearBtn = wrapper.querySelector('.ts-select-clear');
				updateToggleLabel(toggleInput, selectEl, clearBtn);
			}
		}
	};
	
	// Add helper function to get language values
	if (typeof window !== 'undefined') {
		window.TsSelectLang = window.TsSelectLang || {};
		window.TsSelectLang.get = function(key) {
			return this.defaults && this.defaults[key] ? this.defaults[key] : null;
		};
	}
})();

