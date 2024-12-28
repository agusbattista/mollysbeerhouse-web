//objeto con las cervezas que van a aparecer en las cards de manera dinámica
const cervezas = [
  {
    id: 0,
    nombre: "Ogham Honey",
    img: "media/img/ogham-honey.png",
    descripcion:
      "CERVEZA DORADA. BASE DE MIEL, CON NOTAS DULCES Y FLORALES. RETROGUSTO DULCE Y AGRADABLE.",
  },
  {
    id: 1,
    nombre: "Ogham Red Ale",
    img: "media/img/ogham-red-ale.png",
    descripcion:
      "CERVEZA ALE COLOR RUBÍ. CON 6 TIPOS DE MALTAS. AMARGOR MODERADAMENTE BAJO Y BIEN BALANCEADA.",
  },
  {
    id: 2,
    nombre: "Ogham IPA",
    img: "media/img/ogham-ipa.png",
    descripcion:
      "CERVEZA ÁMBAR. INTENSA, FLORAL Y FRUTAL. AMARGOR BALANCEADO CON EL DULZOR APORTADO POR LAS MALTAS. SABROSA Y COMPLEJA.",
  },
  {
    id: 3,
    nombre: "Ogham Porter",
    img: "media/img/ogham-porter.png",
    descripcion:
      "CERVEZA DE ORIGEN INGLÉS, DE BUEN CUERPO. CARÁCTER INTENSO DE CHOCOLATE, CAFÉ Y NUEZ.",
  },
  {
    id: 4,
    nombre: "Ogham AAA",
    img: "media/img/ogham-aaa.png",
    descripcion:
      "AROMAS EQUILIBRADOS ENTRE LUPULOS AMERICANOS Y MALTAS EUROPEAS. SOPORTE DE MALTAS CARAMELO. BUENA TOMABILIDAD.",
  },
  {
    id: 5,
    nombre: "Ogham APA",
    img: "media/img/ogham-apa.png",
    descripcion:
      "CERVEZA DORADA A ROJIZA. SUAVE, FRESCA Y FRUTAL. AROMA A LÚPULO Y UN FINAL AGRADABLE. BUENA TOMABILIDAD.",
  },
  {
    id: 6,
    nombre: "Buller IPA",
    img: "media/img/buller-ipa.png",
    descripcion:
      "ESTILO INGLÉS, COLOR COBRIZO INTENSO. RETROGUSTO PERSISTENTE REDONDEADO POR DEJOS TERROSOS Y ALGO CARAMELOSOS.",
  },
  {
    id: 7,
    nombre: "Buller Pilsen",
    img: "media/img/buller-pilsen.png",
    descripcion:
      "CERVEZA RUBIA CRISTALINA. SABORES FLORALES. SUTIL, ELEGANTE Y DE ALTA TOMABILIDAD.",
  },
  {
    id: 8,
    nombre: "Minga Honey",
    img: "media/img/minga-honey.png",
    descripcion:
      "CERVEZA DORADA CON SUTILES NOTAS DE MIEL. DULZURA MODERADA Y CUERPO LIGERO. ALTA TOMABILIDAD.",
  },
  {
    id: 9,
    nombre: "La Paloma Bock",
    img: "media/img/la-paloma-bock.png",
    descripcion:
      "CERVEZA DE ALTO CUERPO ALTO. MUY MALTOSA CON NOTAS DE CORTEZA DE PAN. FINAL SECO, CORTO. MEDIANA TOMABILIDAD.",
  },
  {
    id: 10,
    nombre: "La Paloma IPA-01",
    img: "media/img/la-paloma-ipa-01.png",
    descripcion:
      "CERVEZA COLOR DORADO INTENSO. BLEND DE LÚPULOS AMERICANOS FRUTALES Y RESINOSOS.",
  },
  {
    id: 11,
    nombre: "La Paloma IPA-02",
    img: "media/img/la-paloma-ipa-02.png",
    descripcion:
      "CERVEZA COLOR ÁMBAR. BLEND DE LÚPULOS AMERICANOS CÍTRICOS, FRUTALES Y ESPECIADOS.",
  },
];

function generarCards() {
  const container = document.querySelector(".container");

  cervezas.forEach((cerveza) => {
    //crear contenedor de la tarjeta
    const item = document.createElement("div");
    item.classList.add("item");
    //crear la imagen
    const img = document.createElement("img");
    img.src = cerveza.img;
    img.alt = `Imagen de una cerveza ${cerveza.nombre}`;
    img.classList.add("img-cerveza");
    //crear la descripcion
    const descripcion = document.createElement("div");
    descripcion.classList.add("descripcion");
    //crear y ocultar descripcion
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = "VER MÁS";
    const p = document.createElement("p");
    p.textContent = cerveza.descripcion;
    details.appendChild(summary);
    details.appendChild(p);
    //crear boton de favoritos
    const boton = document.createElement("button");
    boton.classList.add("boton");
    boton.innerHTML = "🤎";

    //agregar todo al item
    descripcion.appendChild(details);
    descripcion.appendChild(boton);
    item.appendChild(img);
    item.appendChild(descripcion);

    //agregar la tarjeta al container
    container.appendChild(item);
  });
}

//llamada a la función para crear dinámicamente las cards
document.addEventListener("DOMContentLoaded", generarCards);
