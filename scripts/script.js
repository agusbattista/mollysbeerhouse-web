//objeto con las cervezas que van a aparecer en las cards de manera dinámica
const cervezas = [];

//fetch para cargar el archivo JSON y guardarlo en el arreglo cervezas
fetch("https://agusbattista.github.io/mollysbeerhouse-web/cervezas.json")
  .then((response) => response.json())
  .then((data) => {
    cervezas.push(...data);
    generarCards();
  })
  .catch((error) => {
    console.error("Error al cargar el archivo JSON:", error);
  });

//función para crear una tarjeta de cerveza
function crearCard(cerveza) {
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
  boton.id = `boton-${cerveza.id}`;
  boton.innerHTML = "🤎";
  boton.onclick = () => agregarAFavoritos(cerveza.id);

  // Verificar si la cerveza ya está en favoritos y agregar la clase "activo" si así es
  if (favoritos.some((fav) => fav.id === cerveza.id)) {
    boton.classList.add("activo");
  }

  //agregar todo al item
  descripcion.appendChild(details);
  descripcion.appendChild(boton);
  item.appendChild(img);
  item.appendChild(descripcion);

  return item;
}

//función para generar las cards de manera dinámica
function generarCards() {
  const container = document.querySelector(".container");

  cervezas.forEach((cerveza) => {
    const card = crearCard(cerveza);
    container.appendChild(card);
  });
}

//cervezas favoritas
const favoritos = [];

//función para agregar y eliminar cervezas a favoritos
function agregarAFavoritos(id) {
  const existeFavorito = favoritos.find((fav) => fav.id === id);
  const cervezaEncontrada = cervezas.find((cerveza) => cerveza.id === id);
  const boton = document.querySelector(`#boton-${id}`);

  if (!existeFavorito) {
    favoritos.push(cervezaEncontrada);
    console.log(`Cerveza ${cervezaEncontrada.nombre} agregada a favoritos`);
    boton.classList.add("activo");
  } else {
    const index = favoritos.indexOf(existeFavorito);
    favoritos.splice(index, 1);
    console.log(`Cerveza ${existeFavorito.nombre} eliminada de favoritos`);
    boton.classList.remove("activo");
  }
  // Guardar los cambios en el localStorage
  guardarFavoritos();
  console.log(favoritos);
  //actualizar la sección de favoritos
  mostrarFavoritos();
}

// Función para mostrar cervezas favoritas
function mostrarFavoritos() {
  //si hay cervezas favoritas, muestro el título, caso contrario no
  if (favoritos.length > 0) {
    document.getElementById("cervezas-favoritas").style.display = "block";
    document.getElementById("a-favoritas").style.display = "block";
    document.getElementById("a-footer-favoritas").style.display = "block";
  } else {
    document.getElementById("cervezas-favoritas").style.display = "none";
    document.getElementById("a-favoritas").style.display = "none";
    document.getElementById("a-footer-favoritas").style.display = "none";
  }

  const favoritosContainer = document.querySelector(".favoritas-container");
  favoritosContainer.innerHTML = "";
  favoritosContainer.classList.add("container");

  // Crear un fragmento para mejorar el rendimiento
  const fragmento = document.createDocumentFragment();

  favoritos.forEach((cerveza) => {
    const card = crearCard(cerveza);
    //agrego las cervezas a fragmento en lugar de favoritosContainer
    fragmento.appendChild(card);
  });
  //ahora sí agrego el fragmento a favoritosContainer
  favoritosContainer.appendChild(fragmento);
}

// Función para guardar favoritos en el localStorage
function guardarFavoritos() {
  const favoritosJSON = JSON.stringify(favoritos);
  localStorage.setItem("favoritos", favoritosJSON);
}

// Función para cargar favoritos desde el localStorage
function cargarFavoritos() {
  const favoritosJSON = localStorage.getItem("favoritos");
  if (favoritosJSON) {
    //limpio el arreglo de esta manera porque esta declarado como const
    favoritos.length = 0;
    const favoritosGuardados = JSON.parse(favoritosJSON);
    favoritos.push(...favoritosGuardados);
  }
}

//llamada a las funciones para crear dinámicamente las cards
document.addEventListener("DOMContentLoaded", () => {
  cargarFavoritos();
  //generarCards();
  mostrarFavoritos();
  console.log(favoritos);
  //inicialización menu hamburguesa
  nav.classList.remove("nav-visible"); // Asegúrate de que el menú esté cerrado al inicio
  header.classList.add("header-cerrado");
  abrir.style.display = "block";
  cerrar.style.display = "none";
});

//menu hamburguesa
const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");
const header = document.querySelector("header");

function cerrarHeader() {
  nav.classList.remove("nav-visible");
  header.classList.add("header-cerrado");
  abrir.style.display = "block";
  cerrar.style.display = "none";
}

abrir.addEventListener("click", () => {
  nav.classList.add("nav-visible");
  header.classList.remove("header-cerrado");
  abrir.style.display = "none";
  cerrar.style.display = "block";
});

cerrar.addEventListener("click", () => {
  cerrarHeader();
});

nav.addEventListener("click", () => {
  cerrarHeader();
});

//alertas de SweetAlert2 personalizadas
const COLOR_BOTONES_ALERT = "#f67c4f"; // Naranja de Molly's
const COLOR_BACKGROUND_ALERT = "#1d1d1b"; // Body de Molly's
const COLOR_TEXTO_ALERT = "#ffffff"; // Texto de Molly's

function alertCargando() {
  Swal.fire({
    title: "Enviando mensaje...",
    text: "Por favor espera un momento",
    allowOutsideClick: false,
    background: COLOR_BACKGROUND_ALERT,
    color: COLOR_TEXTO_ALERT,
    didOpen: () => {
      Swal.showLoading();
    },
  });
}

function alertExito(
  titulo = "¡Éxito!",
  mensaje = "Mensaje enviado correctamente"
) {
  Swal.fire({
    icon: "success",
    title: titulo,
    text: mensaje,
    confirmButtonColor: COLOR_BOTONES_ALERT,
    background: COLOR_BACKGROUND_ALERT,
    color: COLOR_TEXTO_ALERT,
  });
}

function alertError(mensaje = "Hubo un problema al enviar el mensaje") {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: mensaje,
    confirmButtonColor: COLOR_BOTONES_ALERT,
    background: COLOR_BACKGROUND_ALERT,
    color: COLOR_TEXTO_ALERT,
  });
}

//Resetea el formulario luego de enviarlo. Envía alertas al usuario para informar el proceso y el resultado.
document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();
  alertCargando();
  fetch(this.action, {
    method: this.method,
    body: new FormData(this),
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        this.reset();
        alertExito();
      } else {
        alertError();
      }
    })
    .catch((error) => {
      console.log(error.message);
      alertError();
    });
});
