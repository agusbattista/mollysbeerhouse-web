import { describe, beforeEach, afterEach, test, jest } from "@jest/globals";
import Formulario from "../scripts/Formulario.js";

const FAKE_URL = "https://api.mock.com/formulario";

const HTML_NECESARIO = `
  <form id="formulario" action="${FAKE_URL}" method="POST">
    <input type="text" name="nombre" id="nombre" required />
    <input type="email" name="email" id="email" required />
    <textarea name="comentarios" id="comentarios" required></textarea>
    <button type="submit">Enviar</button>
  </form>
`;

const DATOS_VALIDOS = {
  nombre: "Juan Pérez",
  email: "juan@prueba.com",
  comentarios: "Comentario de prueba",
};

const llenarFormulario = (spyForm, datos = DATOS_VALIDOS) => {
  Object.entries(datos).forEach(([campo, valor]) => {
    spyForm.querySelector(`#${campo}`).value = valor;
  });
};

describe("Formulario", () => {
  let spyAlerta;
  //formulario solo necesita ser instanciado para que se ejecuten los test
  let formulario;

  beforeEach(() => {
    document.body.innerHTML = HTML_NECESARIO;
    spyAlerta = {
      alertError: jest.fn(),
      alertExito: jest.fn(),
      alertCargando: jest.fn(),
    };
    formulario = new Formulario(spyAlerta);
  });

  afterEach(() => {
    if (global.fetch && global.fetch.mockRestore) {
      global.fetch.mockRestore();
    }
  });

  test("El formulario maneja respuesta exitosa del servidor", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: "OK" }),
      })
    );
    const spyForm = document.getElementById("formulario");
    llenarFormulario(spyForm);
    const submitEvent = new Event("submit");
    await spyForm.dispatchEvent(submitEvent);
    expect(global.fetch).toHaveBeenCalledWith(FAKE_URL, {
      body: expect.any(FormData),
      headers: { Accept: "application/json" },
      method: "post",
    });
    expect(spyAlerta.alertCargando).toHaveBeenCalled();
    expect(spyAlerta.alertExito).toHaveBeenCalled();
  });

  test("El formulario maneja respuesta de error del servidor", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Error" }),
      })
    );
    const spyForm = document.getElementById("formulario");
    llenarFormulario(spyForm);
    const submitEvent = new Event("submit");
    await spyForm.dispatchEvent(submitEvent);
    expect(global.fetch).toHaveBeenCalledWith(FAKE_URL, {
      body: expect.any(FormData),
      headers: { Accept: "application/json" },
      method: "post",
    });
    expect(spyAlerta.alertCargando).toHaveBeenCalled();
    expect(spyAlerta.alertError).toHaveBeenCalled();
    expect(spyAlerta.alertExito).not.toHaveBeenCalled();
  });

  test("Muestra error de validación con nombre inválido", async () => {
    const spyForm = document.getElementById("formulario");
    spyForm.reportValidity = jest.fn();
    spyForm.querySelector("#nombre").value = "";
    const submitEvent = new Event("submit");
    await spyForm.dispatchEvent(submitEvent);
    expect(spyForm.reportValidity).toHaveBeenCalled();
  });

  test("Muestra error de validación con email inválido", async () => {
    const spyForm = document.getElementById("formulario");
    spyForm.reportValidity = jest.fn();
    spyForm.querySelector("#email").value = "email-invalido";
    const submitEvent = new Event("submit");
    await spyForm.dispatchEvent(submitEvent);
    expect(spyForm.reportValidity).toHaveBeenCalled();
  });

  test("Muestra error de validación con sección de comentarios inválida", async () => {
    const spyForm = document.getElementById("formulario");
    spyForm.reportValidity = jest.fn();
    spyForm.querySelector("#comentarios").value = "";
    const submitEvent = new Event("submit");
    await spyForm.dispatchEvent(submitEvent);
    expect(spyForm.reportValidity).toHaveBeenCalled();
  });
});
