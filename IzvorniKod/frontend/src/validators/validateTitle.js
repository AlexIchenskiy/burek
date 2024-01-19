export const validateTitle = (title) => {
  if (title.length < 3) {
    return "Naziv članka mora imati najmanje 3 znaka!";
  }

  if (title.length > 60) {
    return "Naziv članka mora biti kraći od 100 znakova!";
  }
}