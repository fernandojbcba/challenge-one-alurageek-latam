

const sendButton = document.querySelector(".info__container__contact__button");
const loginButton = document.querySelector(".login__form__btn");
const addProductButton = document.querySelector(".new__product__add__btn");

const elements = document.querySelectorAll("input, textArea, select");
const form = document.getElementById("contactform");
const image = document.querySelector(".new__product__image__url");

if (elements != null) {
    elements.forEach(element => {
        element.addEventListener("blur", (element) => {
            valida(element.target);
        });
    });
}

sendButton.addEventListener("click", (event) => {
    event.preventDefault();

    Swal.fire({
        icon: 'success',
        title: 'Su mensaje ha sido enviado',
        showConfirmButton: false,
        timer: 1500
    })
    form.reset();
});

function valida(element) {
    const tipoDeElement = element.dataset.tipo;
    const esValido = element.validity.valid;

    if (element && element.parentElement) {
        const messageError = element.parentElement.querySelector(".element-message-error");
        if (!messageError) return;
        if (esValido) {
            element.parentElement.classList.remove("element-container--invalid");
            messageError.innerHTML = "";
        } else {
            element.parentElement.classList.add("element-container--invalid");
            messageError.innerHTML = mostrarMensajeDeError(tipoDeElement, element);
        }
    }

}



const tipoErrores = [
    "valueMissing",
    "patternMismatch",
    "typeMismatch",
];

const mensajesDeError = {
    name: {
        valueMissing: "El campo nombre no puede estar vacío",
        patternMismatch: "Debe contener máximo 40 caracteres"
    },
    image: {
        valueMissing: "El campo imagen no puede estar vacío",
    },
    category: {
        valueMissing: "El campo categoría no puede estar vacío",
    },
    product: {
        valueMissing: "El campo nombre del producto no puede estar vacío",
        patternMismatch: "Debe contener máximo 20 caracteres"
    },
    price: {
        valueMissing: "El campo precio del producto no puede estar vacío",
    },
    description: {
        valueMissing: "El campo descripción no puede estar vacío",
        patternMismatch: "Debe contener máximo 150 caracteres"
    },
    email: {
        valueMissing: "El campo correo no puede estar vacío",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacío",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener al menos una letra minúscula, un número y no puede contener caracteres especiales."
    },
    message: {
        valueMissing: "El campo mensaje no puede estar vacío"
    },

}

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoErrores.forEach(error => {

        if (input.validity[error]) {
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}

