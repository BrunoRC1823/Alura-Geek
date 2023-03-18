import { productosServices } from "../service/producto-service.js";
import { categoriasServices } from "../service/categoria-service.js";

const formulario = document.querySelector('[data-form]');

const obtenerId  = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get('id');
    return id;
}
const idP = await obtenerId();
console.log(idP);
const obtenerCategorias = async () => {
    try {
        const data = await categoriasServices.listaCategorias();
        return data ;
    } catch (error) {
        console.error('Error al obtener los datos del servidor', error);
        return null;
    }
};
const crearSelect = async () => {
    const select = document.createElement('select');
    select.classList.add('input-form');
    select.setAttribute('data-select', '');
    const categorias = await obtenerCategorias();
    const optionsHtml = categorias.map(categoria => `
    <option value="${categoria.id}" data-categoria>${categoria.nombre}</option>`).join('');
    select.innerHTML = `
    <option value="-1" disabled selected>[Seleccione]</option>
    ${optionsHtml}`; 
    return select;
}

const insertarSelect = async () => {
    const containerSelect = document.querySelector('[data-select-categoria-container]');
    const nuevoSelect = await crearSelect();
    containerSelect.insertAdjacentElement('beforeend', nuevoSelect);
};

insertarSelect();

const obtenerInfo = async () => {
    if (idP != null) {
        const urlI = document.querySelector('[data-tipo="url"]');
        const nom = document.querySelector('[data-tipo="producto"]');
        const precio = document.querySelector('[data-tipo="precio"]');
        const descr = document.querySelector('[data-tipo="descripcion"]');
        try {
            const producto = await productosServices.detalleProducto(idP);
            if (producto != null) {
                urlI.value = producto.url;
                nom.value = producto.nombre;
                precio.value = producto.precio;
                descr.value = producto.descripcion;
                const select = document.querySelector('[data-select]');
                const index = Array.from(select.options).findIndex(option => option.value === producto.categoria_id.toString());
                if (index !== -1) {
                    select.selectedIndex = index;
                }
            } else {
                throw new Error();
            }
        } catch (e) {
            console.log("Catch Error = " + e);
            alert("Hubo un error!")
        }
    }
};

obtenerInfo();

formulario.addEventListener('submit',  (evento) => {
    evento.preventDefault();
    const urlI = document.querySelector('[data-tipo="url"]').value;
    const select = document.querySelector('[data-select]');
    const cate = select.selectedOptions[0].value;
    const nom = document.querySelector('[data-tipo="producto"]').value;
    const precio = document.querySelector('[data-tipo="precio"]').value;
    const descr = document.querySelector('[data-tipo="descripcion"]').value;
    if(cate == -1){
        alert('seleccione una categoria!')
    }else{
        if (idP == null) {
            productosServices.crearProducto(nom, urlI, cate, precio, descr).then(() => {
                alert('Exito!');
            }).catch(() => alert('Error!'));
        } else {
            productosServices.actualizarProducto(nom, urlI, cate, precio, descr, idP).then(() => {
                alert('Exito!');
            }).catch(() => alert('Error!'));
        }
    }
});
