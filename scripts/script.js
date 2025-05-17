import Card from "./Card.js";
import Alerta from "./Alerta.js";
import Favoritos from "./Favoritos.js";
import MenuHamburguesa from "./MenuHamburguesa.js";
import { CONFIG } from "./config.js";
import Container from "./Container.js";
import Formulario from "./Formulario.js";
import DataService from "./DataService.js";

const dataService = new DataService(
  "https://agusbattista.github.io/mollysbeerhouse-web/docs/cervezas.json"
);
const alerta = new Alerta(
  CONFIG.COLORES.BOTONES_ALERT,
  CONFIG.COLORES.BACKGROUND_ALERT,
  CONFIG.COLORES.TEXTO_ALERT
);
const cervezas = [];
const container = new Container(".container");
const menuHamburguesa = new MenuHamburguesa();
const favManager = new Favoritos();
const cardManager = new Card(favManager);
favManager.setCardManager(cardManager);
//formulario se resetea luego de enviarse y maneja las alertas al usuario (sólo se necesita invocar al constructor)
const formulario = new Formulario(alerta);

document.addEventListener("DOMContentLoaded", () => {
  menuHamburguesa.inicializar();
  favManager.cargarFavoritos();
  favManager.mostrarFavoritos();
});

dataService
  .getCervezas()
  .then((data) => {
    cervezas.push(...data);
    container.generarCards(cervezas, cardManager);
  })
  .catch((error) => {
    console.error("Error al cargar el archivo JSON:", error);
    alerta.alertError("No se pudieron cargar las cervezas");
  });
