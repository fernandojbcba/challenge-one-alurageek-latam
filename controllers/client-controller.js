import { userLoggedIn, userLogout } from "../controllers/session-controller.js";

const loginContainer = document.querySelector("[data-headerlogin]");
const nombrexx = localStorage.getItem("nombrex");
const headerAdminContent = `<button id="login_btn"><a href="">Salir</a></button>`;
const headerClientContent = `<button id="login_btn"><a href="login.html">Login</a></button>`;
const headerNombreContent = `<h2 id="nombre_log">Hola, ${nombrexx}</h2>`;

if (userLoggedIn()) {
    loginContainer.innerHTML = headerAdminContent && headerNombreContent;
    document.getElementById("login_btn").addEventListener("click", userLogout);
    
} else {
    loginContainer.innerHTML = headerClientContent;
}
