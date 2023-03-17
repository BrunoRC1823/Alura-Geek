import { productosServices } from '../service/producto-service.js';
import { categoriasServices } from '../service/categoria-service.js';

const sectionCards = document.querySelector('[data-section-cards]');
const CrearNuevoTituloFila = (categoria,id) => {
    const container = document.createElement('div');
    const contenido = `
        <h2 class="titulo_categoria">${categoria}</h2>
        <div class="ver_todo center flex">
            <a class="info-button">Ver todo</a>
            <i class="fa-solid fa-arrow-right logo_ver-todo"></i>
        </div>`
    container.classList.add('categoria_titulo-container');
    container.classList.add('container');
    container.innerHTML = contenido;
    const verTodo = container.querySelector('.ver_todo');
    verTodo.addEventListener('click', () => {
        window.location.href = `/producto-lista.html?categoria_id=${id}`;
    })
    return container;
}
const CrearNuevoFila = (nombre, precio, url, id) => {
    const fila = document.createElement('div');
    const contenido = `
        <div class="img_producto"></div>
        <div class="card-info">
            <p class="nombre_producto">${nombre}</p>
            <h4 class="precio_producto">$${precio}</h4>
            <a href="../producto.html?id=${id}" class="info-button">Ver Producto</a>
        </div>`
    fila.classList.add('card');
    fila.innerHTML = contenido;
    const imgProducto = fila.querySelector('.img_producto');
    imgProducto.style.background = `url(${url}) no-repeat center/cover`;
    return fila;
};

const cargarProductosPorCategoria = async () => {
    try {
        const categorias = await categoriasServices.listaCategorias();
        const CategoriasPromises = categorias.map(async (categoria) => {
            const productos = await productosServices.listaProductosCate(categoria.id);
            return { categoria, productos };
        });
        const productosPorCategoria = await Promise.all(CategoriasPromises);
        productosPorCategoria.forEach(({ categoria, productos }) => {
            const nuevaCate = CrearNuevoTituloFila(categoria.nombre,categoria.id);
            sectionCards.appendChild(nuevaCate);
            const cards = document.createElement('div');
            cards.classList.add('cards');
            sectionCards.appendChild(cards);
            productos.forEach(({ nombre, precio, url, id }) => {
                const nuevaFila = CrearNuevoFila(nombre, precio, url, id);
                cards.appendChild(nuevaFila);
            });
        });
    } catch (e) {
        console.error(e);
        alert('Ocurrió un error!');
    }
};
cargarProductosPorCategoria();