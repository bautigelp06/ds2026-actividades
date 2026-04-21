function calcularPrecioFinal(monto, medioPago) {
    let descuento = 0;

    if (monto < 200) {
        descuento = 0;
    } 
    else if (monto >= 200 && monto <= 400) {
        
        if (medioPago === "E") {
            descuento = 0.3; 
        } else if (medioPago === "D") {
            descuento = 0.2; 
        } else if (medioPago === "C") {
            descuento = 0.1; 
        }
    } 
    else {
       
        descuento = 0.4; 
    }

    const montoDescontado = monto * descuento;
    const precioFinal = monto - montoDescontado;

   
    console.log(`Monto: $${monto} | Pago: ${medioPago} | Final: $${precioFinal}`);
}


calcularPrecioFinal(150, "E"); 
calcularPrecioFinal(300, "E"); 
calcularPrecioFinal(300, "C"); 
calcularPrecioFinal(500, "D");
calcularPrecioFinal(400, "C");