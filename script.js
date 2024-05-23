const columnContainer = document.querySelector('.column-container');
const addColumnButton = document.getElementById('addColumnButton');

function createColumn(color) {
  // Create a new column element
  const newColumn = document.createElement('div');
  newColumn.classList.add('column');
  newColumn.style.backgroundColor = color || 'white'; // Set default white or provided color

  // Create color picker for the column
  const colorPicker = document.createElement('input');
  colorPicker.type = 'color';
  colorPicker.classList.add('color-picker');
  newColumn.appendChild(colorPicker);

  // Create delete button for the column
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete-button');
  newColumn.appendChild(deleteButton);

  // Add event listener to update column background color on input change
  colorPicker.addEventListener('input', (event) => {
    newColumn.style.backgroundColor = event.target.value;
  });

  // Add event listener to delete the column
  deleteButton.addEventListener('click', () => {
    columnContainer.removeChild(newColumn);
  });

  return newColumn;
}

// Add a default column on page load
columnContainer.appendChild(createColumn());

// Add event listener to add a new column
addColumnButton.addEventListener('click', () => {
  columnContainer.appendChild(createColumn());
});
