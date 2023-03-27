import { productServices } from "../service/product-service.js";

const formulario = document.querySelector("[data-form]");

async function dataUrlToFile(dataUrl, fileName) {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return new File([blob], fileName, { type: 'image/png' });
}

const getInformation = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    if (id == null) {
        console.error("Ha ocurrido un error");
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un problema!'
        })
    }

    const image = document.querySelector("[data-image]");
    const category = document.querySelector("[data-category]");
    const name = document.querySelector("[data-name]");
    const price = document.querySelector("[data-price]");
    const description = document.querySelector("[data-description]");
    try {
        const product = await productServices.productDetails(id);
        if (product.image && product.category
            && product.name && product.price
            && product.description) {
            category.value = product.category;
            name.value = product.name;
            price.value = product.price;
            description.value = product.description;
        } else {
            throw new Error();
        }

        dataUrlToFile(product.image, "imagen.png").then((imageFile) => {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(imageFile);
            image.files = dataTransfer.files;
            document.getElementById("new__product__image__preview").src = URL.createObjectURL(image.files[0]);
        })

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un problema!'
        })
        console.error("Ha ocurrido un error", error);
    }

}

getInformation();


formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    const image = document.querySelector("[data-image]");

    const category = document.querySelector("[data-category]").value;
    const productName = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const description = document.querySelector("[data-description]").value;

    const fileReader = new FileReader();

    fileReader.addEventListener("load", (event) => {
        const imageData = event.target.result;

        productServices.editProduct(imageData, category, productName, price, description, id).then(() => {
            Swal.fire({
                icon: 'success',
                text: 'Edición completada!'
            }).then(() => {
                window.location.assign(`${window.location.href.includes("alurageek") ? "/alurageek/" : ""}products.html`);
            });
        });

    });
    fileReader.readAsDataURL(image.files[0]);

});

