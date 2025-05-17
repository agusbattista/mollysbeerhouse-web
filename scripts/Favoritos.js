import Container from "./Container.js";

class Favoritos {
  #items;
  #cardManager;
  #favoritosContainer;

  constructor() {
    this.#items = [];
    this.#favoritosContainer = new Container(".favoritas-container");
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

  agregarAFavoritos = (cerveza) => {
    const existeFavorito = this.estaEnFavoritos(cerveza);
    const boton = document.querySelector(`#boton-${cerveza.id}`);

    if (!existeFavorito) {
      this.#items.push(cerveza);
      boton.classList.add("activo");
    } else {
      const index = this.#items.findIndex((item) => item.id === cerveza.id);
      if (index !== -1) {
        this.#items.splice(index, 1);
        boton.classList.remove("activo");
      }
    }

    this.guardarFavoritos();
    this.mostrarFavoritos();
  };

  estaEnFavoritos = (cerveza) => {
    return this.#items.some((item) => item.id === cerveza.id);
  };

  mostrarFavoritos = () => {
    if (this.#items.length > 0) {
      document.getElementById("cervezas-favoritas").style.display = "block";
      document.getElementById("a-favoritas").style.display = "block";
      document.getElementById("a-footer-favoritas").style.display = "block";
    } else {
      document.getElementById("cervezas-favoritas").style.display = "none";
      document.getElementById("a-favoritas").style.display = "none";
      document.getElementById("a-footer-favoritas").style.display = "none";
    }
    this.#favoritosContainer.agregarClase("container");
    this.#favoritosContainer.generarCards(this.#items, this.#cardManager);
  };
}

export default Favoritos;
