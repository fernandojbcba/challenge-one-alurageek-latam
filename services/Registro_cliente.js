const reg_nombre = document.querySelector('#registro__container__name')
const reg_email = document.querySelector('#registro__container__email')
const reg_pass = document.querySelector('#registro__container__password')

const reg_buttom = document.querySelector('#registro__container__button')

const listaClientes = async () => {
    const peticion = await fetch(
        'https://my-json-server.typicode.com/fernandojbcba/challenge-one-alurageek-latam/usuario'
    )

    const datos = await peticion.json()
    console.log(typeof datos)
}

const CrearUsuario = (nombre, email, password) => {
    return fetch(
        'https://my-json-server.typicode.com/fernandojbcba/challenge-one-alurageek-latam/',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, email, id: uuid.v4() }),
        }
    )
}

export const clientServices = {
    listaClientes,
    CrearUsuario,
}
CrearUsuario('fernando', 'fer@fer.com', '123')
