const listaProductos = async () => {
    try{
        return await fetch("http://localhost:3000/producto").then((respuesta) => respuesta.json());
    }catch(e){
        alert('Ocurrio un error! '+e);
    }
}

const listaProductosCate = async (idCate) => {
    try {
        return await fetch(`http://localhost:3000/producto?categoria_id=${idCate}`)
        .then((respuesta) => respuesta.json());
    } catch {
        alert('Ocurrió un error!');
    }
}

const eliminarProducto = async (id) => {
    try{
        return await fetch(`http://localhost:3000/producto/${id}`, {
            method: "DELETE",
        });
    }catch(e){
        alert('Error al eliminar! '+e)
    }

};

const actualizarProducto = async (nombre,url,categoria_id, precio,descripcion, id) => {
    try {
        return await fetch(`http://localhost:3000/producto/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({nombre,url,categoria_id, precio,descripcion}),
        });
    } catch (e) {
        console.log("Catch Error = "+ e);
        alert("Hubo un error!")
    };
};
const detalleProducto = (id) => {
    return fetch(`http://localhost:3000/producto/${id}`).then((response) => response.json());
};
const crearProducto= (nombre,url,categoria, precio,descripcion) => {
    return fetch("http://localhost:3000/producto", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ nombre,url,categoria, precio,descripcion, id: uuid.v4() }),
    });
}
export const productosServices = {
    listaProductos,
    eliminarProducto,
    actualizarProducto,
    detalleProducto,
    crearProducto,
    listaProductosCate
}