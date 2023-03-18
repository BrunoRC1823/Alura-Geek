import { valida } from "../js/validaciones.js";
const myCallback = (event) => {
    valida(event.target);
}

const inputs = document.querySelectorAll("input, textarea");

inputs.forEach(input => {
    input.addEventListener('blur', myCallback);
});

const modal = document.querySelector("[data-modal]");
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const trashIcon = document.querySelectorAll('[data-trashIcon]');
        if (trashIcon) {
            trashIcon.forEach((abrir) => {
                abrir.addEventListener("click", () => {
                    modal.style.display = "flex";
                });
            });
        }
    }, 100);
});
