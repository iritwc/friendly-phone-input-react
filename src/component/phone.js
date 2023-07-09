const ALLOWED_KEYS = ["Shift", "Home", "End", "Backspace", "Tab", "Enter", "Delete", 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
const ALLOWED_CODES = ["KeyA", "KeyV", "KeyC", "KeyX", "KeyZ"];

// Allowed - numeric codes
const isNumeric = (key) => (/^[0-9]$/).test(key);

// Allowed - some other codes
const isAllowedCode = (event) => {
  const { key, code } = event;

  return ALLOWED_KEYS.some(k => k === key) ||
    (
      (event.ctrlKey || event.metaKey) && ALLOWED_CODES.some(k => k === code)
    );
};

export const formatPhone = (value) => {
  const digits = (value.match(/\d+/g)||[]).join('');
  const size = digits.length;
  const areaCode = digits.slice(0, 3);
  const prefix = digits.slice(3, 6);
  const local = digits.slice(6, 10);

  let format = "";
  if (size > 6) {
    format = `(${areaCode}) ${prefix}-${local}`;
  } else {
    if (size > 3) {
      format = `(${areaCode}) ${prefix}`
    } else {
      format = areaCode;
    }
  }
  return format;
};

export const repositionStart = (input, format, start) => {

  if (start<=1 && format.length > 3) return 1;

  const noDigits = (input.slice(0, start).match(/\D/g) || []).length;
  const numPosition = start - noDigits;
  let count = 0;
  let i;

  for (i=0; i<format.length && count<numPosition; i++) {
    if (isNumeric(format[i])) {
      count++;
    }
  }
  return i;
};

export const ignoreNotAllowedKeys = (event) => {
  const { key } = event;

  // Ignore all keydown events that are part of composition
  if (event.isComposing || event.keyCode === 229) {
    return;
  }

  // Allowed - length limit
  const allowedLength = event.target.value.length < 14;

  if (!isAllowedCode(event) && (!isNumeric(key) || !allowedLength)) {
    event.preventDefault();
  }
};
