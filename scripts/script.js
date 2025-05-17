import Card from "./Card.js";
import Alerta from "./Alerta.js";
import Favoritos from "./Favoritos.js";
import MenuHamburguesa from "./MenuHamburguesa.js";
import { CONFIG } from "./config.js";
import Container from "./Container.js";
import Formulario from "./Formulario.js";
import DataService from "./DataService.js";
import Cerveza from "./Cerveza.js";

const dataService = new DataService(CONFIG.URL_CERVEZAS);
const alerta = new Alerta(
  CONFIG.COLORES.BOTONES_ALERT,
  CONFIG.COLORES.BACKGROUND_ALERT,
  CONFIG.COLORES.TEXTO_ALERT
);
const container = new Container(".container");
const menuHamburguesa = new MenuHamburguesa();
const favManager = new Favoritos();
const cardManager = new Card(favManager);
favManager.setCardManager(cardManager);
/*  El formulario se resetea luego de enviarse y maneja las alertas al usuario. 
    Sólo se necesita invocar al constructor. */
const formulario = new Formulario(alerta);
const cerveza = new Cerveza(alerta);

document.addEventListener("DOMContentLoaded", async () => {
  try {
    menuHamburguesa.inicializar();
    await Promise.all([
      favManager.cargarFavoritos(),
      cerveza.cargarCervezas(dataService, container, cardManager),
    ]);
    favManager.mostrarFavoritos();
  } catch (error) {
    console.error("Error durante la inicialización", error);
    alerta.alertError("Ocurrió un error al cargar la aplicación");
  }
});
