import Container from "./Container.js";

class Favoritos {
  #items;
  #cardManager;
  #favoritosContainer;

  constructor() {
    this.#items = [];
    this.#favoritosContainer = new Container(".favoritas-container");
    this.#favoritosContainer.agregarClase("container");
    this.cargarFavoritos();
  }

  setCardManager = (cardManager) => {
    this.#cardManager = cardManager;
  };

  cargarFavoritos = () => {
    const favoritosJSON = localStorage.getItem("favoritos");
    if (favoritosJSON) {
      this.#items = JSON.parse(favoritosJSON);
    }
  };

  guardarFavoritos = () => {
    localStorage.setItem("favoritos", JSON.stringify(this.#items));
  };

  #buscarPosicionDeCerveza = (cerveza) => {
    return this.#items.findIndex((item) => item.id === cerveza.id);
  };

  #agregarUnaCerveza = (cerveza) => {
    this.#items.push(cerveza);
  };

  #eliminarUnaCerveza = (cerveza) => {
    const index = this.#buscarPosicionDeCerveza(cerveza);
    this.#items.splice(index, 1);
  };

  estaEnFavoritos = (cerveza) => {
    return this.#items.some((item) => item.id === cerveza.id);
  };

  agregarAFavoritos = (cerveza) => {
    const existeFavorito = this.estaEnFavoritos(cerveza);
    const boton = document.querySelector(`#boton-${cerveza.id}`);
    if (!existeFavorito) {
      this.#agregarUnaCerveza(cerveza);
      boton.classList.add("activo");
    } else {
      this.#eliminarUnaCerveza(cerveza);
      boton.classList.remove("activo");
    }
    this.guardarFavoritos();
    this.mostrarFavoritos();
  };

  #mostrarFav = () => {
    document.getElementById("cervezas-favoritas").style.display = "block";
    document.getElementById("a-favoritas").style.display = "block";
    document.getElementById("a-footer-favoritas").style.display = "block";
  };
  #ocultarFav = () => {
    document.getElementById("cervezas-favoritas").style.display = "none";
    document.getElementById("a-favoritas").style.display = "none";
    document.getElementById("a-footer-favoritas").style.display = "none";
  };

  mostrarFavoritos = () => {
    if (this.#items.length > 0) {
      this.#mostrarFav();
    } else {
      this.#ocultarFav();
    }
    this.#favoritosContainer.generarCards(this.#items, this.#cardManager);
  };
}

export default Favoritos;
