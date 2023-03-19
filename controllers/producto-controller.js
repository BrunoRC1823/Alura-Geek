import { productosServices } from '../service/producto-service.js';
import { categoriasServices } from '../service/categoria-service.js';

const obtenerIdCate = () => {
    const url = new URL(window.location);
    const id = url.searchParams.get('categoria_id');
    return id;
}
const idCate = obtenerIdCate();
const modal = document.querySelector("[data-modal]");
const crearTitulo = (categoria) => {
    const tituloContainer = document.querySelector('[data-productos-titulo-container]');
    if (categoria != null) {
        const titulo = `<h1 class="titulo_productos">Todos los<a class="azul"> productos</a> de <a class="azul">${categoria}</a></h1>
        <a href="agregarProducto.html" class="button submit-button">Agregar producto</a>`
        tituloContainer.innerHTML = titulo;
    } else {
        const titulo = `<h1 class="titulo_productos">Todos los<a class="azul"> productos</a></a></h1>
        <a href="agregarProducto.html" class="button submit-button">Agregar producto</a>`
        tituloContainer.innerHTML = titulo;
    }
    return tituloContainer;
};

const CrearNuevoFila = (nombre, precio, url, id) => {
    const idReduce = id.toString().substring(0, 8);
    const fila = document.createElement('div');
    const contenido = `
        <div class="img_producto">
            <div class="mantenimiento_container">
                <i class="fa-solid fa-trash delete-icon" data-trashIcon></i>
                <a href='agregarProducto.html?id=${id}'><i class="fa-solid fa-pen edit-icon"></i></a>
            </div>
        </div>
        <div class="card-info">
            <p class="nombre_producto">${nombre}</p>
            <h4 class="precio_producto">$${precio}</h4>
            <p class="codigo_producto">#${idReduce}</p>
        </div>`
    fila.classList.add('card');
    fila.innerHTML = contenido;
    const imgProducto = fila.querySelector('.img_producto');
    imgProducto.style.background = `url(${url}) no-repeat center/cover`;
    const deleteIcon = fila.querySelector('[data-trashIcon]');
    deleteIcon.addEventListener('click', () => {
        crearContenidoModal(nombre, id);
    });
    return fila;
}
const limpiarModal = () => {
    const modalData = document.querySelector('[data-modal-data-container]');
    const buttonContainer = document.querySelector('[data-modal-button-container]');
    modalData.innerHTML = '';
    buttonContainer.innerHTML = '';
}
const crearContenidoModal = (producto, id) => {
    limpiarModal();
    const idReduce = id.toString().substring(0, 8)
    const modalData = document.querySelector('[data-modal-data-container]');
    const dataContainer = `<h2 class="modal__title">Eliminar</h2>
    <button class="modal__close" data-close><i class="fa-sharp fa-solid fa-xmark"></i></button>
    <p class="modal__text">¿Seguro que quiere <b class="negrita">eliminar</b> el producto?</p>
    <p class="modal__text-content" data-delete-nombre>Nombre:${producto}</p>
    <p class="modal__text-content">ID: #${idReduce}</p>`
    modalData.innerHTML = dataContainer;
    const dataButtonContainer = `
    <button class="modal__button button submit-button modal__button--confirm" type="submit" id=${id} data-delete>
    Si, estoy seguro</button>
    <button class="modal__button button" data-close>No, cancelar</button>`;
    const buttonContainer = document.querySelector('[data-modal-button-container]');
    buttonContainer.innerHTML = dataButtonContainer;
    const close = [];
    const mdc = modalData.querySelectorAll("[data-close]");
    const mbc = buttonContainer.querySelectorAll("[data-close]");
    close.push(mdc, mbc);
    close.forEach((nodo) => {
        nodo.forEach((cerrar) => {
            cerrar.addEventListener("click", () => {
                modal.style.display = "none";
            });
        });
    });
    eliminarProducto(buttonContainer);
};

const CrearListas = async () => {
    const cards = document.querySelector('[data-cards]');
    if (idCate == null) {
        const data = await productosServices.listaProductos();
        crearTitulo(null);
        data.forEach(({ nombre, precio, url, id }) => {
            const nuevaFila = CrearNuevoFila(nombre, precio, url, id);
            cards.appendChild(nuevaFila);
        });
    } else {
        const dataCate = await categoriasServices.detalleCategoria(idCate);
        crearTitulo(dataCate.nombre);
        const dataProd = await productosServices.listaProductosCate(idCate);
        dataProd.forEach(({ nombre, precio, url, id }) => {
            const nuevaFila = CrearNuevoFila(nombre, precio, url, id);
            cards.appendChild(nuevaFila);
        });
    };
};
CrearListas();

const eliminarProducto = (fila) => {
    const trash = fila.querySelector('[data-delete]');
    trash.addEventListener('click', (event) => {
        event.preventDefault();
        const id = trash.id;
        productosServices.eliminarProducto(id).then(() => {
            location.reload();
        }).catch((e) => console.log(e));
    });
}