// mongodb+srv://KvzonVega:<password>@cluster0.mxrymo4.mongodb.net/?retryWrites=true&w=majority

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://KvzonVega:admin123456@cluster0.mxrymo4.mongodb.net/?retryWrites=true&w=majority')

// contruir el modelo (el nombre de la tabla, la forma)
const User = mongoose.model('User', {
    username: String,
    edad: Number,
})

const crear = async () => {
    const user = new User({ username: 'Pedro', edad: 30 })
    const saveUser = await user.save()

    console.log(saveUser);
}

const buscarTodo = async () => {
    const users = await User.find()
    console.log(users);
}

const buscar = async () => {
    const user = await User.find({username: 'Carla'})
    console.log(user);
}

const buscarUno = async () => {
    const user = await User.findOne({username: 'kvzon'})
    console.log(user);
}

const actualizar = async () => {
    const user = await User.findOne({ username: 'kvzon' })
    console.log(user);
    user.edad = 40
    await user.save()
    console.log(user);
}

const eliminar = async () => {
    await User.deleteOne({ username: 'Pedro' })

    // const user = await User.findOne({ username: 'Luis' })
    // console.log(user);
    // if (user) {
    //     await user.deleteOne()
    // } else {
    //     console.log('Usuario no existe');
    // }
}

// crear()
buscarTodo()
// buscar()
// buscarUno()
// actualizar()
// eliminar()