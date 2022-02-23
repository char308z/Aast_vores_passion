// link til databasen med oste
const url = "https://tema07-0903.restdb.io/rest/oste";
// nøgle til databasen
const options = {
  headers: {
    "x-apikey": "620f92ae34fd6215658587d4",
  },
};

// konstater og variabler
const main = document.querySelector("section");
const template = document.querySelector("main template").content;
const popup = document.querySelector("#popup");
const header = document.querySelector("h1");
let oste;
let filter = "alle";

// DOM'en loades og kalder på funktionen start
document.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");

  // konstant der henviser til knapperne i vores filtrerings menu
  const filterKnapper = document.querySelectorAll("main div nav button");
  filterKnapper.forEach((knap) => {
    knap.addEventListener("click", filtrerOste);
  });
  // kalder på functionen hentdata
  hentdata();

  // når der clicks på logoet går den til functionen forside
  document.querySelector("#logo").addEventListener("click", forside);
}
//  function som sender en tilbage til forsiden
function forside() {
  console.log("forsideHop");
  window.location.href = "index.html";
}

// henter data fra data basen
async function hentdata() {
  const resultat = await fetch(url, options);
  oste = await resultat.json();

  // kalder på functionen visOstene
  visOste();
}

// function som filtrer ostene efter efter type
function filtrerOste() {
  console.log("flitrer");
  filter = this.dataset.type;
  // tilføjer classen valgt til den knap som der trykkes på
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");

  // ændre h1 på siden til at stemme overens med den knap som der trykkes på
  header.textContent = this.textContent;

  // kalder på functionen visOste
  visOste();
}

// funktionen visOste placere indhold fra databasen i templaten
function visOste() {
  console.log("vis oste");
  main.textContent = "";
  oste.forEach((ost) => {
    if (filter == ost.type || filter == "alle") {
      let klon = template.cloneNode(true);
      klon.querySelector(".navn").textContent = ost.navn;
      klon.querySelector(".type").textContent = "Type: " + ost.type;
      klon.querySelector(".land").textContent = "Land: " + ost.land;
      klon.querySelector("img").src = "billeder/" + ost.billednavn + ".webp";
      klon
        .querySelector("article")
        .addEventListener("click", () => visDetaljer(ost));
      main.appendChild(klon);
    }
  });
}

// funktion der gør at der i pop-up vinduet bliver placere indhold fra databasen i pop-up-templaten med flere detalijer end før
function visDetaljer(ost) {
  console.log(ost);
  popup.style.display = "flex";
  popup.querySelector(".navn").textContent = ost.navn;
  popup.querySelector(".beskrivelse").textContent = ost.beskrivelse;
  popup.querySelector(".type").textContent = ost.type;
  popup.querySelector(".alder").textContent = "Modnings periode: " + ost.alder;
  popup.querySelector(".land").textContent = "Land: " + ost.land;
  popup.querySelector("img").src = "billeder/" + ost.billednavn + ".webp";
}

// Gør at pop-up vinduet kan lukkes igen
popup
  .querySelector("#popup article")
  .addEventListener("click", () => (popup.style.display = "none"));
