const formulario = document.querySelector('[data-form]')

if (formulario) {
    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault()
        const reg_nombre = document.querySelector('[data-nombre]').value
        const reg_email = document.querySelector('[data-email]').value
        const reg_pass = document.querySelector('[data-password]').value

        CrearUsuario(reg_nombre, reg_email, reg_pass)
            .then((response) => console.log(response))
            .catch(console.log)
    })
}

const listarClientes = () =>
    fetch(`https://alurageekserver.onrender.com/usuario`).then((respuesta) =>
        respuesta.json()
    )

const CrearUsuario = (nombre, email, password) => {
    return fetch(`https://alurageekserver.onrender.com/usuario`, {
        method: 'POST',
        body: JSON.stringify({
            nombre: nombre,
            email: email,
            password: password,
            id: uuid.v4(),
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8 ',
        },
    })
}

const eliminarUsuario = (id) => {
    return fetch(`https://alurageekserver.onrender.com/usuario/${id}`, {
        method: 'DELETE',
    })
}
const detalleUsuario = (id) => {
    return fetch(`https://alurageekserver.onrender.com/usuario/${id}`).then(
        (respuesta) => respuesta.json()
    )
}
const editarUsuario = (nombre, email, password, id) => {
    return fetch(`https://alurageekserver.onrender.com/usuario/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombre: nombre,
            email: email,
            password: password,
        }),
    })
        .then((respuesta) => respuesta)
        .catch((err) => console.error('ha ocurrido un error'))
}
export const clientServices = {
    CrearUsuario,
    listarClientes,
    eliminarUsuario,
    editarUsuario,
    detalleUsuario,
}
