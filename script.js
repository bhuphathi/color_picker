const columnContainer = document.querySelector('.column-container');
const addColumnButton = document.getElementById('addColumnButton');
const darkLightTheme = document.getElementById('darkLight');

const defaultColor = '#30363d';
const tradingViewRed = '#f23645';

darkLightTheme.addEventListener("click", () => {
  if (document.body.style.backgroundColor == "rgb(13, 17, 23)") {
    document.body.style.backgroundColor = "#ccc";
  } else {
    document.body.style.backgroundColor = "rgb(13, 17, 23)";

  };
});

// Create HTML content as a string
const eyeDropperIconString = '<svg xmlns="http://www.w3.org/2000/svg" height="23" viewBox="0 0 18 18" width="23"><rect id="Canvas" opacity="0" width="18" height="18"></rect><path class="fill" d="M11.2285,8.5185,4.116,15.631a1.2355,1.2355,0,0,1-1.7772-1.7168l.0302-.0302L9.4815,6.7715ZM14.864,1.053a1.79554,1.79554,0,0,0-1.273.5275L11.3285,3.843l-.707-.707a.5.5,0,0,0-.707,0L8.2335,4.8165a.5.5,0,0,0,0,.707l.5405.541L1.662,13.177a2.23516,2.23516,0,0,0,3.161,3.161l7.1125-7.112.541.5405a.5.5,0,0,0,.707,0L14.864,8.086a.5.5,0,0,0,.00039-.70711L14.864,7.3785l-.707-.707L16.4195,4.409a1.8,1.8,0,0,0,.00042-2.54558L16.4195,1.863l-.2825-.2825A1.796,1.796,0,0,0,14.864,1.053Z"></path></svg>';

function createColumn(color) {
  const errorDisplay = document.getElementById('error');

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
  colorPicker.classList.add('color-picker');
  newColumn.appendChild(colorPicker);

  //create color value text
  const colorValueElement = document.createElement('span');
  colorValueElement.classList.add('color-value');
  newColumn.appendChild(colorValueElement);

  // Create eye dropper button for the column
  const eyeDropperBtn = document.createElement('div');
  eyeDropperBtn.classList.add('eye-dropper');
  newColumn.appendChild(eyeDropperBtn);

  // Parse the HTML string into a DOM element
  const newEyeDropperIcon = new DOMParser().parseFromString(eyeDropperIconString, 'text/html').querySelector('svg');
  eyeDropperBtn.appendChild(newEyeDropperIcon);

  setColumnColor(newColumn, colorValueElement, colorPicker, getRandomColor())

  //eye dropper eventlistener
  eyeDropperBtn.addEventListener('click', async () => {
    if (!window.EyeDropper) {
      errorDisplay.textContent = 'EyeDropper API not supported.';
      return;
    }

    try {
      const eyeDropper = new window.EyeDropper();
      const color = await eyeDropper.open();
      const hexValue = rgbaToHex(color.sRGBHex);
      const backgroundColorStyle = `background-color: ${hexValue} !important`;
      setColumnColor(newColumn, colorValueElement, colorPicker, hexValue);
      // colorValue.textContent = hexValue;
      // newColumn.style.cssText = backgroundColorStyle;
      console.log(hexValue);

    } catch (err) {
      console.error('Error using EyeDropper:', err);
      errorDisplay.textContent = 'Failed to pick color.';
    }
  });

  // Add event listener to update column background color on input change
  colorPicker.addEventListener('input', (event) => {
    console.log("Color value:", event.target.value);
    setColumnColor(newColumn, colorValueElement, colorPicker, event.target.value)

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

function setColumnColor(columnElement, colorValueElement, colorPicker, colorValue) {
  columnElement.setAttribute('style', `background-color: ${colorValue};`);
  colorValueElement.textContent = colorValue;
  colorPicker.value = colorValue;
}

function rgbaToHex(rgbaString) {
  const rgbValues = rgbaString.match(/(\d+),\s*(\d+),\s*(\d+)/);
  let result = rgbListToHex(rgbValues)
  console.log("rgbValues", rgbValues);
  console.log("detectedHex", result);
  //to fix error in browser color picker
  let redValue = rgbValues[1] <= 251 ? parseInt(rgbValues[1]) + 1 : rgbValues[1];
  let greenValue = rgbValues[2] <= 251 ? parseInt(rgbValues[2]) : rgbValues[2];
  let blueValue = rgbValues[3] <= 251 ? parseInt(rgbValues[3]) : rgbValues[3];
  result = rgbListToHex(["", redValue, greenValue, blueValue])
  console.log("setHex", result);

  return result;
}

function rgbListToHex(rgbStringList) {
  const red = parseInt(rgbStringList[1], 10).toString(16).padStart(2, '0');
  const green = parseInt(rgbStringList[2], 10).toString(16).padStart(2, '0');
  const blue = parseInt(rgbStringList[3], 10).toString(16).padStart(2, '0');
  return `#${red}${green}${blue}`;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}