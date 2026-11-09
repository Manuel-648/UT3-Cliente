// Elementos de la página
const formulario = document.getElementById("formulario-preferencias");
const inputNombre = document.getElementById("nombre-usuario");
const inputColor = document.getElementById("color-fondo");
const selectTema = document.getElementById("tema-visual");
const botonGuardar = document.getElementById("boton-guardar");
const botonRestablecer = document.getElementById("boton-restablecer");
const contenedor = document.getElementById("contenedor-bienvenida");

// Cookies

function guardarCookie(nombre, valor, dias) {
  let cookie = nombre + "=" + encodeURIComponent(valor) + "; path=/";

  // sin días = cookie de sesión
  if (dias) {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + dias);
    cookie += "; expires=" + fecha.toUTCString();
  }

  document.cookie = cookie;
}

function leerCookie(nombre) {
  const lista = document.cookie.split("; ");

  for (let i = 0; i < lista.length; i++) {
    const partes = lista[i].split("=");
    if (partes[0] === nombre) {
      return decodeURIComponent(partes[1]);
    }
  }

  return null;
}

function borrarCookie(nombre) {
  // fecha del pasado
  document.cookie = nombre + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}

// Bienvenida

function mostrarBienvenida(nombre) {
  // evita que se repita
  quitarBienvenida();

  const bloque = document.createElement("div");
  bloque.id = "bloque-bienvenida";

  const titulo = document.createElement("h2");
  titulo.textContent = "¡Bienvenido, " + nombre + "!";

  const parrafo = document.createElement("p");
  parrafo.textContent = "Tus preferencias están guardadas.";

  bloque.appendChild(titulo);
  bloque.appendChild(parrafo);
  contenedor.appendChild(bloque);
}

function quitarBienvenida() {
  const bloque = document.getElementById("bloque-bienvenida");

  if (bloque) {
    contenedor.removeChild(bloque);
  }
}

// Aspecto

function cambiarColor(color) {
  document.body.style.backgroundColor = color;
}

function cambiarTema(tema) {
  if (tema === "oscuro") {
    document.body.classList.remove("tema-claro");
    document.body.classList.add("tema-oscuro");
  } else {
    document.body.classList.remove("tema-oscuro");
    document.body.classList.add("tema-claro");
  }
}

// Guardar y cargar

function guardarPreferencias() {
  const nombre = inputNombre.value.trim();

  if (nombre === "") {
    alert("Escribe tu nombre antes de guardar");
    return;
  }

  // nombre y color 7 días, tema de sesión
  guardarCookie("nombre", nombre, 7);
  guardarCookie("color", inputColor.value, 7);
  guardarCookie("tema", selectTema.value, 7);

  mostrarBienvenida(nombre);
}

function cargarPreferencias() {
  const nombre = leerCookie("nombre");
  const color = leerCookie("color");
  const tema = leerCookie("tema");

  if (color) {
    cambiarColor(color);
    inputColor.value = color;
  }

  if (tema) {
    cambiarTema(tema);
    selectTema.value = tema;
  }

  if (nombre) {
    inputNombre.value = nombre;
    mostrarBienvenida(nombre);
  }
}

// Restablecer

function restablecerInterfaz() {
  borrarCookie("nombre");
  borrarCookie("color");
  borrarCookie("tema");

  // aspecto por defecto
  document.body.style.backgroundColor = "";
  document.body.classList.remove("tema-claro", "tema-oscuro");

  quitarBienvenida();

  // vaciar formulario
  inputNombre.value = "";
  inputColor.value = "#ffffff";
  selectTema.value = "claro";
}

// Eventos

inputColor.addEventListener("input", () => {
  cambiarColor(inputColor.value);
});

selectTema.addEventListener("change", () => {
  cambiarTema(selectTema.value);
});

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault(); // evita que se recargue la página
  guardarPreferencias();
});

botonRestablecer.addEventListener("click", () => {
  restablecerInterfaz();
});

// Al cargar la página
cargarPreferencias();