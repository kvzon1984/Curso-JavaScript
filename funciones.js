function saludar(nombre) {
    console.log(`hola ${nombre}`);
}

saludar('Juan')

const hola = (nombre) => console.log(`Hola ${nombre}`);

hola('Lucas ')

// Callback

function sumar(a, b, cb) {
    const r = a + b

    cb(r)

}

function callback(result) {
    return console.log('Resultado: ', result);
}
// AL LLAMAR A LA FUNCION SUMAR EL CALLBACK NO LE PASO LOS PARENTESIS PARA QUE NO SE
// EJECUTE SINO QUE SE EJECUTARA DENTRO DE LA FUNCION SOLO SE HACE REFERENCIA

sumar(2, 3, callback)
