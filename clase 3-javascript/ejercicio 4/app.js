const arregloNumeros = [12, 5, 8, 21, 3, 10];
let suma = 0;
let mayor = arregloNumeros[0];
let menor = arregloNumeros[0];

for (let i = 0; i < arregloNumeros.length; i++) {
    suma += arregloNumeros[i];
    
    if (arregloNumeros[i] > mayor) {
        mayor = arregloNumeros[i];
    }
    
    if (arregloNumeros[i] < menor) {
        menor = arregloNumeros[i];
    }
}

const promedio = suma / arregloNumeros.length;

console.log("Suma:", suma);
console.log("Promedio:", promedio);
console.log("Numero mayor:", mayor);
console.log("Numero menor:", menor);

function asteriscos(n) {
    let cadena = "";
    for (let i = 0; i < n; i++) {
        cadena += "*";
    }
    return cadena;
}

console.log(asteriscos(5));
console.log(asteriscos(10));