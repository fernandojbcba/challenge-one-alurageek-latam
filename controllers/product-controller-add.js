import { productServices } from '../service/product-service.js'
const form = document.querySelector('[data-form]')

form.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const url = new URL(window.location)
    const image = document.querySelector('[data-image]')
    if (!image.files || !image.files[0]) {
        return
    }

    const fileReader = new FileReader()

    fileReader.addEventListener('load', (event) => {
        const imageData = event.target.result
        const categoria = document.querySelector('[data-category]').value
        const nombre = document.querySelector('[data-name]').value
        const precio = document.querySelector('[data-price]').value
        const descripcion = document.querySelector('[data-description]').value
        productServices
            .addProduct(imageData, categoria, nombre, precio, descripcion, id)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    text: 'Producto agregado existosamente!',
                }).then(() => {
                    window.location.assign(
                        `${
                            window.location.href.includes('alurageek')
                                ? '/alurageek/'
                                : ''
                        }products.html`
                    )
                })
            })
            .catch((err) => console.error(err))
    })
    fileReader.readAsDataURL(image.files[0])
})
