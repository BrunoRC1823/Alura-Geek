import { productosServices } from "../service/producto-service.js";

const obtenerId = () => {
    const url = new URL(window.location);
    const id = url.searchParams.get('id');
    return id;
}

const crearNuevaSeccion = (nombre, precio, url, descripcion) => {
    const seccion = document.createElement('section');
    const contenido = `
    <div class="img_producto img_producto-descripcion"></div>
    <div class="descripcion_container">
        <h1 class="nombre_producto-titulo">${nombre}</h1>
        <h4 class="precio_producto">$${precio}</h4>
        <p class="descripcion_producto">${descripcion}</p>
    </div>`
    seccion.classList.add('producto_section');
    seccion.innerHTML = contenido;
    const imgProducto = seccion.querySelector('.img_producto');
    imgProducto.style.background = `url(${url}) no-repeat center/cover`;
    return seccion;
}
const CrearNuevoFila = (nombre, precio, url, id) => {
    const fila = document.createElement('div');
    const contenido = `
        <div class="img_producto">
        </div>
        <div class="card-info">
            <p class="nombre_producto">${nombre}</p>
            <h4 class="precio_producto">$${precio}</h4>
            <a href="producto.html?id=${id}" class="info-button">Ver Producto</a>
        </div>`
    fila.classList.add('card');
    fila.innerHTML = contenido;
    const imgProducto = fila.querySelector('.img_producto');
    imgProducto.style.background = `url(${url}) no-repeat center/cover`;
    return fila;
}

const main = document.querySelector('[data-main]');

const obtenerProducto = async (id) => {
    try {
        const data = await productosServices.detalleProducto(id);
        return { nombre: data.nombre, precio: data.precio, url: data.url, descripcion: data.descripcion, categoria_id: data.categoria_id };
    } catch (error) {
        console.error('Error al obtener los datos del servidor', error);
        return null;
    }
};
const insertarNuevaSeccion = (nombre, precio, url, descripcion) => {
    const nuevaSeccion = crearNuevaSeccion(nombre, precio, url, descripcion);
    main.insertBefore(nuevaSeccion, main.firstChild);
};

const cards = document.querySelector('[data-cards]');
const obtenerInfo = (id) => {
    if (id != null) {
        obtenerProducto(id).then((data) => {
            if (data) {
                insertarNuevaSeccion(data.nombre, data.precio, data.url, data.descripcion);
                productosServices.listaProductosCate(data.categoria_id).then((data) => {
                    data.forEach(({ nombre, precio, url, id }) => {
                        const nuevaFila = CrearNuevoFila(nombre, precio, url, id);
                        cards.appendChild(nuevaFila);
                    });
                });
            }
        });
    }
};

obtenerInfo(obtenerId());
