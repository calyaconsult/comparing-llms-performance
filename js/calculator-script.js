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
        col: CONFIG.tableSize - 1 - primaryRow
    };

    /* Calculate transposed matrix coordinates
    return {
        row: primaryCol,
        col: primaryRow
    };
    */
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
