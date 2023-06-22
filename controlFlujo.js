// If

if (false) {
    console.log('Entro al if')
} else {
    console.log('Entro al else')
}

// While

let i = 1
while (i <= 5) {
    console.log(i);
    i++
}
console.log(6);

// switch

switch (i) {
    case 1:
        console.log('El valor es 1');
        break

    case 2:
        console.log('El valor es 2');
        break

    case 3:
        console.log('El valor es 3');
        break

    case 4:
        console.log('El valor es 4');
        break

    case 5:
        console.log('El valor es 5');
        break

    case 6:
        console.log('El valor es 6');
        break

    default:
        console.log('es otro numero');
}

// For

for (let j = 0; j < 9; j++) {
    console.log('FOR:', j);
    
}


const nombres = ['Luis', 'Juan', 'Pedro', "lucas"]

nombres.forEach(element => {
    console.log(element);
});