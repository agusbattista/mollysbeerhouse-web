import Card from "./Card.js";
import Alerta from "./Alerta.js";
import Favoritos from "./Favoritos.js";

const cervezas = [];

const COLOR_BOTONES_ALERT = "#f67c4f"; // Naranja de Molly's
const COLOR_BACKGROUND_ALERT = "#1d1d1b"; // Body de Molly's
const COLOR_TEXTO_ALERT = "#ffffff"; // Texto de Molly's

//menu hamburguesa
const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");
const header = document.querySelector("header");

const favManager = new Favoritos(cervezas);
const cardManager = new Card(favManager);
favManager.setCardManager(cardManager);

const alerta = new Alerta(
  COLOR_BOTONES_ALERT,
  COLOR_BACKGROUND_ALERT,
  COLOR_TEXTO_ALERT
);

//función para generar las cards de manera dinámica
function generarCards() {
  const container = document.querySelector(".container");
  container.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevas cards
  cervezas.forEach((cerveza) => {
    const card = cardManager.crearCard(cerveza);
    container.appendChild(card);
  });
}

function cerrarHeader() {
  nav.classList.remove("nav-visible");
  header.classList.add("header-cerrado");
  abrir.style.display = "block";
  cerrar.style.display = "none";
}

//llamada a las funciones para crear dinámicamente las cards
document.addEventListener("DOMContentLoaded", () => {
  favManager.cargarFavoritos();
  //generarCards();
  favManager.mostrarFavoritos();
  //inicialización menu hamburguesa
  nav.classList.remove("nav-visible"); // Asegúrate de que el menú esté cerrado al inicio
  header.classList.add("header-cerrado");
  abrir.style.display = "block";
  cerrar.style.display = "none";
});

//fetch para cargar el archivo JSON y guardarlo en el arreglo cervezas
fetch("https://agusbattista.github.io/mollysbeerhouse-web/docs/cervezas.json")
  .then((response) => response.json())
  .then((data) => {
    cervezas.push(...data);
    generarCards();
  })
  .catch((error) => {
    console.error("Error al cargar el archivo JSON:", error);
  });

abrir.addEventListener("click", () => {
  nav.classList.add("nav-visible");
  header.classList.remove("header-cerrado");
  abrir.style.display = "none";
  cerrar.style.display = "block";
});

cerrar.addEventListener("click", () => {
  cerrarHeader();
});

nav.addEventListener("click", () => {
  cerrarHeader();
});

//alertas de SweetAlert2 personalizadas

//Resetea el formulario luego de enviarlo. Envía alertas al usuario para informar el proceso y el resultado.
document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();
  alerta.alertCargando();
  fetch(this.action, {
    method: this.method,
    body: new FormData(this),
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        this.reset();
        alerta.alertExito();
      } else {
        alerta.alertError();
      }
    })
    .catch((error) => {
      console.log(error.message);
      alerta.alertError();
    });
});
