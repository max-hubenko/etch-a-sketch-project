const container = document.getElementById("JSContainer");
const button = document.getElementById("clear-button");
const changeButton = document.getElementById("change-button");
const colorBoxes = document.querySelectorAll(".colorbox")
let squares = 16;
let oldColor = "white";
let clicked = false;
let currentColor = "black";

let colorMap = {
    red: 'red',
    orange: 'orange',
    yellow: 'yellow',
    blue: 'blue',
    green: 'green',
    indigo: 'indigo',
    violet: 'violet',
    white: 'white',
    black: 'black',
};

for (let i = 0; i < colorBoxes.length; i++) {
    colorBoxes[i].addEventListener("click", function() {
        if (this.classList.contains('colorbox')) {
            const colorId = this.id;

            // Set the currentColor based on the color ID
            currentColor = colorMap[colorId];
            console.log("Current Color " + currentColor);
        }
    });
}


function createGrid(rows, cols) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const gridItem = document.createElement('div');
            gridItem.className = "grid-item";
            container.appendChild(gridItem);

            gridItem.addEventListener("mouseover", function() {
                if (clicked) {
                    this.style.backgroundColor = currentColor;
                } else if (this.style.backgroundColor != currentColor) {
                    oldColor = this.style.backgroundColor;
                    this.style.backgroundColor = "gray";
                }
            });

            gridItem.addEventListener("mouseleave", function() {
                    if (this.style.backgroundColor == "gray") {
                        if (oldColor != undefined) {
                            this.style.backgroundColor = oldColor;
                        } else {
                            this.style.backgroundColor = 'white';
                        }
                    }
            });

            gridItem.addEventListener("mousedown", function() {
                this.style.backgroundColor = currentColor;
                clicked = true;
            });

            gridItem.addEventListener("mouseup", function() {
                clicked = false;
            });
        }
    }
}

createGrid(squares, squares);


function clearGrid() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}
button.addEventListener("click", function() {
    clearGrid();
    createGrid(squares,squares)
    updateGridItemStyle(squares);
});

function updateGridItemStyle(squares) {
    const gridItems = document.querySelectorAll('.grid-item');

    // Update the flex property for each grid item
    gridItems.forEach(item => {
        item.style.flex = `1 0 ${100 / squares}%`;
    });
}

changeButton.addEventListener("click", function() {
    squares = prompt("Enter the amount of squares per side EX: 10 for 10x10 grid.");
    const userInputAsNumber = parseInt(squares);
    if (!isNaN(userInputAsNumber) && userInputAsNumber >= 1 && userInputAsNumber <= 100) {
        squares = userInputAsNumber;
    } else {
        squares = 16
        alert("Invalid input. Must be an integer value");
    }
    clearGrid();
    createGrid(squares,squares)
    updateGridItemStyle(squares);

})