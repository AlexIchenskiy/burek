export const validateComment = (comment) => {
  if (comment.length < 3) {
    return "Komentar mora imati najmanje 3 znaka!";
  }

  if (comment.length > 5000) {
    return "Komentar mora biti kraći od 100 znakova!";
  }
}