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
- ✅ **Dynamic Options** - Add/remove options programmatically
- ✅ **JSON Object Support** - Add options using JSON objects
- ✅ **Auto-Refresh** - Automatic component refresh after option changes
- ✅ **Enhanced Synchronization** - Improved radio button and checkbox synchronization
- ✅ **Title Attribute Support** - Use title attribute to override placeholder text
- ✅ **CSS Class Inheritance** - Automatic inheritance of Bootstrap classes (bg-primary, text-white, etc.)

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

### Minimal Setup

The simplest way to use TS-Select is with just the `title` attribute:

```html
<select title="Choose an option" class="ts-select">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
</select>
```

### Single Select

```html
<select id="singleSelect" title="Choose an option" class="ts-select">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
</select>
```

### Multiple Select

```html
<select id="multiSelect" title="Choose options" ts-search-placeholder="Search options..." class="ts-select" multiple>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
    <option value="4">Option 4</option>
</select>
```

### With Groups

```html
<select id="groupedSelect" title="Choose from groups" ts-search-placeholder="Search in groups..." class="ts-select" multiple>
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

### With Sub-Groups (Nested Groups)

```html
<select id="nestedSelect" title="Choose from nested groups" ts-search-placeholder="Search in nested groups..." class="ts-select" multiple>
    <group label="Fruits">
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <group label="Citrus">
            <option value="orange">Orange</option>
            <option value="lemon">Lemon</option>
            <option value="lime">Lime</option>
        </group>
        <group label="Berries">
            <option value="strawberry">Strawberry</option>
            <option value="blueberry">Blueberry</option>
        </group>
    </group>
    <group label="Vegetables">
        <option value="carrot">Carrot</option>
        <option value="broccoli">Broccoli</option>
        <group label="Leafy Greens">
            <option value="spinach">Spinach</option>
            <option value="lettuce">Lettuce</option>
        </group>
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
| `title` | `string` | Set placeholder text for the select input | `language default` |
| `ts-search-placeholder` | `string` | Set placeholder text for the search input | `language default` |

### Label Format Options

```html
<!-- Show only count -->
<select ts-label-format="count">...</select>

<!-- Show items if ≤ 3, otherwise show count -->
<select ts-label-format=">3">...</select>

<!-- Show items if ≤ 5, otherwise show count -->
<select ts-label-format=">5">...</select>
```

### Placeholder Text Configuration

TS-Select supports separate placeholder text for the main select input and search input:

#### Main Select Placeholder
- **`title` attribute**: Sets the placeholder text for the main select input
- **Fallback**: Uses language-specific default text

#### Search Input Placeholder  
- **`ts-search-placeholder` attribute**: Sets the placeholder text for the search input
- **Fallback**: Uses language-specific default text

```html
<!-- Custom placeholders for both select and search -->
<select title="Choose An Option" ts-search-placeholder="Search options..." class="ts-select">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
</select>

<!-- Only custom select placeholder -->
<select title="Pick Something" class="ts-select">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
</select>

<!-- Only custom search placeholder -->
<select ts-search-placeholder="Find items..." class="ts-select">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
</select>

<!-- Uses language defaults -->
<select class="ts-select">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
</select>
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
$("#mySelect").tsAll();

// Deselect all options
$("#mySelect").tsNone();

// Invert selection
$("#mySelect").tsInverse();

// Refresh component after adding/removing options
$("#mySelect").tsRefresh();
```

### Dynamic Options

#### Adding Options with HTML Strings

```javascript
// Add single option
$("#mySelect").append("<option value='new' data-id='new' data-info='New option'>New Option</option>");
$("#mySelect").tsRefresh();

// Add multiple options
$("#mySelect").append("<option value='1'>Option 1</option>");
$("#mySelect").append("<option value='2'>Option 2</option>");
$("#mySelect").tsRefresh();
```

#### Adding Options with JSON Objects

