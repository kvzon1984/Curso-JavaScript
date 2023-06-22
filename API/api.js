const express = require('express');
const user = require('./user.controller')

const app = express()

const port = 3000

app.use(express.json())

app.get('/users', user.list)

app.get('/users/:id', user.get)

app.post('/users', user.create)

app.put('/users/:id', user.update)

app.patch('/users/:id', user.update)

app.delete('/users/:id', user.destroy)

app.use(express.static('app'))
app.get('/', (req, res) => {
    console.log(__dirname);
    res.sendFile(`${__dirname}/index.html`)
})

//Siempre debe ser al final
app.get('*', (req, res) => {
    res.status(404).send('Esta pagina no existe.')
})

app.listen(port, () => {
    console.log('Arrancando aplicacion con express');
})

