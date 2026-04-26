const input = document.getElementById('inputAltura');
const boton = document.getElementById('botonGenerar');
const resultado = document.getElementById('resultadoArbol');
const error = document.getElementById('mensajeError');

boton.addEventListener('click', () => {
    const altura = parseInt(input.value);
    
    resultado.textContent = "";
    error.textContent = "";

    if (!input.value || altura < 1) {
        error.textContent = "Error: El campo no puede estar vacío y debe ser mayor a 0";
        return;
    }

    let dibujo = "";
    for (let i = 1; i <= altura; i++) {
        dibujo += "*".repeat(i) + "\n";
    }
    
    resultado.textContent = dibujo;
});