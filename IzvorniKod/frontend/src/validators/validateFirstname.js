export const validateFirstname = (firstname) => {
  if (firstname.length < 2) {
    return "Ime mora biti dulje od 2 znaka!";
  }

  if (firstname.length > 60) {
    return "Ime mora biti kraće od 60 znakova!"
  }

  const pattern = /^[a-zA-Z- ČĆŠĐŽčćšđž]+$/;

  if (!pattern.test(firstname)) {
    return "Ime može sadržavati samo slova, crte (\"-\") i praznine (\" \")!";
  }
}