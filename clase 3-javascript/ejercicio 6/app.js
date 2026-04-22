const input = document.getElementById('inputProducto');
const boton = document.getElementById('botonAgregar');
const lista = document.getElementById('listaProductos');
const txtContador = document.querySelector('#txtContador strong');

let cantidad = 0;

boton.addEventListener('click', () => {
    const nombreProducto = input.value.trim();

    if (nombreProducto === "") {
        alert("Por favor, escribí un producto");
        return;
    }

    const li = document.createElement('li');
    li.innerHTML = `
        <span>${nombreProducto}</span>
        <button class="boton-borrar">Eliminar</button>
    `;

    li.querySelector('.boton-borrar').addEventListener('click', () => {
        li.remove();
        cantidad--;
        actualizarContador();
    });


    lista.appendChild(li);
    cantidad++;
    actualizarContador();
    input.value = "";
    input.focus();
});

function actualizarContador() {
    txtContador.textContent = cantidad;
}