```javascript
// Add single option using JSON object
$("#mySelect").tsAddOption({
    "value": "option_value",
    "id": "option_id",
    "info": "Additional information",
    "html": "<strong>Bold Text</strong> with <em>formatting</em>",
    "selected": false,
    "disabled": false
});

// Add multiple options at once
$("#mySelect").tsAddOption([
    {
        "value": "option1",
        "id": "opt1",
        "info": "First option",
        "text": "Option 1"
    },
    {
        "value": "option2",
        "id": "opt2",
        "info": "Second option",
        "text": "Option 2"
    }
]);
```

#### JSON Object Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `value` | string | Yes | The option value |
| `id` | string | No | Shows as a badge next to the option |
| `info` | string | No | Additional information text |
| `html` | string | No | HTML content for the option text |
| `text` | string | No | Plain text (fallback if no html) |
| `label` | string | No | Alternative to text |
| `selected` | boolean | No | Pre-select the option |
| `disabled` | boolean | No | Disable the option |
| `placeholder` | boolean | No | Mark as placeholder option |

### Programmatic Control

```javascript
// Initialize manually
window.TsSelect.init(document.getElementById('mySelect'));

// Get wrapper element methods
var wrapper = document.querySelector('[data-ts-select-for="mySelect"]');

// Available methods on wrapper:
wrapper.tsScrollToSelected();        // Scroll to selected items
wrapper.tsExpandGroup('Group1');     // Expand specific group (or null for all)
wrapper.tsCollapseGroup('Group1');   // Collapse specific group (or null for all)
wrapper.tsSetHeight(300);            // Set custom height in pixels
wrapper.tsSetHeight();               // Reset dropdown height to default
```

### Wrapper Methods Details

#### **tsScrollToSelected()**
Scrolls the dropdown to the first selected item.

```javascript
wrapper.tsScrollToSelected();
```

#### **tsExpandGroup(groupId)**
Expands group(s). If `groupId` is provided, expands only that group. If `null` or omitted, expands all groups.

```javascript
wrapper.tsExpandGroup('Turkey');     // Expand specific group
wrapper.tsExpandGroup();             // Expand all groups
wrapper.tsExpandGroup(null);         // Expand all groups
```

#### **tsCollapseGroup(groupId)**
Collapses group(s). If `groupId` is provided, collapses only that group. If `null` or omitted, collapses all groups.

```javascript
wrapper.tsCollapseGroup('Turkey');   // Collapse specific group
wrapper.tsCollapseGroup();           // Collapse all groups
wrapper.tsCollapseGroup(null);       // Collapse all groups
```

#### **tsSetHeight(height)**
Sets the dropdown height. If `height` is provided (in pixels), sets custom height. If `null` or omitted, resets to default height.

```javascript
wrapper.tsSetHeight(400);            // Set height to 400px
wrapper.tsSetHeight();               // Reset to default height
wrapper.tsSetHeight(null);           // Reset to default height
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

### Polish
```html
<script src="ts-select-lang.js"></script>
<script src="ts-select-polish.js"></script>
```

### French
```html
<script src="ts-select-lang.js"></script>
<script src="ts-select-french.js"></script>
```

### Italian
```html
<script src="ts-select-lang.js"></script>
<script src="ts-select-italian.js"></script>
```

### Spanish
```html
<script src="ts-select-lang.js"></script>
<script src="ts-select-spanish.js"></script>
```

### Available Languages Summary

| Language | File | Code |
|----------|------|------|
| English (Default) | `ts-select-lang.js` | `en` |
| Turkish | `ts-select-turkish.js` | `tr` |
| German | `ts-select-german.js` | `de` |
| Polish | `ts-select-polish.js` | `pl` |
| French | `ts-select-french.js` | `fr` |
| Italian | `ts-select-italian.js` | `it` |
| Spanish | `ts-select-spanish.js` | `es` |

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

## Event Handling

TS-Select dispatches standard DOM events that you can listen to:

### Change Events
The component dispatches `change` events on the select element whenever the selection changes:

```javascript
// Listen for selection changes
document.getElementById('mySelect').addEventListener('change', function(e) {
    console.log('Selection changed:', e.target.value);
    console.log('Selected values:', $(this).tsVal());
});

