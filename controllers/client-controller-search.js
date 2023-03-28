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
            let nombresesion = ""
            data.forEach(({ email, password, id ,nombre}) => {
                if (email == inputEmail && password == inputPassword) {
                    userFound = true;
                    nombresesion = nombre;
                    return
                }
            })
            if (userFound) {
                localStorage.setItem('email', inputEmail)
                localStorage.setItem('nombrex', nombresesion)
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
