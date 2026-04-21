function clasificarNota(nota) {
    if (nota < 4) {
        return "Desaprobado";
    } else if (nota >= 4 && nota <= 7) {
        return "Aprobado";
    } else {
        return "Promocionado";
    }
}


console.log("Nota 3:", clasificarNota(3)); 
console.log("Nota 6:", clasificarNota(6)); 
console.log("Nota 9:", clasificarNota(9));  




function queDiaEs(numero) {
    switch (numero) {
        case 1: return "Lunes";
        case 2: return "Martes";
        case 3: return "Miércoles";
        case 4: return "Jueves";
        case 5: return "Viernes";
        case 6: return "Sábado (Es fin de semana)";
        case 7: return "Domingo (Es fin de semana)";
        default: return "Número inválido. Ingresá del 1 al 7 para devolver un dia de la semana.";
    }
}

console.log("Día 2:", queDiaEs(2));
console.log("Día 6:", queDiaEs(6)); 
console.log("Día 10:", queDiaEs(10)); 