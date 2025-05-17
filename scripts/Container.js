class Container {
  #container;
  constructor(clase) {
    this.#container = document.querySelector(clase);
  }

  agregarClase(clase) {
    this.#container.classList.add(clase);
  }

  generarCards = (cervezas, cardManager) => {
    this.#container.innerHTML = "";
    const fragmento = document.createDocumentFragment();
    cervezas.forEach((cerveza) => {
      const card = cardManager.crearCard(cerveza);
      fragmento.appendChild(card);
    });
    this.#container.appendChild(fragmento);
  };
}

export default Container;
