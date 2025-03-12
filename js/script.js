/**
CoPilot:
This script performs the following tasks:

1. Defines a function `sortObject` that recursively sorts the keys of an object, ensuring that nested objects are also sorted.
2. Waits for the DOM to fully load using `DOMContentLoaded` event.
3. Fetches a JSON file asynchronously from a path defined by `JSON_FILE_PATH`.
4. Processes the fetched JSON data using the `processJsonData` function.
5. The `processJsonData` function builds a tree view structure in the HTML:
    - Creates category headers and subcategory headers.
    - Displays counts of items in each category and subcategory.
    - Lists items within each subcategory.
    - Adds click events to toggle the visibility of categories and subcategories.

The script essentially reads a JSON file, sorts its contents, and dynamically creates an interactive tree view in the HTML document based on the JSON structure.
*/
function sortObject(obj) {
      // If the value isn't an object or it's null, return it directly
      if (typeof obj !== 'object' || obj === null) {
        return obj;
      }

      // If it's an array, sort each element (if needed),
      // but we generally don't sort arrays themselves in this example
      if (Array.isArray(obj)) {
        return obj.map(sortObject);
      }

      // Now obj should be a plain object;
      // get its keys and sort them
      const sortedKeys = Object.keys(obj).sort();
      const newObj = {};

      // Recurse on each value so nested objects are also sorted
      for (const key of sortedKeys) {
        newObj[key] = sortObject(obj[key]);
      }

      return newObj;
    }
    document.addEventListener('DOMContentLoaded', function() {
      // Assuming you have a JSON file named 'data.json'
      const jsonFilePath = JSON_FILE_PATH; // Must be declared in parent document

      // Read JSON file asynchronously
      fetch(jsonFilePath)
          .then(response => response.json())
          .then(data => {
              // Call a function that processes the data
              processJsonData(sortObject(data));
          })
          .catch(error => {
              console.error('Error loading JSON file:', error);
          });

      function processJsonData(data) {
          // Your function to process the JSON data goes here


        const treeViewContainer = document.getElementById('treeView');

        // Build the tree view structure
        Object.entries(data).forEach(([categoryName, categoryData]) => {
            const categoryElement = document.createElement('div');
            categoryElement.className = 'category';

            // Create main category header
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'category-header main-category';
            categoryHeader.innerHTML = `
                <span>${categoryName} <span class="arrow">›</span></span>
                <span class="count">${categoryData.count}</span>
            `;
            categoryElement.appendChild(categoryHeader);

            // Create main category content container
            const categoryContent = document.createElement('div');
            categoryContent.className = 'category-content';

            // Add subcategories
            Object.entries(categoryData.subcategories).forEach(([subCategoryName, subCategoryData]) => {
                const subCategoryContainer = document.createElement('div');
                subCategoryContainer.className = 'subcategory-container';

                // Create subcategory header
                const subCategoryHeader = document.createElement('div');
                subCategoryHeader.className = 'category-header subcategory';
                subCategoryHeader.innerHTML = `
                    <span>${subCategoryName} <span class="arrow">›</span></span>
                    <span class="count">${subCategoryData.count}</span>
                `;
                subCategoryContainer.appendChild(subCategoryHeader);

                // Create subcategory content
                const subCategoryContent = document.createElement('div');
                subCategoryContent.className = 'category-content';

                // Create list of items
                const itemsList = document.createElement('ul');
                itemsList.className = 'items-list';

                // Add items to the list
                Object.keys(subCategoryData).forEach(key => {
                    if (key !== 'count' && subCategoryData[key]) {
                        const item = document.createElement('li');
                        item.textContent = key;
                        itemsList.appendChild(item);
                    }
                });

                subCategoryContent.appendChild(itemsList);
                subCategoryContainer.appendChild(subCategoryContent);
                categoryContent.appendChild(subCategoryContainer);

                // Add click event to subcategory header
                subCategoryHeader.addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevent event from bubbling up
                    subCategoryContainer.classList.toggle('expanded');
                });
            });

            categoryElement.appendChild(categoryContent);
            treeViewContainer.appendChild(categoryElement);

            // Add click event to main category header
            categoryHeader.addEventListener('click', function() {
                categoryElement.classList.toggle('expanded');
            });
        });

        console.log('Processing data:', data);
    };
    });