// Using jQuery
$('#mySelect').on('change', function() {
    console.log('Selection changed:', $(this).tsVal());
});
```

### Example: Real-time Updates
```html
<select id="productSelect" title="Choose products" class="ts-select" multiple>
    <option value="1">Product 1</option>
    <option value="2">Product 2</option>
    <option value="3">Product 3</option>
</select>

<div id="selectedCount">0 items selected</div>

<script>
$('#productSelect').on('change', function() {
    const selectedValues = $(this).tsVal();
    const count = selectedValues.length;
    $('#selectedCount').text(count + ' item' + (count !== 1 ? 's' : '') + ' selected');
});
</script>
```

## Dynamic Option Creation (ts-add-new)

The `ts-add-new` attribute allows users to create new options on-the-fly when no search results are found. This is perfect for scenarios where users need to add new items that don't exist in the current options.

### How It Works

When a user searches for something that doesn't exist in the options, and the `ts-add-new` attribute is set, the component shows an "Add This Item" button that calls a custom function.

### Basic Usage

```html
<select id="tags" title="Choose or add tags" ts-search-placeholder="Search or add tags..." class="ts-select" multiple ts-add-new="addNewTag">
    <option value="javascript">JavaScript</option>
    <option value="html">HTML</option>
    <option value="css">CSS</option>
</select>

<script>
// Function to handle adding new tags
function addNewTag(searchTerm) {
    // Add the new option to the select
    const newOption = document.createElement('option');
    newOption.value = searchTerm.toLowerCase().replace(/\s+/g, '-');
    newOption.textContent = searchTerm;
    newOption.selected = true; // Auto-select the new option
    
    document.getElementById('tags').appendChild(newOption);
    
    // Refresh the component to show the new option
    $('#tags').tsRefresh();
    
    console.log('Added new tag:', searchTerm);
}
</script>
```

### Advanced Example: API Integration

```html
<select id="users" title="Select users" ts-search-placeholder="Search users..." class="ts-select" multiple ts-add-new="createNewUser">
    <option value="1">John Doe</option>
    <option value="2">Jane Smith</option>
</select>

<script>
function createNewUser(searchTerm) {
    // Show loading state
    const select = document.getElementById('users');
    const loadingOption = document.createElement('option');
    loadingOption.value = 'loading';
    loadingOption.textContent = 'Creating user...';
    loadingOption.disabled = true;
    select.appendChild(loadingOption);
    $('#users').tsRefresh();
    
    // Simulate API call to create user
    fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: searchTerm })
    })
    .then(response => response.json())
    .then(user => {
        // Remove loading option
        const loadingOpt = select.querySelector('option[value="loading"]');
        if (loadingOpt) loadingOpt.remove();
        
        // Add the new user option
        const newOption = document.createElement('option');
        newOption.value = user.id;
        newOption.textContent = user.name;
        newOption.selected = true;
        select.appendChild(newOption);
        
        // Refresh the component
        $('#users').tsRefresh();
        
        console.log('Created new user:', user);
    })
    .catch(error => {
        // Remove loading option on error
        const loadingOpt = select.querySelector('option[value="loading"]');
        if (loadingOpt) loadingOpt.remove();
        $('#users').tsRefresh();
        
        console.error('Failed to create user:', error);
        alert('Failed to create user. Please try again.');
    });
}
</script>
```

### Example: Validation and Error Handling

```html
<select id="categories" title="Select categories" ts-search-placeholder="Search categories..." class="ts-select" multiple ts-add-new="addNewCategory">
    <option value="tech">Technology</option>
    <option value="design">Design</option>
</select>

