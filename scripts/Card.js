class Card {
  #favoritos;
  constructor(favoritos) {
    this.#favoritos = favoritos;
  }

  crearCard = (cerveza) => {
    const item = this.#crearContenedor();
    const img = this.#crearImagen(cerveza);
    const descripcion = this.#crearDescripcion();
    const details = this.#crearDetalles(cerveza);
    const boton = this.#crearBotonFavorito(cerveza);
    descripcion.appendChild(details);
    descripcion.appendChild(boton);
    item.appendChild(img);
    item.appendChild(descripcion);
    return item;
  };

  #crearContenedor = () => {
    const item = document.createElement("div");
    item.classList.add("item");
    return item;
  };

  #crearImagen = (cerveza) => {
    const img = document.createElement("img");
    img.src = cerveza.img;
    img.alt = `Imagen de una cerveza ${cerveza.nombre}`;
    img.classList.add("img-cerveza");
    return img;
  };

  #crearDescripcion = () => {
    const descripcion = document.createElement("div");
    descripcion.classList.add("descripcion");
    return descripcion;
  };

  #crearDetalles = (cerveza) => {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = "VER MÁS";
    const p = document.createElement("p");
    p.textContent = cerveza.descripcion;
    details.appendChild(summary);
    details.appendChild(p);
    return details;
  };

  #crearBotonFavorito = (cerveza) => {
    const boton = document.createElement("button");
    boton.classList.add("boton");
    boton.id = `boton-${cerveza.id}`;
    boton.innerHTML = "🤎";
    boton.onclick = () => this.#favoritos.agregarAFavoritos(cerveza);
    if (this.#favoritos.estaEnFavoritos(cerveza)) {
      boton.classList.add("activo");
    }
    return boton;
  };
}

export default Card;
