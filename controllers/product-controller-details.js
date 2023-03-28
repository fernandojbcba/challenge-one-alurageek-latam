import { productServices } from '../service/product-service.js'
import { createNewLine } from '../controllers/product-controller.js'

const productDetailsContent = (
    image,
    category,
    name,
    price,
    description,
    id
) => {
    let content = `
        <img class="product__img" src="${image}" alt="">
        <div class="product__details">
            <h2 class="product__name">${name}</h2>
            <h2 class="product__price">${price}</h2>
            <p class="product__description">${description}</p>
        </div>
    `
    return content
}
const productDetails = document.querySelector('[data-productdetails]')
const productSimilarItems = document.querySelector('[data-similaritems]')

const productId = new URL(window.location).searchParams.get('id')

productServices
    .detalleProductos(productId)
    .then(({ imagen, categoria, nombre, precio, descripcion, id }) => {
        const categoryId = category
        const newLine = productDetailsContent(
            imagen,
            categoria,
            nombre,
            precio,
            descripcion,
            id
        )
        productDetails.innerHTML = newLine

        productServices
            .ListaProductos()
            .then((data) => {
                data.forEach(
                    ({
                        imagen,
                        categoria,
                        nombre,
                        precio,
                        descripcion,
                        id,
                    }) => {
                        if (id != productId && categoryId === category) {
                            productSimilarItems.appendChild(
                                createNewLine(
                                    imagen,
                                    categoria,
                                    nombre,
                                    precio,
                                    descripcion,
                                    id
                                )
                            )
                        }
                    }
                )
            })
            .catch((error) => console.error('Ocurrio un error', error))
    })
    .catch((error) => console.error('Ocurrio un error', error))
