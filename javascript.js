const url = "https://tema07-0903.restdb.io/rest/oste";
const options = {
  headers: {
    "x-apikey": "620f92ae34fd6215658587d4",
  },
};
const main = document.querySelector("section ");
const template = document.querySelector("main template").content;
const popup = document.querySelector("#popup");

let oste;
let filter = "alle";

document.addEventListener("DOMContentLoaded", start);
function start() {
  const filterKnapper = document.querySelectorAll("section nav button");
  filterKnapper.forEach((knap) => {
    knap.classList.add(knap.dataset.type);
    knap.addEventListener("click", filtrerOste);
  });

  hentdata();
}

async function hentdata() {
  const resultat = await fetch(url, options);
  oste = await resultat.json();
  visOste();
}

function filtrerOste() {
  filter = this.dataset.type;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
  visOste();
}

function visOste() {
  main.textContent = "";
  oste.forEach((ost) => {
    if (filter == ost.type || filter == "alle") {
      let klon = template.cloneNode(true);
      klon.querySelector(".navn").textContent = ost.navn;
      klon.querySelector(".type").textContent = ost.type;
      klon.querySelector(".land").textContent = "Land: " + ost.land;
      klon.querySelector("img").src = "billeder/" + ost.billednavn + ".jpg";
      klon
        .querySelector("article")
        .addEventListener("click", () => visDetaljer(ost));
      main.appendChild(klon);
    }
  });
}

function visDetaljer(ost) {
  console.log(ost);
  popup.style.display = "block";
  popup.querySelector(".navn").textContent = ost.navn;
  popup.querySelector(".beskrivelse").textContent = ost.beskrivelse;
  popup.querySelector(".type").textContent = ost.type;
  popup.querySelector(".land").textContent = "Land: " + ost.land;
  popup.querySelector("img").src = "billeder/" + ost.billednavn + ".jpg";
}

popup
  .querySelector("#popup article")
  .addEventListener("click", () => (popup.style.display = "none"));

//   burgermenu
// Lav en variabel, der refererer til ".toggle-btn"
const btn = document.querySelector(".toggle-btn");
// Lav en variabel, der refererer til "nav"
const menu = document.querySelector(".menu nav");

// Lav en function, der hedder toggleMenu()
function toggleMenu() {
  console.log("toggleMenu");
  // 1. Toggle en klasse på nav vha. classList.toggle
  // 2. Toggle en klasse, der hedder "shown"
  menu.classList.toggle("shown");

  // 1. Lav en variabel, der hedder menuShown
  // 2. Den skal være lig med, om nav-variablen indeholder klassen "shown" vha. classList.contains("")
  const menuShown = menu.classList.contains("shown");

  // 1. Lav en if/else sætning => if (...) {...} else {...}
  // 2. Spørg om menu i if-sætningen => if (menu)
  if (menuShown) {
    btn.textContent = "˟";
    // hvis nav har klassen "shown", sæt da btn.textContent til "Luk"
  } else {
    btn.textContent = "☰ ";
    // hvis IKKE nav har klassen "shown", sæt da btn.textContent til "Menu"
  }
}

/* Tilføj et klik-event til btn, der sætter toggleMenu-funktionen i gang */
btn.addEventListener("click", toggleMenu);