<script>
function addNewCategory(searchTerm) {
    // Validate the input
    if (!searchTerm || searchTerm.length < 2) {
        alert('Category name must be at least 2 characters long.');
        return;
    }
    
    if (searchTerm.length > 50) {
        alert('Category name must be less than 50 characters.');
        return;
    }
    
    // Check if category already exists (case-insensitive)
    const select = document.getElementById('categories');
    const existingOptions = Array.from(select.options);
    const exists = existingOptions.some(opt => 
        opt.textContent.toLowerCase() === searchTerm.toLowerCase()
    );
    
    if (exists) {
        alert('This category already exists.');
        return;
    }
    
    // Add the new category
    const newOption = document.createElement('option');
    newOption.value = searchTerm.toLowerCase().replace(/\s+/g, '-');
    newOption.textContent = searchTerm;
    newOption.selected = true;
    
    select.appendChild(newOption);
    $('#categories').tsRefresh();
    
    console.log('Added new category:', searchTerm);
}
</script>
```

### Key Features

- **Automatic Trigger**: Only appears when search returns no results
- **Search Term Access**: The callback function receives the search term as a parameter
- **Global Function**: The function must be defined in the global scope (`window`)
- **Error Handling**: Built-in error handling with console warnings
- **Flexible Integration**: Perfect for API calls, validation, and custom logic

### Best Practices

1. **Always refresh**: Call `$('#selectId').tsRefresh()` after adding new options
2. **Validate input**: Check the search term before creating new options
3. **Handle errors**: Provide user feedback for failed operations
4. **Auto-select**: Set `selected = true` on new options for better UX
5. **Unique values**: Ensure new option values don't conflict with existing ones

## Complete Examples

### Example 1: Basic Multi-Select with Search

```html
<select id="cities" title="Choose cities" ts-search-placeholder="Search cities..." class="ts-select" multiple>
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
<select id="products" title="Choose a product" ts-search-placeholder="Search products..." class="ts-select">
    <option value="1" data-html="<strong>Premium Product</strong> <span class='badge bg-success'>New</span>">Product 1</option>
    <option value="2" data-html="<em>Standard Product</em>">Product 2</option>
    <option value="3" data-html="<span style='color: red;'>Sale Product</span>">Product 3</option>
</select>
```

### Example 3: Advanced Features

```html
<select id="advancedSelect" title="Choose options" ts-search-placeholder="Search..." class="ts-select" multiple ts-resize="true" ts-size="10" ts-actions-box="true" ts-label-format=">3">
    <!-- 50+ options here -->
</select>
```

### Example 4: Dynamic Options with JSON Objects

```html
<select id="dynamicSelect" title="Choose options" ts-search-placeholder="Search options..." class="ts-select" multiple>
    <!-- Options will be added dynamically -->
</select>

<button id="addOptionBtn">Add New Option</button>

<script>
// Add options on page load
$(document).ready(function() {
    // Add initial options using JSON objects
    $("#dynamicSelect").tsAddOption([
        {
            "value": "rstudio",
            "id": "rstudio",
            "info": "Most popular IDE for R",
            "text": "RStudio"
        },
        {
            "value": "vscode",
            "id": "vscode", 
            "info": "Microsoft's code editor",
            "html": "<strong>Visual Studio Code</strong> <span class='badge bg-primary'>Popular</span>"
        }
    ]);
});

// Add options dynamically
$("#addOptionBtn").click(function() {
    const randomId = Math.floor(Math.random() * 1000);
    
    $("#dynamicSelect").tsAddOption({
        "value": `option_${randomId}`,
        "id": `opt_${randomId}`,
        "info": `Dynamically added option ${randomId}`,
        "html": `<span style='color: blue;'>Dynamic Option ${randomId}</span>`
    });
});
</script>
```

### Example 5: AJAX Data Loading

```html
<select id="ajaxSelect" title="Choose options" ts-search-placeholder="Search loaded options..." class="ts-select" multiple>
    <option value="loading">Loading options...</option>
</select>

