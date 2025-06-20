import { beforeEach, jest } from "@jest/globals";
import Cerveza from "../scripts/Cerveza.js";

const cervezasDePrueba = [
  {
    id: 1,
    nombre: "IPA",
    descripcion: "Cerveza IPA",
    img: "ruta/imagenIPA.jpg",
  },
  {
    id: 2,
    nombre: "Lager",
    descripcion: "Cerveza Lager",
    img: "ruta/imagenLager.jpg",
  },
];

describe("Cerveza", () => {
  let spyAlerta;
  let stubDataService;
  let spyContainer;
  let stubCardManager;
  let cerveza;

  beforeEach(() => {
    spyAlerta = {
      alertError: jest.fn(),
    };
    stubDataService = {
      getCervezas: jest.fn().mockResolvedValue(cervezasDePrueba),
    };
    spyContainer = {
      generarCards: jest.fn(),
    };
    cerveza = new Cerveza(spyAlerta);
  });

  test("cargarCervezas debe obtener las cervezas correctamente", async () => {
    await cerveza.cargarCervezas(
      stubDataService,
      spyContainer,
      stubCardManager
    );
    expect(cerveza.getCervezas()).toEqual(cervezasDePrueba);
  });

  test("cargarCervezas debe manejar errores", async () => {
    stubDataService.getCervezas.mockRejectedValueOnce(
      new Error("Error al cargar las cervezas")
    );
    await cerveza.cargarCervezas(
      stubDataService,
      spyContainer,
      stubCardManager
    );
    expect(spyAlerta.alertError).toHaveBeenCalledWith(
      "No se pudieron cargar las cervezas. Intente más tarde."
    );
    expect(spyContainer.generarCards).not.toHaveBeenCalled();
    expect(cerveza.getCervezas()).toEqual([]);
  });
});
