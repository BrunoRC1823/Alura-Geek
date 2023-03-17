import { productosServices } from '../service/producto-service.js';
import { categoriasServices } from '../service/categoria-service.js';

const obtenerId = () => {
    const url = new URL(window.location);
    const id = url.searchParams.get('categoria_id');
    return id;
}
const crearTitulo = (categoria) => {
    const tituloContainer = document.querySelector('[data-productos-titulo-container]');
    if(categoria != null){
        const titulo = `<h1 class="titulo_productos">Todos los<a class="azul"> productos</a> de <a class="azul">${categoria}</a></h1>
        <a href="agregarProducto.html" class="button submit-button">Agregar producto</a>`
        tituloContainer.innerHTML = titulo;
    }else{
        const titulo = `<h1 class="titulo_productos">Todos los<a class="azul"> productos</a></a></h1>
        <a href="agregarProducto.html" class="button submit-button">Agregar producto</a>`
        tituloContainer.innerHTML = titulo;
    }
    return tituloContainer;
};

const CrearNuevoFila = (nombre, precio, url, id) => {
    const idReduce = id.toString().substring(0, 8)
    const fila = document.createElement('div');
    const contenido = `
        <div class="img_producto">
            <div class="mantenimiento_container">
                <i class="fa-solid fa-trash delete-icon" id=${id} data-trashIcon></i>
                <a href='../agregarProducto.html?id=${id}'><i class="fa-solid fa-pen edit-icon"></i></a>
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
    const trash = fila.querySelector('[data-trashIcon]');
    trash.addEventListener('click', () => {
        const id = trash.id;
        productosServices.eliminarProducto(id).then(() => {
        }).catch((e) => console.log(e));
    });
    return fila;
}
const cards = document.querySelector('[data-cards]');

if (obtenerId() == null) {
    productosServices.listaProductos().then((data) => {
        crearTitulo(null);
        data.forEach(({ nombre, precio, url, id }) => {
            const nuevaFila = CrearNuevoFila(nombre, precio, url, id);
            cards.appendChild(nuevaFila);
        });
    });
} else {
    categoriasServices.detalleCategoria(obtenerId()).then((data) => {
        crearTitulo(data.nombre);
    });
    productosServices.listaProductosCate(obtenerId()).then((data) => {
        data.forEach(({ nombre, precio, url, id }) => {
            const nuevaFila = CrearNuevoFila(nombre, precio, url, id);
            cards.appendChild(nuevaFila);
        });
    });
};
