import { clientServices } from '../service/client-service.js'

const form = document.querySelector('[data-login]')

form.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const inputEmail = document.querySelector('[data-email]').value
    const inputPassword = document.querySelector('[data-password]').value

    clientServices
        .listarClientes()
        .then((data) => {
            let userFound = false
            data.forEach(({ email, password, id ,nombre}) => {
                if (email == inputEmail && password == inputPassword) {
                    userFound = true
                    var nombreSesion = nombre
                    return
                }
            })
            if (userFound) {
                localStorage.setItem('email', inputEmail)
                consosle.log(nombreSesion)
                window.location.assign(`/`)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Correo y/o contraseña incorrecta!',
                })
            }
        })
        .catch((error) => console.error('Ocurrio un error', error))
    form.reset()
})
