import { productServices } from "../service/product-service.js";
import {createNewLine} from "../controllers/product-controller.js";



const showMessage = () => {

    const line = document.createElement("div");
    let content =
        `
            <span class="search-message-error" style="display:flex; justify-content: center; font-size: 22px; color: #FF2400">No se encontraron coincidencias</span>

            `;
    line.innerHTML = content;
    return line;

}

const searchForm = document.querySelector("[data-search]");
const product = document.querySelector("[data-similar]");
const url = new URL(window.location);

if ( url.href.includes("search-product")) {
    const q = url.searchParams.get("q");

    product.innerHTML = "";
    if (!q) {
        product.appendChild(showMessage());
    } else {
        productServices.searchProducts(q).then((data) => {
            if (data != "") {
                data.forEach(({ image, category, name, price, description, id }) => {
                    const newLine = createNewLine(image, category, name, price, description, id);
                    product.appendChild(newLine);
                });
            } else {
                product.appendChild(showMessage());
            }
        });
    }
}


searchForm.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const name = document.querySelector("[data-searchinput]").value;
    if (url.href.includes("search-product")) {
        product.innerHTML = "";

        productServices.searchProducts(name).then((data) => {
            if (data != "") {
                data.forEach(({ image, category, name, price, description, id }) => {
                    const newLine = createNewLine(image, category, name, price, description, id);
                    product.appendChild(newLine);
                });
            } else {
                product.appendChild(showMessage());
            }

        });
    } else {
        window.location.assign(`${url.href.includes("alurageek") ? "/alurageek" : ""}/search-product.html?q=${name}`);
    }

});
