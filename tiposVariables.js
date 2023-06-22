console.log('Hola Mundo')

// Tipo de datos

// String
const texto = 'Hola'
console.log(texto)
// Number
const numero = 12
console.log(numero);
// Boolean
const activado = false
console.log(activado);
// Null
const nulo = null
console.log(nulo);
// Undefined
const indefinido = undefined
console.log(indefinido);
// Object
const objeto = {
    unNumero: 12,
    unString: 'Hola mundo',
    unaCondicion: true,
}

console.log(objeto);
console.log(objeto.unString);

// Array
const array = [
    1,2,3,'hola',false, objeto
]

console.log(array);
console.log(array[5].unString);

array.push('soy un string')

console.log(array);