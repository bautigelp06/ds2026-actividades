"use strict";
async function obtenerUsuarios() {
    try {
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!respuesta.ok) {
            throw new Error('Error en la petición');
        }
        const datos = await respuesta.json();
        return datos;
    }
    catch (error) {
        console.error("Hubo un problema:", error);
        throw error;
    }
}
async function ejecutar() {
    try {
        const usuarios = await obtenerUsuarios();
        usuarios.forEach(u => {
            console.log(`Nombre: ${u.name} | Email: ${u.email}`);
        });
    }
    catch (e) {
        console.log("No se pudieron mostrar los usuarios.");
    }
}
ejecutar();
