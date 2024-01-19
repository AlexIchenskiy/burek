export const validateLastname = (lastname) => {
  if (lastname.length < 2) {
    return "Prezime mora biti dulje od 2 znaka!";
  }

  if (lastname.length > 60) {
    return "Prezime mora biti kraće od 60 znakova!"
  }

  const pattern = /^[a-zA-Z- ČĆŠĐŽčćšđž]+$/;

  if (!pattern.test(lastname)) {
    return "Prezime može sadržavati samo slova, crte (\"-\") i praznine (\" \")!";
  }
}