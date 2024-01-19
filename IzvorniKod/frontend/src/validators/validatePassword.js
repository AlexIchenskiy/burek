export const validatePassword = (password) => {
  if (password.length < 7) {
    return "Lozinka mora imati najmanje 7 znakova!";
  }

  if (password.length > 60) {
    return "Lozinka mora biti kraća od 60 znakova!";
  }

  const pattern = /^(?=.*[a-zA-Z])(?=.*\d).+$/;

  if (!pattern.test(password)) {
    return "Lozinka mora sadržavati barem jednu znamenku i barem jedno slovo!";
  }
}