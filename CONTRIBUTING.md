# Contribution Guidelines

Za brži, lakši i bezbolniji doprinos projektu, molim vas da slijedite ove smjernice.

## 1. Grananje (Branching)

U našem projektu koristimo tri glavna brancha:

- `master`: Ovo je glavni branch koji sadrži stabilnu verziju projekta za deployment i release-ove.
- `dev`: Razvojni branch gdje se nalazi najnovija verzija aplikacije.
- `devdoc`: Branch za dokumentaciju.

Kako biste započeli rad na novoj korisničkoj priči (User Story), stvorite novi branch s nazivom u sljedećem formatu: `TIP-BROJ-Kratki-opis`, gdje:
- `TIP` je vrsta priče (npr. BEUS ili FEUS).
- `PRIČA` je broj korisničke priče.
- `Kratki-opis` je kratak opis korisničke priče.

npr. `BEUS-1-Add-login`

## 2. Commitovi

**VAŽNO**: Ako radite grupno, prije svake promjene dohvatite zadnju verziju koda (`git pull`) kako bi izbjegli konflikte.

Koristimo commit poruke prema [konvencijama](https://www.conventionalcommits.org/en/v1.0.0/). Nakon unesenih promjena u kod trebate ih dodati u staging (`git add`), commit-ati (`git commit -m "poruka"`) te push-ati u vaš branch.

Naprimjer, `git add *`, `git commit -m "feat: add login endpoint"` te `git push origin BEUS-1-Add-login`.

Detaljnije o git-u i svim naredbama možete pročitati [ovdje](https://www.freecodecamp.org/news/learn-the-basics-of-git-in-under-10-minutes-da548267cc91/).

## 3. Pull Requests

Kada završite rad na svojom branch-u i spremni ste za integraciju u `dev`, slijedite ove korake:

1. Stvorite pull request sa svojeg branch-a u `dev`.
2. Naziv pull request-a mora biti isti kao naslov User Story-ja. Na primjer: "BEUS 1: Kao anonimni korisnik, želim se prijaviti u aplikaciju".
3. U opisu pull request-a ne morate ništa pisati, ali možete ostaviti dodatne komentare za svoje kolege.
4. Dodajte sebe (i po potrebi osobu s kojom surađujete) kao `assignee` pull request-a te [mene](https://github.com/AlexIchenskiy) (i druge koji su relevantni) kao `reviewer`-e.
5. Nema obaveznih oznaka (labels).

## 4. Recenzija i Testiranje

Nakon što stvorite pull request, imate opciju čekati da ga netko recenzira i testira ili ga sami možete merge-ati ako ste sigurni u svoj kod. Međutim, preporučujem da čekate na recenziju i testiranje od strane drugih članova tima kako biste osigurali kvalitetu koda.

Hvala što ste doprinijeli našem projektu!

Ako imate bilo kakvih pitanja ili trebate pomoć, slobodno se obratite [meni](https://github.com/AlexIchenskiy).
