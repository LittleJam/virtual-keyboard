let isCapsLock = false;
let locale;
let textareaBlock;

const listEn = [
  ['`', ...'1234567890-=', 'backspace'],
  ['tab', ...'qwertyuiop[]', '\\', 'del'],
  ['caps', ..."asdfghjkl;'", 'enter'],
  ['shift', ...'zxcvbnm,./', '▲', 'shift'],
  ['ctrl', 'option', 'cmd', 'space', 'cmd', '◄', '▼', '►', 'option'],
];

const listRu = [
  ['`', ...'1234567890-=', 'backspace'],
  ['tab', ...'йцукенгшщзхъ', ' \\', 'del'],
  ['caps', ...'фывапролджэ', 'enter'],
  ['shift', ...'ячсмитбю,.', '▲', 'shift'],
  ['ctrl', 'option', 'cmd', 'space', 'cmd', '◄', '▼', '►', 'option'],
];

function createInputField() {
  const inputField = document.createElement('textarea');
  inputField.id = 'field';
  inputField.className = 'text';
  inputField.setAttribute('rows', 10);
  inputField.setAttribute('cols', 20);
  document.body.appendChild(inputField);
}

function createKeyboardButton(text) {
  const keybtn = document.createElement('button');
  keybtn.className = `btn btn_${text}`;
  keybtn.innerHTML = text;
  return keybtn;
}

function onSpace() {
  const text = textareaBlock.value;
  const position = textareaBlock.selectionStart;
  const start = text.slice(0, position);
  const end = text.slice(position);
  textareaBlock.value = `${start} ${end}`;
  textareaBlock.focus();
}

function onTab() {
  const text = textareaBlock.value;
  const position = textareaBlock.selectionStart;
  const start = text.slice(0, position);
  const end = text.slice(position);
  textareaBlock.value = `${start}  ${end}`;
  textareaBlock.focus();
}

function onEnterButton() {
  const text = textareaBlock.value;
  const position = textareaBlock.selectionStart;
  const start = text.slice(0, position);
  const end = text.slice(position);
  textareaBlock.value = `${start}\n${end}`;
  textareaBlock.focus();
}

function getCustomKey(key) {
  const caps = document.getElementsByClassName('btn_caps');
  switch (key) {
    case 'Meta':
      return 'cmd';
    case 'Alt':
      return 'option';
    case 'CapsLock':
      isCapsLock = !isCapsLock;
      caps[0].classList.toggle('active');
      return 'caps';
    case 'caps':
      isCapsLock = !isCapsLock;
      caps[0].classList.toggle('active');
      return 'caps';
    case 'Control':
      return 'ctrl';
    case 'Enter':
      onEnterButton();
      return 'enter';
    case 'enter':
      onEnterButton();
      return 'enter';
    case 'Tab':
      onTab();
      return 'tab';
    case 'tab':
      onTab();
      return 'tab';
    case 'space':
      onSpace();
      return 'tab';
    case 'ArrowLeft':
      return '◄';
    case 'ArrowRight':
      return '►';
    case 'ArrowDown':
      return '▼';
    case 'ArrowUp':
      return '▲';
    default:
      return 'space';
  }
}

function checkCustomButton(key, event) {
  if (
    key === 'Meta'
    || key === 'Alt'
    || key === 'caps'
    || key === 'CapsLock'
    || key === 'Control'
    || key === 'Tab'
    || key === 'tab'
    || key === 'enter'
    || key === 'Enter'
    || key === 'ArrowUp'
    || key === 'ArrowDown'
    || key === 'ArrowLeft'
    || key === 'ArrowRight'
    || key === 'space'
    || key === ' '
  ) {
    return getCustomKey(key);
  }

  if (event && !event.metaKey && key !== 'Backspace' && key !== 'Enter') {
    event.preventDefault();
  }
  return event && event.shiftKey ? key : key.toLowerCase();
}

function setTextArea(text) {
  const content = textareaBlock.value;

  if (locale === 'ru') {
    const arrIndex = listEn.findIndex((el) => el.includes(text));
    if (arrIndex !== -1) {
      const index = listEn[arrIndex].findIndex((el) => el === text);
      textareaBlock.value = content + listRu[arrIndex][index];
      return;
    }
  }

  textareaBlock.value = content + text;
}

function onBackSpace() {
  const content = textareaBlock.value;
  textareaBlock.value = content.substring(0, content.length - 1);
}

function onClick(e) {
  e.stopPropagation();
  const { target } = e;
  if (target) {
    const isButton = target.className.includes('btn');
    if (isButton) {
      const key = checkCustomButton(target.innerText);
      if (target.innerText === 'backspace') {
        onBackSpace();
      } else if (key.length === 1) {
        setTextArea(isCapsLock ? key.toUpperCase() : key);
      }
    }
  }
}

function createKeyboardRow(row) {
  const rowParent = document.createElement('div');
  rowParent.addEventListener('click', onClick);
  row.forEach((key) => {
    const getButton = createKeyboardButton(key);
    rowParent.appendChild(getButton);
  });
  return rowParent;
}

function createKeyboard(list) {
  const findKeyBoard = document.getElementsByClassName('keyboard');
  if (findKeyBoard.length) findKeyBoard[0].remove();
  const keyboard = document.createElement('div');

  keyboard.className = 'keyboard';

  list.forEach((row) => {
    const getButtonsRow = createKeyboardRow(row);
    keyboard.appendChild(getButtonsRow);
  });

  document.body.appendChild(keyboard);
}

function setLocale(lang) {
  localStorage.setItem('locale', lang);
  createKeyboard(lang === 'en' ? listEn : listRu);
}

function onKeyPress(event) {
  textareaBlock.focus();

  if (event.ctrlKey && event.altKey) {
    setLocale(locale === 'en' ? 'ru' : 'en');
    locale = locale === 'en' ? 'ru' : 'en';
    return;
  }

  const keyName = checkCustomButton(event.key, event);

  const button = document.getElementsByClassName(`btn_${keyName}`);

  if (button.length && keyName !== 'caps') {
    button[0].classList.add('active');

    setTimeout(() => {
      button[0].classList.remove('active');
    }, 250);
  }

  if (keyName.length === 1) {
    setTextArea(isCapsLock ? keyName.toUpperCase() : keyName);
  }
}

function initialFunc() {
  const currentLocale = localStorage.getItem('locale');
  const text = document.createElement('h3');
  text.innerText = 'клавиатура создана воперационной системе MacOS';
  document.body.appendChild(text);

  const subtitle = document.createElement('h3');
  subtitle.innerText = 'комбинация для переключения языка: левые ctrl + option';
  document.body.appendChild(subtitle);

  createInputField();
  setLocale(currentLocale || 'en');
  locale = currentLocale || 'en';
  textareaBlock = document.getElementById('field');
  document.body.addEventListener('keydown', onKeyPress);
}
initialFunc();
