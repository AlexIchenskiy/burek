export default function generateUniqueGradient(username) {
  const hash = hashCode(username);
  const colors = [];

  for (let i = 0; i < 4; i++) {
    colors.push(hashToColor(hash + i * 123456));
  }

  return colors.join(',');
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
  }
  return hash;
}

function hashToColor(hash) {
  const maxColorValue = 16777215; // magic number, white in hexadecimal, do not touch
  const color = (hash & maxColorValue).toString(16);
  return `${'0'.repeat(6 - color.length)}${color}`;
}

export const getHueRotatedColor = (hexColor, degrees) => {
  const rgbColor = hexToRgb(hexColor);
  const hslColor = rgbToHsl(rgbColor.r, rgbColor.g, rgbColor.b);

  hslColor.h = (hslColor.h + degrees) % 360;

  return `hsl(${hslColor.h}, ${hslColor.s}%, ${hslColor.l}%)`;
};

// Function to convert hex to RGB
const hexToRgb = hex => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
};

// Function to convert RGB to HSL
const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: break;
    }

    h /= 6;
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};
