"use strict";
const listaUl = document.getElementById('lista-usuarios');
const pCargando = document.getElementById('cargando');
const divError = document.getElementById('error');
async function obtenerUsuarios() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok)
        throw new Error();
    return await res.json();
}
async function renderizarUsuarios() {
    pCargando.style.display = 'block';
    divError.style.display = 'none';
    try {
        const usuarios = await obtenerUsuarios();
        usuarios.forEach(u => {
            const li = document.createElement('li');
            li.textContent = `${u.name} (${u.email})`;
            listaUl.appendChild(li);
        });
    }
    catch {
        divError.innerText = "Error al cargar datos";
        divError.style.display = 'block';
    }
    finally {
        pCargando.style.display = 'none';
    }
}
renderizarUsuarios();
