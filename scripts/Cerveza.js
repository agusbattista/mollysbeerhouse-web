class Cerveza {
  #cervezas;
  #alerta;

  constructor(alerta) {
    this.#cervezas = [];
    this.#alerta = alerta;
  }

  getCervezas = () => {
    return [...this.#cervezas];
  };

  cargarCervezas = async (dataService, container, cardManager) => {
    try {
      const data = await dataService.getCervezas();
      this.#cervezas.push(...data);
      container.generarCards(this.getCervezas(), cardManager);
    } catch (error) {
      console.error("Error al cargar el archivo JSON.", error);
      this.#alerta.alertError(
        "No se pudieron cargar las cervezas. Intente más tarde."
      );
    }
  };
}

export default Cerveza;
