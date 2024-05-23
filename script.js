const columnContainer = document.querySelector('.column-container');
const addColumnButton = document.getElementById('addColumnButton');

const defaultColor = '#30363d';

// Create HTML content as a string
const eyeDropperIconString = '<svg xmlns="http://www.w3.org/2000/svg" height="23" viewBox="0 0 18 18" width="23"><rect id="Canvas" fill="#ff13dc" opacity="0" width="18" height="18"></rect><path class="fill" d="M11.2285,8.5185,4.116,15.631a1.2355,1.2355,0,0,1-1.7772-1.7168l.0302-.0302L9.4815,6.7715ZM14.864,1.053a1.79554,1.79554,0,0,0-1.273.5275L11.3285,3.843l-.707-.707a.5.5,0,0,0-.707,0L8.2335,4.8165a.5.5,0,0,0,0,.707l.5405.541L1.662,13.177a2.23516,2.23516,0,0,0,3.161,3.161l7.1125-7.112.541.5405a.5.5,0,0,0,.707,0L14.864,8.086a.5.5,0,0,0,.00039-.70711L14.864,7.3785l-.707-.707L16.4195,4.409a1.8,1.8,0,0,0,.00042-2.54558L16.4195,1.863l-.2825-.2825A1.796,1.796,0,0,0,14.864,1.053Z"></path></svg>';

function createColumn(color) {
  // Create a new column element
  const newColumn = document.createElement('div');
  newColumn.classList.add('column');
  newColumn.style.backgroundColor = color || defaultColor; // Set default white or provided color

  // Create delete button for the column
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete-button');
  newColumn.appendChild(deleteButton);

  // Create color picker for the column
  const colorPicker = document.createElement('input');
  colorPicker.type = 'color';
  colorPicker.value = defaultColor;
  colorPicker.classList.add('color-picker');
  newColumn.appendChild(colorPicker);

  const colorValue = document.createElement('span');
  colorValue.classList.add('color-value');
  colorValue.textContent = defaultColor;
  newColumn.appendChild(colorValue);

  // Create eye dropper button for the column
  const eyeDropperBtn = document.createElement('div');
  eyeDropperBtn.classList.add('eye-dropper');
  newColumn.appendChild(eyeDropperBtn);

  // Parse the HTML string into a DOM element
  const newEyeDropperIcon = new DOMParser().parseFromString(eyeDropperIconString, 'text/html').querySelector('svg');
  eyeDropperBtn.appendChild(newEyeDropperIcon);

  eyeDropperBtn.addEventListener('click', async () => {
    if (!window.EyeDropper) {
      colorDisplay.textContent = 'EyeDropper API not supported.';
      return;
    }

    try {
      const eyeDropper = new window.EyeDropper();
      const color = await eyeDropper.open();
      colorDisplay.style.backgroundColor = color.sRGBHex;
      colorDisplay.textContent = `Picked Color: ${color.sRGBHex}`;
    } catch (err) {
      console.error('Error using EyeDropper:', err);
      colorDisplay.textContent = 'Failed to pick color.';
    }
  });

  // Add event listener to update column background color on input change
  colorPicker.addEventListener('input', (event) => {
    // newColumn.style.backgroundColor = event.target.value;
    console.log("Color value:", event.target.value);
    colorValue.textContent = event.target.value;
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
