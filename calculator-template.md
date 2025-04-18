# Reusable Template for Coordinate Calculators

Here's a standardized template you can reuse for similar coordinate calculator applications. The template includes a clean layout with input sections, visualization tables, and reset functionality.

## HTML Template (`calculator-template.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Coordinate Calculator Template</title>
    <link rel="stylesheet" href="calculator-style.css">
</head>
<body>
    <div class="calculator-container">
        <h1 class="calculator-title">Coordinate Calculator</h1>

        <div class="input-section">
            <div class="input-group" id="group-primary">
                <label class="input-label">Primary:</label>
                <input type="number" class="coord-input" id="primary-row" placeholder="row" value="0" min="0" max="4">
                <input type="number" class="coord-input" id="primary-col" placeholder="column" value="0" min="0" max="4">
            </div>

            <div class="input-group" id="group-secondary">
                <label class="input-label">Secondary:</label>
                <input type="number" class="coord-input" id="secondary-row" placeholder="row" readonly>
                <input type="number" class="coord-input" id="secondary-col" placeholder="column" readonly>
            </div>

            <div class="button-container">
                <button id="reset-btn" class="reset-button">Reset</button>
            </div>
        </div>

        <div class="visualization-section">
            <div class="table-container">
                <div class="table-label">Primary Table</div>
                <table id="table-primary" class="coord-table">
                    <!-- Generated by JavaScript -->
                </table>
            </div>
            <div class="table-container">
                <div class="table-label">Secondary Table</div>
                <table id="table-secondary" class="coord-table">
                    <!-- Generated by JavaScript -->
                </table>
            </div>
        </div>
    </div>

    <script src="calculator-script.js"></script>
</body>
</html>
```

## CSS Stylesheet (`calculator-style.css`)

```css
/* Base Styles */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f5f5f5;
    margin: 0;
    padding: 20px;
    color: #333;
}

/* Calculator Container */
.calculator-container {
    max-width: 800px;
    margin: 0 auto;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 25px;
}

.calculator-title {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 25px;
    font-size: 28px;
}

/* Input Section */
.input-section {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 6px;
    margin-bottom: 25px;
}

.input-group {
    margin-bottom: 15px;
}

.input-label {
    display: inline-block;
    width: 80px;
    font-weight: 600;
    color: #2c3e50;
}

.coord-input {
    padding: 8px 12px;
    width: 70px;
    margin-right: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

.coord-input:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

/* Button Styles */
.button-container {
    text-align: center;
    margin-top: 20px;
}

.reset-button {
    padding: 10px 20px;
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.2s;
}

.reset-button:hover {
    background-color: #c0392b;
}

/* Visualization Section */
.visualization-section {
    display: flex;
    justify-content: space-between;
    gap: 20px;
}

.table-container {
    flex: 1;
}

.table-label {
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    color: #2c3e50;
    font-size: 18px;
}

.coord-table {
    border-collapse: collapse;
    width: 100%;
    margin: 0 auto;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.coord-table th, .coord-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
    min-width: 40px;
    height: 40px;
}

.coord-table td {
    background-color: white;
    transition: background-color 0.3s;
}

/* Highlight Styles */
.highlight-primary {
    background-color: #ffdddd !important;
    font-weight: bold;
}

.highlight-secondary {
    background-color: #ddffdd !important;
    font-weight: bold;
}

/* Responsive Design */
@media (max-width: 768px) {
    .visualization-section {
        flex-direction: column;
    }

    .calculator-container {
        padding: 15px;
    }
}
```

## JavaScript Module (`calculator-script.js`)

```javascript
// Configuration
const CONFIG = {
    tableSize: 5,  // Size of the tables (5x5)
    defaultRow: 0, // Default row value
    defaultCol: 0  // Default column value
};

// DOM Elements
const elements = {
    primaryRowInput: document.getElementById('primary-row'),
    primaryColInput: document.getElementById('primary-col'),
    secondaryRowInput: document.getElementById('secondary-row'),
    secondaryColInput: document.getElementById('secondary-col'),
    tablePrimary: document.getElementById('table-primary'),
    tableSecondary: document.getElementById('table-secondary'),
    resetBtn: document.getElementById('reset-btn')
};

// Initialize the calculator
function initCalculator() {
    createTables();
    setupEventListeners();
    updateAll();
}

// Create the visualization tables
function createTables() {
    createTable(elements.tablePrimary, CONFIG.tableSize);
    createTable(elements.tableSecondary, CONFIG.tableSize);
}

// Create a single table
function createTable(tableElement, size) {
    tableElement.innerHTML = '';
    for (let row = 0; row < size; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < size; col++) {
            const td = document.createElement('td');
            td.dataset.row = row;
            td.dataset.col = col;
            td.textContent = `${row},${col}`;
            tr.appendChild(td);
        }
        tableElement.appendChild(tr);
    }
}

