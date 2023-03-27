const productsList = () =>
    fetch('https://alurageekserver.onrender.com/productos').then((respuesta) =>
        respuesta.json()
    )
const addProduct = (imagen, categoria, nombre, precio, descripcion) => {
    return fetch('https://alurageekserver.onrender.com/productos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            imagen,
            categoria,
            nombre,
            precio,
            descripcion,
            id: uuid.v4(),
        }),
    })
}

const eliminarProductos = (id) => {
    return fetch(`https://alurageekserver.onrender.com/productos/${id}`, {
        method: 'DELETE',
    })
}
const detalleProductos = (id) => {
    return fetch(`https://alurageekserver.onrender.com/productos/${id}`).then(
        (respuesta) => respuesta.json()
    )
}
const buscarproductos = (name) => {
    return fetch(
        `https://alurageekserver.onrender.com/productos?q=${name}`
    ).then((respuesta) => respuesta.json())
}

const editarProducto = (imagen, categoria, nombre, precio, descripcion, id) => {
    return fetch(`https://alurageekserver.onrender.com/productos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            imagen,
            categoria,
            nombre,
            precio,
            descripcion,
        }),
    })
        .then((respuesta) => respuesta)
        .catch((err) => console.error('ha ocurrido un error', err))
}
export const productServices = {
    productsList,
    addProduct,
    eliminarProductos,
    detalleProductos,
    editarProducto,
    buscarproductos,
}
