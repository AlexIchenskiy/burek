export const validateContent = (content) => {
  if (content.length > 65000) {
    return "Članak mora biti kraći od 65000 znakova!";
  }
}