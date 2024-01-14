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
