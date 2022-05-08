function createInputField() {
    const inputField = document.createElement("textarea");
    inputField.className = "text";
    inputField.setAttribute("rows", 10);
    inputField.setAttribute("cols", 20);
    document.body.appendChild(inputField);
}

function createKeyboardButton(text) {
    const keybtn = document.createElement("button");
    keybtn.innerHTML = text;
    return keybtn;
}

function createKeyboardRow(row) {
    const row_parent = document.createElement("div");
    row.forEach((key) => {
        const getButton = createKeyboardButton(key);
        row_parent.appendChild(getButton);
    });
    return row_parent;
}

function createKeyboard() {
    const list = [
        [..."1234567890-="],
        [..."qwertyuiop[]"],
        [..."asdfghjkl;'"],
        [..."zxcvbnm,./"],
    ];
    const keyboard = document.createElement("div");

    keyboard.className = "keyboard";

    list.forEach((row) => {
        const getButtonsRow = createKeyboardRow(row);
        keyboard.appendChild(getButtonsRow);
    });

    document.body.appendChild(keyboard);
}

function initialFunc() {
    createInputField();
    createKeyboard();
}

initialFunc();
