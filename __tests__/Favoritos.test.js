import { describe, test } from "@jest/globals";
import Favoritos from "../scripts/Favoritos.js";
import Card from "../scripts/Card.js";

const DOM_SIMULADO = `
    <header class="header">
      <nav id="nav" class="nav">
        <ul class="nav-list">
          <!-- li oculto si no hay fav -->
          <li id="a-favoritas" style="display: none"><a href="#cervezas-favoritas">CERVEZAS FAVORITAS</a></li>
        </ul>
      </nav>
    </header>

    <section id="nuestras-cervezas">
      <h2>NUESTRAS CERVEZAS</h2>
      <div class="container">
        <div class="item">
          <img src="media/img/ogham-honey.png" alt="Imagen de una cerveza Ogham Honey" class="img-cerveza">
          <div class="descripcion">
            <details>
              <summary>VER MÁS</summary>
              <p>CERVEZA DORADA. BASE DE MIEL, CON NOTAS DULCES Y FLORALES. RETROGUSTO DULCE Y AGRADABLE.</p>
            </details>
            <button class="boton activo" id="boton-0">🤎</button>
          </div>

        <div class="item">
          <img src="media/img/ogham-red-ale.png" alt="Imagen de una cerveza Ogham Red Ale" class="img-cerveza">
          <div class="descripcion">
            <details>
              <summary>VER MÁS</summary>
              <p>CERVEZA ALE COLOR RUBÍ. CON 6 TIPOS DE MALTAS. AMARGOR MODERADAMENTE BAJO Y BIEN BALANCEADA.</p>
            </details>
            <button class="boton" id="boton-1">🤎</button>
          </div>
        </div>
      </div>
    </section>

    <section id="cervezas-favoritas" style="display: none">
      <!-- Sección oculta por defecto si no hay cervezas favoritas -->
      <h2>CERVEZAS FAVORITAS</h2>
      <div class="favoritas-container" style="display: none">
        <!-- Las cards son generadas mediante JavaScript -->
      </div>
    </section>

    <section id="footernavbar" class="grid-navbar">
      <nav>
        <ul>
          <!-- li oculto si no hay fav -->
          <li id="a-footer-favoritas" style="display: none"><a href="#cervezas-favoritas">CERVEZAS FAVORITAS</a></li>
        </ul>
      </nav>
    </section>      
        `;
const OGHAM_HONEY = {
  id: 0,
  nombre: "Ogham Honey",
  img: "media/img/ogham-honey.png",
  descripcion:
    "CERVEZA DORADA. BASE DE MIEL, CON NOTAS DULCES Y FLORALES. RETROGUSTO DULCE Y AGRADABLE.",
};
const OGHAM_RED_ALE = {
  id: 1,
  nombre: "Ogham Red Ale",
  img: "media/img/ogham-red-ale.png",
  descripcion:
    "CERVEZA ALE COLOR RUBÍ. CON 6 TIPOS DE MALTAS. AMARGOR MODERADAMENTE BAJO Y BIEN BALANCEADA.",
};

let favoritos;
let cardManager;
let cervezaFavorita;
let cervezaNoFavorita;

describe("Favoritos", () => {
  beforeEach(() => {
    document.body.innerHTML = DOM_SIMULADO;
    cervezaFavorita = OGHAM_HONEY;
    cervezaNoFavorita = OGHAM_RED_ALE;
    //localStorage simulado con una cerveza favorita
    localStorage.clear();
    localStorage.setItem("favoritos", JSON.stringify([cervezaFavorita]));
    favoritos = new Favoritos();
    cardManager = new Card(favoritos);
    favoritos.setCardManager(cardManager);
  });

  test("estaEnFavoritos debe devolver true si la cerveza está en favoritos", () => {
    const resultado = favoritos.estaEnFavoritos(cervezaFavorita);
    expect(resultado).toBe(true);
  });

  test("estaEnFavoritos debe devolver false si la cerveza no está en favoritos", () => {
    const resultado = favoritos.estaEnFavoritos(cervezaNoFavorita);
    expect(resultado).toBe(false);
  });

  test("agregarAFavoritos debe agregar una cerveza que no estaba en favoritos", () => {
    favoritos.agregarAFavoritos(cervezaNoFavorita);
    const resultado = favoritos.estaEnFavoritos(cervezaNoFavorita);
    expect(resultado).toBe(true);
  });

  test("agregarAFavoritos debe eliminar una cerveza que ya estaba en favoritos", () => {
    favoritos.agregarAFavoritos(cervezaFavorita);
    const resultado = favoritos.estaEnFavoritos(cervezaFavorita);
    expect(resultado).toBe(false);
  });
});
