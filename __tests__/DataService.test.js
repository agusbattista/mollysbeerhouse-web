import { afterEach, beforeEach, expect, jest } from "@jest/globals";
import DataService from "../scripts/DataService.js";

describe("DataService", () => {
  let dataService;
  const fakeUrl = "https://api.mock.com/cervezas";
  const fakeData = [
    { id: 1, nombre: "Cerveza IPA" },
    { id: 2, nombre: "Cerveza Lager" },
  ];

  beforeEach(() => {
    dataService = new DataService(fakeUrl);
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getCervezas debe devolver un JSON de cervezas cuando la respuesta es exitosa", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(fakeData),
    });
    const resultado = await dataService.getCervezas();
    expect(resultado).toEqual(fakeData);
    expect(fetch).toHaveBeenCalledWith(fakeUrl);
  });

  test("getCervezas debe lanzar un error cuando la respuesta no es exitosa", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });
    await expect(dataService.getCervezas()).rejects.toThrow(
      "Error al cargar las cervezas: 404"
    );
    expect(fetch).toHaveBeenCalledWith(fakeUrl);
  });

  test("getCervezas debe lanzar un error cuando ocurre un fallo de red", async () => {
    fetch.mockRejectedValueOnce(new Error("Error de red"));
    await expect(dataService.getCervezas()).rejects.toThrow("Error de red");
    expect(fetch).toHaveBeenCalledWith(fakeUrl);
  });
});
