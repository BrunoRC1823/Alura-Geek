const listaCategorias = async () => {
    try{
        return await fetch("http://localhost:3000/categoria").then((respuesta) => respuesta.json());
    }catch(e){
        alert('Ocurrio un error! '+e);
    }
}
const detalleCategoria = (id) => {
    return fetch(`http://localhost:3000/categoria/${id}`).then((response) => response.json());
};
export const categoriasServices = {
    listaCategorias,
    detalleCategoria
}