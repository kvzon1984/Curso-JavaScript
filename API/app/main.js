const loadInitialTemplate = () => {
    const template = `
    <h1>Usuarios</h1>
    <form id="user-form">
        <div>
            <label>Nombre</label>
            <Input name="name" type="text"></Input>
        </div>
        <div>
            <label>apellido</label>
            <Input name="lastname" type="text"></Input>
        </div>
        <button type="submit">Enviar</button>
    </form>
    <ul id="user-list">
    </ul>
    `

    const body = document.getElementsByTagName('body')[0]
    body.innerHTML = template
}

const getUsers = async () => {
    const response = await fetch('/users') // se debe transformar en un .json()
    const users = await response.json()
    const template = user => `
    <li>
        ${user.name} ${user.lastname} <button id="${user._id}">Eliminar</button>
    </li>
    `

    const ul = document.getElementById('user-list')
    ul.innerHTML = users.map(user => template(user)).join('')

    users.forEach(user => {
        const userBoton = document.getElementById(`${user._id}`)
        userBoton.addEventListener('click', () => {
            fetch(`/users/${user._id}`, {
                method: 'DELETE'
            })
            userBoton.parentNode.remove()
            alert('Eliminado con exito')
        })
    });

}

const addFormListener = () => {
    const formulario = document.getElementById('user-form')
    formulario.onsubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(formulario)
        const data = Object.fromEntries(formData.entries()) // transformamos el formulario en un arreglo
        await fetch('/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        formulario.reset()
        getUsers()
    }
}

window.onload = () => {
    loadInitialTemplate()
    addFormListener()
    getUsers()
}