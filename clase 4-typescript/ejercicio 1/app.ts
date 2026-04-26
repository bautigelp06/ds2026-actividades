const input = document.getElementById('inputAltura') as HTMLInputElement;
const boton = document.getElementById('botonGenerar') as HTMLButtonElement;
const resultado = document.getElementById('resultadoArbol') as HTMLElement;
const error = document.getElementById('mensajeError') as HTMLElement;


function generarArboles(altura: number): string {
    let dibujo: string = "";
    for (let i = 1; i <= altura; i++) {
        dibujo += "*".repeat(i) + "\n";
    }
    return dibujo;
}

boton.addEventListener('click', () => {

    const altura: number = parseInt(input.value);
    
  
    resultado.textContent = "";
    error.textContent = "";

    if (!input.value || altura < 1) {
        error.textContent = "Error: El campo no puede estar vacío y debe ser mayor a 0";
        return;
    }

    resultado.textContent = generarArbol(altura);
});