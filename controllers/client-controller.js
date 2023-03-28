import { userLoggedIn, userLogout } from "../controllers/session-controller.js";

const loginContainer = document.querySelector("[data-headerlogin]");
const loginnombrelog = document.querySelector("[data-headerNombre]");

const nombrexx = localStorage.getItem("nombrex");
const headerAdminContent = `<button id="login_btn"><a href="">Salir</a></button>`;
const headerClientContent = `<button id="login_btn"><a href="login.html">Login</a></button>`;
const headerNombreContent = `<h2 id="nombre_log">Hola, ${nombrexx}</h2>`;

if (userLoggedIn()) {
    loginContainer.innerHTML = headerAdminContent;
    document.getElementById("login_btn").addEventListener("click", userLogout);
    loginnombrelog.innerHTML = headerNombreContent;
} else {
    loginContainer.innerHTML = headerClientContent;
    loginnombrelog.innerHTML = `<h2 id="nombre_log">Hola, desconocido</h2>`
}
