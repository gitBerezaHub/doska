export function getRandomColor() {
  const hue = Math.floor(Math.random() * 360); // Оттенок (0–360)
  const pastel = Math.random() * 30 + 30; // Яркость (чтобы цвет был мягким)

  const rgb = hslToRgb(hue, 80, pastel); // Преобразуем HSL в RGB
  return rgbToHex(rgb[0], rgb[1], rgb[2]); // Преобразуем в HEX
}

// Функция для перевода HSL → RGB
function hslToRgb(h, s, l) {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [
    Math.round(f(0) * 255),
    Math.round(f(8) * 255),
    Math.round(f(4) * 255),
  ];
}

// Функция для перевода RGB → HEX
function rgbToHex(r, g, b) {
  return [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

console.log(getRandomColor()); // Например, "a1c8ff"
