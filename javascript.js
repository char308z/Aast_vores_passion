const url = "https://tema07-0903.restdb.io/rest/oste";
const options = {
  headers: {
    "x-apikey": "620f92ae34fd6215658587d4",
  },
};
const main = document.querySelector("section main");
const template = document.querySelector("section template").content;
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
      klon.querySelector(".kortbeskrivelse").textContent = ost.kortbeskrivelse;
      klon.querySelector(".pris").textContent = "Pris: " + ost.pris + " kr.";
      klon.querySelector("img").src = "billeder/" + ost.billednavn + ".jpg";
      klon
        .querySelector("article")
        .addEventListener("click", () => visDetaljer(ost));
      klon.querySelector("article").classList.add(ost.kategori);
      main.appendChild(klon);
    }
  });
}

function visDetaljer(ost) {
  console.log(ost);
  popup.style.display = "block";
  popup.querySelector(".navn").textContent = ost.navn;
  popup.querySelector(".langbeskrivelse").textContent = ost.langbeskrivelse;
  popup.querySelector(".pris").textContent = "Pris: " + ost.pris + " kr.";
  popup.querySelector("img").src = "medium/" + ost.billednavn + "-md.jpg";
}

popup
  .querySelector("#lukKnap")
  .addEventListener("click", () => (popup.style.display = "none"));
