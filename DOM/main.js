// localStorage NOS PERMITE HACER QUE LAS TAREAS SE GUARDE Y NO SE BORREN AL REFRESCAR EL NAVEGADOS Y LUEGO RECUPERAR LA LISTA
// localStorage.getItem() Recupera la lista de tareas como texto por ende se debe tranformar a array con JSON.parse
const tareas = JSON.parse(localStorage.getItem('tareas')) || [] // JSON.parse tranforma un string en un arreglo

const render = () => {
    const listaTareas = document.getElementById('lista-tareas')
    // listaTareas.innerHTML = ''
    // for (let i = 0; i < tareas.length; i++) {
    //     listaTareas.innerHTML += '<li>' + tareas[i] + '</li>'
    // }

    const tareasTemplate = tareas.map(t => '<li>' + t + '</li>')
    // console.log(tareasTemplate.join('..'));

    listaTareas.innerHTML = tareasTemplate.join('')

    const elementosLista = document.querySelectorAll('#lista-tareas li')

    elementosLista.forEach((elemento, i) => {
        elemento.addEventListener('click', () => {
            elemento.parentNode.removeChild(elemento) // llamamos al elemento padre ya que el los puede remover
            tareas.splice(i, 1)
            actualizaLocalStorage(tareas)
            render()
        })
    })
}

const actualizaLocalStorage = (tareas) => {
    const tareasString = JSON.stringify(tareas) // JSON.stringify transforma en strings
    // localStorage.setItem() nos permite guardar los elementos en el storage y recibe siempre dos string
    // localStorage.setItem('clave_diccionario_para_recuperar', 'valor_diccionario_a_guardara')
    localStorage.setItem('tareas', tareasString)
}

window.onload = () => {
    render()
    const form = document.getElementById('form-tareas')
    form.onsubmit = (e) => {
        e.preventDefault()
        const inputTarea = document.getElementById('input-tarea')
        const tareaTexto = inputTarea.value
        inputTarea.value = ''
        tareas.push(tareaTexto)
        actualizaLocalStorage(tareas)
        render()

    }

}