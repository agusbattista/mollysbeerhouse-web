class Formulario {
  #id;
  #alerta;

  constructor(alerta) {
    this.#id = document.getElementById("formulario");
    this.#alerta = alerta;
    this.#configurarEventos();
  }

  #configurarEventos = () => {
    this.#id.addEventListener("submit", (evento) =>
      this.#manejarSubmit(evento)
    );
  };

  #manejarSubmit = (evento) => {
    evento.preventDefault();
    this.#alerta.alertCargando();
    fetch(this.#id.action, {
      method: this.#id.method,
      body: new FormData(this.#id),
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          this.#id.reset();
          this.#alerta.alertExito();
        } else {
          this.#alerta.alertError();
        }
      })
      .catch((error) => {
        console.log(error.message);
        this.#alerta.alertError();
      });
  };
}
export default Formulario;
