class DataService {
  #url;
  constructor(url) {
    this.#url = url;
  }

  async getCervezas() {
    try {
      const response = await fetch(this.#url);
      if (!response.ok) {
        throw new Error(`Error al cargar las cervezas: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}

export default DataService;
