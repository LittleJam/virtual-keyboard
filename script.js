let textareaBlock;

function createInputField() {
    const inputField = document.createElement("textarea");
    inputField.addEventListener("keypress", onKeyPress);
    inputField.id = "field";
    inputField.className = "text";
    inputField.setAttribute("rows", 10);
    inputField.setAttribute("cols", 20);
    document.body.appendChild(inputField);
}

function createKeyboardButton(text) {
    const keybtn = document.createElement("button");
    keybtn.className = `btn btn_${text}`;
    keybtn.innerHTML = text;
    return keybtn;
}

function createKeyboardRow(row) {
    const row_parent = document.createElement("div");
    row_parent.addEventListener("click", onClick);
    row.forEach((key) => {
        const getButton = createKeyboardButton(key);
        row_parent.appendChild(getButton);
    });
    return row_parent;
}

function createKeyboard() {
    const list = [
        ["`", ..."1234567890-="],
        ["tab", ..."qwertyuiop[]"],
        ["caps", ..."asdfghjkl;'", "enter"],
        ["shift", ..."zxcvbnm,./", "shift"],
    ];
    const keyboard = document.createElement("div");

    keyboard.className = "keyboard";

    list.forEach((row) => {
        const getButtonsRow = createKeyboardRow(row);
        keyboard.appendChild(getButtonsRow);
    });

    document.body.appendChild(keyboard);
}

function onKeyPress(e) {
    const { key } = e;
    console.log(key);
    const button = document.getElementsByClassName(`btn_${key}`);

    if (button.length) {
        button[0].classList.add("active");

        setTimeout(() => {
            button[0].classList.remove("active");
        }, 250);
    }
}

function onClick(e) {
    e.stopPropagation();
    const { target } = e;
    console.log(target);
    if (target) {
        const isButton = target.className.includes("btn");
        const content = textareaBlock.innerHTML;
        if (isButton) {
            textareaBlock.innerHTML = content + target.innerHTML;
        }
    }
}

function initialFunc() {
    createInputField();
    createKeyboard();
    textareaBlock = document.getElementById("field");
}

initialFunc();
