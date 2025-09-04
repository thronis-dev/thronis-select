# TS-Select - Advanced Bootstrap 5 Select Component

A powerful, feature-rich select component built on Bootstrap 5 with support for single/multiple selection, grouping, search, keyboard navigation, and much more. Thronis Select is inspired by <a target="_blank" href="https://developer.snapappointments.com/bootstrap-select/">Bootstrap Select Picker</a>

## Features

- ✅ **Single & Multiple Selection** - Support for both single and multi-select modes
- ✅ **Grouping** - Organize options with collapsible groups
- ✅ **Search** - Built-in search functionality with group label support
- ✅ **Keyboard Navigation** - Full keyboard support for accessibility
- ✅ **Resizable Dropdown** - Drag to resize dropdown height
- ✅ **HTML Content** - Support for HTML in option labels
- ✅ **Internationalization** - Multi-language support
- ✅ **jQuery Integration** - Easy jQuery-style API
- ✅ **Bootstrap 5** - Built on Bootstrap 5 components

## Demo
<a href="https://www.youtube.com/watch?v=cdkMwkctdyY" target="_blank">View On YouTube</a>

## Installation

Include the required files in your HTML:


```html
<!-- Bootstrap 5 CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- TS-Select CSS -->
<link rel="stylesheet" href="ts-select.css">

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<!-- Bootstrap 5 JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<!-- TS-Select JS -->
<script src="ts-select.js"></script>

<!-- Language Files (Optional) -->
<script src="ts-select-lang.js"></script>        <!-- English (default) -->
<script src="ts-select-turkish.js"></script>     <!-- Turkish -->
<script src="ts-select-german.js"></script>      <!-- German -->
```

## Basic Usage

### Single Select

```html
<select id="singleSelect" class="ts-select">
    <option value="">Select an option</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
</select>
```

### Multiple Select

```html
<select id="multiSelect" class="ts-select" multiple>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
    <option value="4">Option 4</option>
</select>
```

### With Groups

```html
<select id="groupedSelect" class="ts-select" multiple>
    <group label="Group 1">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
    </group>
    <group label="Group 2">
        <option value="3">Option 3</option>
        <option value="4">Option 4</option>
    </group>
</select>
```

## Parameters

### HTML Attributes

| Attribute | Values | Description | Default |
|-----------|--------|-------------|---------|
| `ts-searchable` | `true`/`false` | Enable/disable search functionality | `true` |
| `ts-actions-box` | `true`/`false` | Show/hide action buttons (All, None, Inverse) | `true` (for multiple) |
| `ts-resize` | `true`/`false` | Enable/disable dropdown resize handle | `false` |
| `ts-size` | `number` | Maximum number of visible items | `auto` |
| `ts-label-format` | `count`/`>x` | Display format for selected items | `smart truncation` |
| `ts-add-new` | `functionName` | Callback function for adding new options | `none` |

### Label Format Options

```html
<!-- Show only count -->
<select ts-label-format="count">...</select>

<!-- Show items if ≤ 3, otherwise show count -->
<select ts-label-format=">3">...</select>

<!-- Show items if ≤ 5, otherwise show count -->
<select ts-label-format=">5">...</select>
```

## Advanced Features

### HTML Content in Options

```html
<select class="ts-select" multiple>
    <option value="1">Regular Text</option>
    <option value="2" data-html="<strong>Bold Text</strong>">Option 2</option>
    <option value="3" data-html="<span style='color: red;'>Red Text</span>">Option 3</option>
</select>
```

### Additional Option Attributes

```html
<select class="ts-select" multiple>
    <option value="1" data-id="ID001" data-info="Additional info">Option 1</option>
    <option value="2" data-id="ID002">Option 2</option>
</select>
```

### Nested Groups

```html
<select class="ts-select" multiple>
    <group label="Main Group">
        <option value="1">Main Option 1</option>
        <group label="Sub Group">
            <option value="2">Sub Option 1</option>
            <option value="3">Sub Option 2</option>
        </group>
    </group>
</select>
```

## JavaScript API

### jQuery Methods

```javascript
// Get selected values
var values = $("#mySelect").tsVal();

// Set selected values
$("#mySelect").tsVal(["1", 2, 3]);

// Select all options
$("#mySelect").selectAll();

// Deselect all options
$("#mySelect").selectNone();

// Invert selection
$("#mySelect").selectInverse();
```

### Programmatic Control

```javascript
// Initialize manually
window.TsSelect.init(document.getElementById('mySelect'));

// Get wrapper element methods
var wrapper = document.querySelector('[data-ts-select-for="mySelect"]');

// Available methods on wrapper:
wrapper.getVal();                    // Get selected values
wrapper.setVal(['1', '2']);          // Set selected values
wrapper.scrollToSelected();          // Scroll to selected items
wrapper.expandAllGroups();           // Expand all groups
wrapper.collapseAllGroups();         // Collapse all groups
wrapper.resetHeight();               // Reset dropdown height
wrapper.setHeight(300);              // Set custom height
```

## Language Support

### Default (English)
```html
<script src="ts-select-lang.js"></script>
```

### Turkish
```html
<script src="ts-select-lang.js"></script>
<script src="ts-select-turkish.js"></script>
```

### German
```html
<script src="ts-select-lang.js"></script>
<script src="ts-select-german.js"></script>
```

### Custom Language
```javascript
// Override default language
window.TsSelectLang.defaults = {
    searchPlaceholder: 'Search...',
    selectAllText: 'All',
    deselectAllText: 'None',
    inverseText: 'Inverse',
    noResultsText: 'No results found',
    // ... more options
};
```

## Complete Examples

### Example 1: Basic Multi-Select with Search

```html
<select id="cities" class="ts-select" multiple ts-searchable="true" ts-actions-box="true">
    <group label="Turkey">
        <option value="istanbul">Istanbul</option>
        <option value="ankara">Ankara</option>
        <option value="izmir">Izmir</option>
    </group>
    <group label="Germany">
        <option value="berlin">Berlin</option>
        <option value="munich">Munich</option>
        <option value="hamburg">Hamburg</option>
    </group>
</select>

<script>
// Get selected cities
$("#cities").tsVal();

// Select all Turkish cities
$("#cities").tsVal(["istanbul", "ankara", "izmir"]);
</script>
```

### Example 2: Single Select with HTML Content

```html
<select id="products" class="ts-select" ts-label-format="count">
    <option value="1" data-html="<strong>Premium Product</strong> <span class='badge bg-success'>New</span>">Product 1</option>
    <option value="2" data-html="<em>Standard Product</em>">Product 2</option>
    <option value="3" data-html="<span style='color: red;'>Sale Product</span>">Product 3</option>
</select>
```

### Example 3: Resizable Dropdown with Custom Size

```html
<select id="largeList" class="ts-select" multiple ts-resize="true" ts-size="10">
    <!-- 50+ options here -->
</select>
```

## CSS Customization

### Custom Styling

```css
/* Custom dropdown colors */
.ts-select .dropdown-menu {
    background-color: #f8f9fa;
    border: 2px solid #007bff;
}

/* Custom checkbox styling */
.ts-select .form-check-input:checked {
    background-color: #28a745;
    border-color: #28a745;
}

/* Custom group labels */
.ts-select .ts-select-group-label {
    background-color: #e9ecef;
    font-weight: bold;
}
```

## Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## Dependencies

- jQuery 3.0+
- Bootstrap 5.0+

## License

MIT License - feel free to use in your projects! We'll be glad if you credit us 🤘🙂🤘

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

---

**Made with ❤️ By <a href="https://thronis.com" target="_blank">Thronis</a>**
