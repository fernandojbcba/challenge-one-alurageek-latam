import { clientServices } from "../service/client-service.js";

const form = document.querySelector("[data-login]");

form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const inputEmail = document.querySelector("[data-email]").value;
    const inputPassword = document.querySelector("[data-password]").value;
    clientServices.clientsList().then((data) => {
        let userFound = false
        data.forEach(({ email, password, id }) => {
            if (email == inputEmail && password == inputPassword) {
                userFound = true;
                return;
            }
        });
        if (userFound) {
        localStorage.setItem("email", inputEmail);
        window.location.assign(`${window.location.href.includes("alurageek") ? "/alurageek/" : ""}index.html`);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Correo y/o contraseña incorrecta!'
            });
        }
    }).catch((error) => console.error("Ocurrio un error", error));
    form.reset();
});