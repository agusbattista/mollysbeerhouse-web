class Favoritos {
  #items;
  #cervezas;
  #cardManager;

  constructor(cervezas) {
    this.#items = [];
    this.#cervezas = cervezas;
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

  agregarAFavoritos = (id) => {
    const existeFavorito = this.#items.find((fav) => fav.id === id);
    const cervezaEncontrada = this.#cervezas.find(
      (cerveza) => cerveza.id === id
    );
    const boton = document.querySelector(`#boton-${id}`);

    if (!existeFavorito) {
      this.#items.push(cervezaEncontrada);
      console.log(`Cerveza ${cervezaEncontrada.nombre} agregada a favoritos`);
      boton.classList.add("activo");
    } else {
      const index = this.#items.indexOf(existeFavorito);
      this.#items.splice(index, 1);
      console.log(`Cerveza ${existeFavorito.nombre} eliminada de favoritos`);
      boton.classList.remove("activo");
    }
    // Guardar los cambios en el localStorage
    this.guardarFavoritos();
    console.log(this.#items);
    //actualizar la sección de favoritos
    this.mostrarFavoritos();
  };

  estaEnFavoritos = (cerveza) => {
    return this.#items.some((item) => item.id === cerveza.id);
  };

  mostrarFavoritos = () => {
    //si hay cervezas favoritas, muestro el título, caso contrario no
    if (this.#items.length > 0) {
      document.getElementById("cervezas-favoritas").style.display = "block";
      document.getElementById("a-favoritas").style.display = "block";
      document.getElementById("a-footer-favoritas").style.display = "block";
    } else {
      document.getElementById("cervezas-favoritas").style.display = "none";
      document.getElementById("a-favoritas").style.display = "none";
      document.getElementById("a-footer-favoritas").style.display = "none";
    }

    const favoritosContainer = document.querySelector(".favoritas-container");
    favoritosContainer.innerHTML = "";
    favoritosContainer.classList.add("container");

    // Crear un fragmento para mejorar el rendimiento
    const fragmento = document.createDocumentFragment();

    this.#items.forEach((cerveza) => {
      const card = this.#cardManager.crearCard(cerveza);
      //agrego las cervezas a fragmento en lugar de favoritosContainer
      fragmento.appendChild(card);
    });
    //ahora sí agrego el fragmento a favoritosContainer
    favoritosContainer.appendChild(fragmento);
  };
}

export default Favoritos;
