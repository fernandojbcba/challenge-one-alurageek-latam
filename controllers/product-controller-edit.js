import { productServices } from '../service/product-service.js'

const formulario = document.querySelector('[data-form]')

async function dataUrlToFile(dataUrl, fileName) {
    const res = await fetch(dataUrl)
    const blob = await res.blob()
    return new File([blob], fileName, { type: 'image/png' })
}

const getInformation = async () => {
    const url = new URL(window.location)
    const id = url.searchParams.get('id')

    if (id == null) {
        console.error('Ha ocurrido un error')
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un problema!',
        })
    }

    const imagen = document.querySelector('[data-image]')
    const categoria = document.querySelector('[data-category]')
    const nombre = document.querySelector('[data-name]')
    const precio = document.querySelector('[data-price]')
    const descripcion = document.querySelector('[data-description]')
    try {
        const product = await productServices.detalleProductos(id)
        if (
            product.imagen &&
            product.categoria &&
            product.nombre &&
            product.precio &&
            product.description
        ) {
            categoria.value = product.categoria
            nombre.value = product.nombre
            precio.value = product.precio
            descripcion.value = product.descripcion
        } else {
            throw new Error()
        }

        dataUrlToFile(product.imagen, 'imagen.png').then((imageFile) => {
            const dataTransfer = new DataTransfer()
            dataTransfer.items.add(imageFile)
            imagen.files = dataTransfer.files
            document.getElementById('new__product__image__preview').src =
                URL.createObjectURL(imagen.files[0])
        })
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un problema!',
        })
        console.error('Ha ocurrido un error', error)
    }
}

getInformation()

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const url = new URL(window.location)
    const id = url.searchParams.get('id')
    const image = document.querySelector('[data-image]')

    const category = document.querySelector('[data-category]').value
    const productName = document.querySelector('[data-name]').value
    const price = document.querySelector('[data-price]').value
    const description = document.querySelector('[data-description]').value

    const fileReader = new FileReader()

    fileReader.addEventListener('load', (event) => {
        const imageData = event.target.result

        productServices
            .editarProducto(
                imageData,
                category,
                productName,
                price,
                description,
                id
            )
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    text: 'Edición completada!',
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
    })
    fileReader.readAsDataURL(image.files[0])
})
