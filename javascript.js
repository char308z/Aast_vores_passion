const url = "https://tema07-0903.restdb.io/rest/oste";
const options = {
  headers: {
    "x-apikey": "620f92ae34fd6215658587d4",
  },
};
const main = document.querySelector("section");
const template = document.querySelector("main template").content;
const popup = document.querySelector("#popup");
const header = document.querySelector("h1");
let oste;
let filter = "alle";

document.addEventListener("DOMContentLoaded", start);
function start() {
  console.log("start");
  const filterKnapper = document.querySelectorAll("main div nav button");
  filterKnapper.forEach((knap) => {
    knap.addEventListener("click", filtrerOste);
  });

  hentdata();

  document.querySelector("#logo").addEventListener("click", forside);
}

function forside() {
  console.log("forsideHop");
  window.location.href = "index.html";
}

async function hentdata() {
  const resultat = await fetch(url, options);
  oste = await resultat.json();
  visOste();
}

function filtrerOste() {
  console.log("flitrer");
  filter = this.dataset.type;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
  header.textContent = this.textContent;
  visOste();
}

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

popup
  .querySelector("#popup article")
  .addEventListener("click", () => (popup.style.display = "none"));
