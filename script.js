let textareaBlock;

function createInputField() {
    const inputField = document.createElement("textarea");
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
        ["`", ..."1234567890-=", "backspace"],
        ["tab", ..."qwertyuiop[]", " \\", "del"],
        ["caps", ..."asdfghjkl;'", "enter"],
        ["shift", ..."zxcvbnm,./", "▲", "shift"],
        ["ctrl", "option", "cmd", "space", "cmd", "◄", "▼", "►", "option"],
    ];
    const keyboard = document.createElement("div");

    keyboard.className = "keyboard";

    list.forEach((row) => {
        const getButtonsRow = createKeyboardRow(row);
        keyboard.appendChild(getButtonsRow);
    });

    document.body.appendChild(keyboard);
}

function getCustomKey(key) {
    switch (key) {
        case "Meta":
            return "cmd";
        case "Alt":
            return "option";
        case "CapsLock":
            return "caps";
        case "Control":
            return "ctrl";
        default:
            return "space";
    }
}

function onKeyPress(e) {
    textareaBlock.focus();

    const { key } = e;
    e.preventDefault();
    let keyName = key.toLowerCase();

    if (
        key === "Meta" ||
        key === "Alt" ||
        key === "CapsLock" ||
        key === "Control" ||
        key === " "
    ) {
        keyName = getCustomKey(key);
    }

    const button = document.getElementsByClassName(`btn_${keyName}`);

    if (button.length) {
        button[0].classList.add("active");

        setTimeout(() => {
            button[0].classList.remove("active");
        }, 250);
    }

    if (key.length === 1) setTextArea(key);

    if (key === "backspace") onBackSpace();
}

function onBackSpace() {
    const content = textareaBlock.value;
    textareaBlock.value = content.substring(0, content.length - 1);
}

function setTextArea(text) {
    const content = textareaBlock.value;
    textareaBlock.value = content + text;
}

function onClick(e) {
    e.stopPropagation();
    const { target } = e;
    if (target) {
        const isButton = target.className.includes("btn");

        if (isButton) {
            if (target.innerText === "backspace") {
                onBackSpace();
            } else {
                setTextArea(target.innerText);
            }
        }
    }
}

function initialFunc() {
    createInputField();
    createKeyboard();
    textareaBlock = document.getElementById("field");
    document.body.addEventListener("keyup", onKeyPress);
}

initialFunc();
