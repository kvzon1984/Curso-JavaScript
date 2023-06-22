const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://KvzonVega:admin123456@cluster0.mxrymo4.mongodb.net/?retryWrites=true&w=majority')

// contruir el modelo (el nombre de la tabla, la forma)
const Users = mongoose.model('Users', {
    name: {type:String, required: true, minLength: 3},
    lastname: {type:String, required: true, minLength: 3}
})

module.exports = Users

