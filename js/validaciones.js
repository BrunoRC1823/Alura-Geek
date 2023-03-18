export const valida = (input) => {
    const tipoInput = input.dataset.tipo;
    if (input.validity.valid && input.value !== '-1') {
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoInput, input);
    }
};
const tipoError = [
    "valueMissing",
    "patternMismatch"
];

const mensajeError = {
    url: {
        valueMissing: "Este campo no puede estar vacío"
    },
    producto: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El nombre del producto debe contener desde 4 a 25 caracteres!"
    },
    precio: {
        valueMissing: "Este campo no puede estar vacío",
    },
    descripcion: {
        valueMissing: "Este campo no puede estar vacío"
    }
}

const mostrarMensajeError = (tipoInput, input) => {
    let mensaje = "";
    tipoError.forEach(error => {
        if (input.validity[error]) {
            mensaje = mensajeError[tipoInput][error];
        }
    });
    return mensaje;
}