<script>
// Load options from API
$.ajax({
    url: '/api/options',
    method: 'GET',
    success: function(data) {
        // Clear loading option
        $("#ajaxSelect").empty();
        
        // Add options from API response
        $("#ajaxSelect").tsAddOption(data.options);
    },
    error: function() {
        $("#ajaxSelect").tsAddOption({
            "value": "error",
            "text": "Error loading options",
            "disabled": true
        });
    }
});
</script>
```

### Example 6: Dynamic Placeholder Changes

```html
<select id="dynamicSelect" title="Choose An Option" ts-search-placeholder="Search options..." class="ts-select" multiple>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
</select>

<button id="changeTitleBtn">Change Title</button>
<button id="changeSearchBtn">Change Search Placeholder</button>

<script>
// Change main select placeholder
$("#changeTitleBtn").click(function() {
    const titles = [
        "Choose An Option",
        "Select Your Items", 
        "Pick Something",
        "Make Your Choice",
        "Select Options"
    ];
    
    const currentTitle = $("#dynamicSelect").attr('title');
    let newTitle;
    
    // Get a different title than the current one
    do {
        newTitle = titles[Math.floor(Math.random() * titles.length)];
    } while (newTitle === currentTitle);
    
    // Update the title attribute
    $("#dynamicSelect").attr('title', newTitle);
    
    // Refresh the component to update the placeholder
    $("#dynamicSelect").tsRefresh();
    
    console.log(`Changed title from "${currentTitle}" to "${newTitle}"`);
});

// Change search placeholder
$("#changeSearchBtn").click(function() {
    const searchPlaceholders = [
        "Search options...",
        "Find items...", 
        "Type to search...",
        "Filter results...",
        "Look for options..."
    ];
    
    const currentSearchPlaceholder = $("#dynamicSelect").attr('ts-search-placeholder');
    let newSearchPlaceholder;
    
    // Get a different search placeholder than the current one
    do {
        newSearchPlaceholder = searchPlaceholders[Math.floor(Math.random() * searchPlaceholders.length)];
    } while (newSearchPlaceholder === currentSearchPlaceholder);
    
    // Update the ts-search-placeholder attribute
    $("#dynamicSelect").attr('ts-search-placeholder', newSearchPlaceholder);
    
    // Refresh the component to update the search placeholder
    $("#dynamicSelect").tsRefresh();
    
    console.log(`Changed search placeholder from "${currentSearchPlaceholder}" to "${newSearchPlaceholder}"`);
});
</script>
```

## Enhanced Features

### Improved Synchronization

TS-Select now features enhanced synchronization between the input field and dropdown options:

- **Radio Button Sync**: In single-select mode, radio buttons are properly synchronized with the selected option
- **Checkbox Sync**: In multi-select mode, checkboxes accurately reflect the selected state
- **Auto-Refresh**: Component automatically refreshes when dropdown is opened to ensure proper state
- **Cross-Mode Compatibility**: Seamless switching between single and multi-select modes

### Dynamic Option Management

The component now supports comprehensive dynamic option management:

- **Real-time Updates**: Options can be added/removed without page refresh
- **JSON Object Support**: Add options using structured JSON objects
- **HTML Content**: Full HTML support in option text via JSON objects
- **Batch Operations**: Add multiple options at once using arrays
- **Automatic Refresh**: Component automatically updates UI after option changes

### Placeholder Text Management

Enhanced placeholder text management with separate controls:

- **Title Attribute**: `title` attribute sets the main select input placeholder text
- **Search Placeholder**: `ts-search-placeholder` attribute sets the search input placeholder text
- **Fallback System**: Graceful fallback to language-specific defaults for both placeholders
- **Dynamic Updates**: Change attributes and refresh component to update placeholders
- **Language Override**: Custom attributes override language-specific placeholders
- **Single/Multi Support**: Works seamlessly in both single and multiple select modes

### Performance Optimizations

- **Efficient Rendering**: Optimized rendering for large option lists
- **Memory Management**: Proper cleanup of event listeners and DOM elements
- **Lazy Loading**: Support for loading options on demand
- **Search Optimization**: Improved search performance with large datasets

## CSS Customization

### Automatic Class Inheritance

TS-Select automatically inherits CSS classes from the `<select>` element and applies them to the component wrapper and input field. This allows you to use Bootstrap utility classes directly on your select elements.

#### Background Colors
```html
<!-- Blue background with white text -->
<select class="ts-select bg-primary text-white">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
</select>