// Highlight a cell in a table
function highlightCell(tableElement, row, col, highlightClass) {
    // Remove all highlights first
    const cells = tableElement.querySelectorAll('td');
    cells.forEach(cell => {
        cell.classList.remove('highlight-primary', 'highlight-secondary');
    });

    // Highlight the specific cell if coordinates are valid
    if (row >= 0 && row < CONFIG.tableSize && col >= 0 && col < CONFIG.tableSize) {
        const cell = tableElement.querySelector(`td[data-row="${row}"][data-col="${col}"]`);
        if (cell) {
            cell.classList.add(highlightClass);
        }
    }
}

// Calculate secondary coordinates (override this for different calculations)
function calculateSecondaryCoords(primaryRow, primaryCol) {
    // Default calculation: [secondary.row, secondary.col] = [primary.col, 4 * -primary.row]
    return {
        row: primaryCol,
        col: CONFIG.tableSize - primaryRow // Original file had an asterisk before the minus sign which resulted in wrong calculations
    };
}

// Update all calculations and visualizations
function updateAll() {
    const primaryRow = parseInt(elements.primaryRowInput.value) || CONFIG.defaultRow;
    const primaryCol = parseInt(elements.primaryColInput.value) || CONFIG.defaultCol;

    // Calculate secondary values
    const secondaryCoords = calculateSecondaryCoords(primaryRow, primaryCol);

    // Update secondary inputs
    elements.secondaryRowInput.value = secondaryCoords.row;
    elements.secondaryColInput.value = secondaryCoords.col;

    // Highlight cells
    highlightCell(elements.tablePrimary, primaryRow, primaryCol, 'highlight-primary');
    highlightCell(elements.tableSecondary, secondaryCoords.row, secondaryCoords.col, 'highlight-secondary');
}

// Reset the calculator to default state
function resetCalculator() {
    elements.primaryRowInput.value = CONFIG.defaultRow;
    elements.primaryColInput.value = CONFIG.defaultCol;
    updateAll();
}

// Set up event listeners
function setupEventListeners() {
    elements.primaryRowInput.addEventListener('input', updateAll);
    elements.primaryColInput.addEventListener('input', updateAll);
    elements.resetBtn.addEventListener('click', resetCalculator);
}

// Initialize the calculator when the page loads
document.addEventListener('DOMContentLoaded', initCalculator);
```

## How to Use This Template

1. **Basic Usage**:
   - Save the three files (`calculator-template.html`, `calculator-style.css`, `calculator-script.js`) in the same directory
   - Open the HTML file in a browser

2. **Customizing Calculations**:
   - Modify the `calculateSecondaryCoords()` function in the JavaScript file to implement your specific coordinate transformation
   - Example alternative calculation:
     ```javascript
     function calculateSecondaryCoords(primaryRow, primaryCol) {
         return {
             row: primaryRow * 2,
             col: primaryCol + 3
         };
     }
     ```

3. **Styling Customization**:
   - Change color schemes in the CSS file
   - Adjust table sizes by modifying the `CONFIG.tableSize` value
   - Update highlight colors by modifying the `.highlight-primary` and `.highlight-secondary` classes

4. **Extending Functionality**:
   - Add more input groups by duplicating the `input-group` div structure
   - Add additional tables by following the same pattern
   - Implement more complex visualizations by extending the JavaScript

This template provides a clean, responsive design with clear separation of concerns between HTML structure, CSS styling, and JavaScript functionality. The modular approach makes it easy to adapt for different coordinate calculation scenarios.
