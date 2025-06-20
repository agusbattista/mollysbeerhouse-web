import { jest } from "@jest/globals";
import Card from "../scripts/Card.js";

describe("Card", () => {
  let cerveza;
  let favoritosStub;
  let card;

  beforeEach(() => {
    cerveza = {
      id: 1,
      nombre: "IPA",
      descripcion: "Cerveza IPA de 5% de alcohol",
      img: "ruta/imagen-ipa.jpg",
    };
    favoritosStub = {
      agregarAFavoritos: jest.fn(),
      estaEnFavoritos: jest.fn(),
    };
    card = new Card(favoritosStub);
  });

  test("crear card con un botón de favoritos activo", () => {
    favoritosStub.estaEnFavoritos.mockReturnValue(true);
    const aCard = card.crearCard(cerveza);
    const botonFavorito = aCard.querySelector(`#boton-${cerveza.id}`);
    expect(botonFavorito.classList.contains("activo")).toBe(true);
  });

  test("crear card con un botón de favoritos inactivo", () => {
    favoritosStub.estaEnFavoritos.mockReturnValue(false);
    const aCard = card.crearCard(cerveza);
    const botonFavorito = aCard.querySelector(`#boton-${cerveza.id}`);
    expect(botonFavorito.classList.contains("activo")).toBe(false);
  });
});