<!-- Green background with white text -->
<select class="ts-select bg-success text-white">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
</select>

<!-- Dark background with white text -->
<select class="ts-select bg-dark text-white">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
</select>
```

#### Supported Bootstrap Classes
- **Background Colors**: `bg-primary`, `bg-secondary`, `bg-success`, `bg-danger`, `bg-warning`, `bg-info`, `bg-light`, `bg-dark`
- **Text Colors**: `text-white`, `text-dark`, `text-muted`, `text-primary`, `text-secondary`, `text-success`, `text-danger`, `text-warning`, `text-info`
- **Borders**: `border`, `border-primary`, `border-success`, etc.
- **Utilities**: `shadow`, `rounded`, `rounded-lg`, etc.

#### Dynamic Class Updates
Classes are automatically synchronized when changed dynamically:

```javascript
// Add background color dynamically
document.getElementById('mySelect').classList.add('bg-warning');

// Remove background color dynamically
document.getElementById('mySelect').classList.remove('bg-primary');

// The component automatically updates to reflect these changes
```

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

/* Override inherited styles if needed */
.ts-select .ts-select-toggle.bg-primary {
    background-color: #your-custom-color !important;
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

## Changelog

### Latest Updates

#### CSS Class Inheritance
- ✅ Added automatic CSS class inheritance from select element to component
- ✅ Support for Bootstrap background colors (`bg-primary`, `bg-success`, `bg-dark`, etc.)
- ✅ Support for Bootstrap text colors (`text-white`, `text-dark`, etc.)
- ✅ Dynamic class synchronization when classes are added/removed
- ✅ Proper border radius clipping for background colors
- ✅ Works with all Bootstrap utility classes

#### New Language Support
- ✅ Added Polish language support (`ts-select-polish.js`)
- ✅ Added French language support (`ts-select-french.js`)
- ✅ Added Italian language support (`ts-select-italian.js`)
- ✅ Added Spanish language support (`ts-select-spanish.js`)
- ✅ Complete translations for all UI elements and messages

#### Dynamic Options & JSON Support
- ✅ Added `tsAddOption()` method for adding options using JSON objects
- ✅ Added `tsRefresh()` method for refreshing component after option changes
- ✅ Support for HTML content in JSON object options
- ✅ Batch option addition using arrays
- ✅ Automatic component refresh after option modifications

#### Enhanced Synchronization
- ✅ Fixed radio button synchronization in single-select mode
- ✅ Improved checkbox synchronization in multi-select mode
- ✅ Added dropdown open event synchronization
- ✅ Enhanced cross-mode compatibility

#### Placeholder Text Management
- ✅ Simplified placeholder system to use only title attribute for main select
- ✅ Added ts-search-placeholder attribute for search input placeholder
- ✅ Removed placeholder attribute support for cleaner API
- ✅ Enhanced language system to respect both title and ts-search-placeholder attributes
- ✅ Added dynamic placeholder change support with tsRefresh()

#### Performance Improvements
- ✅ Optimized rendering for dynamic option additions
- ✅ Improved memory management
- ✅ Enhanced search performance
- ✅ Better event listener management

### Previous Features
- Single & Multiple Selection
- Grouping with collapsible groups
- Search functionality
- Keyboard navigation
- Resizable dropdown
- HTML content support
- Internationalization
- jQuery integration

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

---

**Made with ❤️ By <a href="https://thronis.com" target="_blank">Thronis</a>**

