const formulario = document.querySelector('[data-form]')

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const reg_nombre = document.querySelector('[data-nombre]').value
    const reg_email = document.querySelector('[data-email]').value
    const reg_pass = document.querySelector('[data-password]').value

    CrearUsuario(reg_nombre, reg_email, reg_pass)
        .then((response) => console.log(response))
        .catch(console.log)
})

const listaClientes = async () => {
    const peticion = await fetch(
        'https://my-json-server.typicode.com/fernandojbcba/challenge-one-alurageek-latam/usuario'
    )

    const datos = await peticion.json()
}

const CrearUsuario = (nombre, email, password) => {
    return fetch(
        'https://my-json-server.typicode.com/fernandojbcba/challenge-one-alurageek-latam/usuario',
        {
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
        }
    )
}
