import { valida } from "../js/validaciones.js";
const myCallback = (event) =>{
    valida(event.target);
}

const inputs = document.querySelectorAll("input, textarea");

inputs.forEach(input => {
    input.addEventListener('blur', myCallback);
});


