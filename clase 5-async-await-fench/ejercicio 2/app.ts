interface Usuario {
    id: number;
    name: string;
    email: string;
    phone: string;
}

const listaUl = document.getElementById('lista-usuarios') as HTMLUListElement;
const pCargando = document.getElementById('cargando') as HTMLParagraphElement;
const divError = document.getElementById('error') as HTMLDivElement;

async function obtenerUsuarios(): Promise<Usuario[]> {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) throw new Error();
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
    } catch {
        divError.innerText = "Error al cargar datos";
        divError.style.display = 'block';
    } finally {
        pCargando.style.display = 'none';
    }
}

renderizarUsuarios();