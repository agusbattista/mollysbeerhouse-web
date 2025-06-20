class Formulario {
  #formulario;
  #alerta;

  constructor(alerta) {
    this.#formulario = document.getElementById("formulario");
    this.#alerta = alerta;
    this.#configurarEventos();
  }

  #configurarEventos = () => {
    this.#formulario.addEventListener("submit", async (evento) => {
      evento.preventDefault();
      await this.#validarYEnviarFormulario();
    });
  };

  #validarYEnviarFormulario = async () => {
    if (this.#formulario.checkValidity()) {
      this.#alerta.alertCargando();
      try {
        const response = await fetch(this.#formulario.action, {
          method: this.#formulario.method,
          body: new FormData(this.#formulario),
          headers: {
            Accept: "application/json",
          },
        });
        if (response.ok) {
          this.#formulario.reset();
          this.#alerta.alertExito();
        } else {
          this.#alerta.alertError();
        }
      } catch (error) {
        console.error("Error al enviar formulario.", error);
        this.#alerta.alertError();
      }
    } else {
      this.#formulario.reportValidity();
    }
  };
}

export default Formulario;
