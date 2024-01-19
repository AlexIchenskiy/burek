import { VALID_DOMAINS } from "../assets/constants"

export const validateEmail = (email) => {
  let email_data = email.split("@");
  let domain = email_data[1];

  if (!VALID_DOMAINS.includes(domain)) {
    return "Molimo vas da koristite svoj sveučilišni email!"
  }

  const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;

  if (!pattern.test(email)) {
    return "Email mora biti oblika prefiks@domena.hr i ne smije sadržavati specijalne znakove osim točke (\".\") i crte (\"-\")!";
  }
}