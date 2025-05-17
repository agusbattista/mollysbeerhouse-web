class MenuHamburguesa {
  #nav;
  #abrir;
  #cerrar;
  #header;
  constructor() {
    this.#nav = document.querySelector("#nav");
    this.#abrir = document.querySelector("#abrir");
    this.#cerrar = document.querySelector("#cerrar");
    this.#header = document.querySelector("header");
    this.#configurarEventos();
  }

  #configurarEventos = () => {
    this.#abrir.addEventListener("click", this.abrirHeader);
    this.#cerrar.addEventListener("click", this.cerrarHeader);
    this.#nav.addEventListener("click", this.cerrarHeader);
  };

  inicializar = () => {
    this.#nav.classList.remove("nav-visible");
    this.#header.classList.add("header-cerrado");
    this.#abrir.style.display = "block";
    this.#cerrar.style.display = "none";
  };

  abrirHeader = () => {
    this.#nav.classList.add("nav-visible");
    this.#header.classList.remove("header-cerrado");
    this.#abrir.style.display = "none";
    this.#cerrar.style.display = "block";
  };

  cerrarHeader = () => {
    this.#nav.classList.remove("nav-visible");
    this.#header.classList.add("header-cerrado");
    this.#abrir.style.display = "block";
    this.#cerrar.style.display = "none";
  };
}

export default MenuHamburguesa;
