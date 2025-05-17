class Formulario {
  #formulario;
  #alerta;

  constructor(alerta) {
    this.#formulario = document.getElementById("formulario");
    this.#alerta = alerta;
    this.#configurarEventos();
  }

  #configurarEventos = () => {
    this.#formulario.addEventListener("submit", (evento) => {
      evento.preventDefault();
      this.#validarYEnviarFormulario();
    });
  };

  #validarYEnviarFormulario = () => {
    if (this.#formulario.checkValidity()) {
      this.#alerta.alertCargando();
      fetch(this.#formulario.action, {
        method: this.#formulario.method,
        body: new FormData(this.#formulario),
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            this.#formulario.reset();
            this.#alerta.alertExito();
          } else {
            this.#alerta.alertError();
          }
        })
        .catch((error) => {
          console.log(error.message);
          this.#alerta.alertError();
        });
    } else {
      this.#formulario.reportValidity();
    }
  };
}

export default Formulario;
