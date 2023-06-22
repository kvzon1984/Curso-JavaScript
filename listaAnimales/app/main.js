const loadInitialTemplate = () => {
	const template = `
		<h1>Animales</h1>
		<form id="animal-form">
			<div>
				<label>Nombre</label>
				<input name="name" />
			</div>
			<div>
				<label>Tipo</label>
				<input name="type" />
			</div>
			<button type="submit">Enviar</button>
		</form>
		<ul id="animal-list"></ul>
	`
	const body = document.getElementsByTagName('body')[0]
	body.innerHTML = template
}

const getAnimals = async () => {
	const response = await fetch('/animals', {
		headers: {
			Authorization: localStorage.getItem('jwt')
		}
	})
	const animals = await response.json()
	const template = animal => `
		<li>
			${animal.name} - ${animal.type} <button id="${animal._id}">Eliminar</button>
		</li>
	`

	const animalList = document.getElementById('animal-list')
	animalList.innerHTML = animals.map(animal => template(animal)).join('')

	animals.forEach(animal => {
        const animalBoton = document.getElementById(`${animal._id}`)
        animalBoton.addEventListener('click', () => {
			fetch(`/animals/${animal._id}`, {
				method: 'DELETE',
				headers: {
					Authorization: localStorage.getItem('jwt')
				}
			})
            animalBoton.parentNode.remove()
            alert('Eliminado con exito')
        })
    })
}

const addFormListener = () => {
	const animalForm = document.getElementById('animal-form')
	animalForm.onsubmit = async (e) => {
		e.preventDefault()
		const formData = new FormData(animalForm)
		const data = Object.fromEntries(formData.entries()) // transformamos el formulario en un arreglo
		console.log(data);
		await fetch('/animals', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('jwt')
			}
		})
		animalForm.reset()
		getAnimals()
	}
}

const checkLogin = () => {
	localStorage.getItem('jwt')
}

const loginTemplate = () => {
	const template = `
		<h1>Login</h1>
		<form id="login-form">
			<div>
				<label>correo</label>
				<input name="email" />
			</div>
			<div>
				<label>Password</label>
				<input name="password" type="password"/>
			</div>
			<button type="submit">Enviar</button>
		</form>
		<a href="#" id="registro" >Registro</a>
		<div id="error"></div>
	`
	const body = document.getElementsByTagName('body')[0]
	body.innerHTML = template
}

const authListener = action => () => {
	const form = document.getElementById(`${action}-form`)
	form.onsubmit = async (e) => {
		e.preventDefault()
		const formData = new FormData(form)
		const data = Object.fromEntries(formData.entries()) // transformamos el formulario en un arreglo
		// console.log(data);
		const response = await fetch(`${action}`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const responseData = await response.text()
		if (response.status >= 300) {
			const error = document.getElementById('error')
			error.innerHTML = responseData
		} else {
			localStorage.setItem('jwt', `Bearer ${responseData}`)
			animalPages()
		}
	}
}

const addLoginListener = authListener('login')
const addRegisterListener = authListener('register')

const loadRegisterTemplate = () => {
	const template = `
		<h1>Registro</h1>
		<form id="register-form">
			<div>
				<label>correo</label>
				<input name="email" />
			</div>
			<div>
				<label>Password</label>
				<input name="password" type="password"/>
			</div>
			<button type="submit">Registrar</button>
		</form>
		<a href="#" id="inicio-sesion" >Iniciar Sesion</a>
		<div id="error"></div>
	`
	const body = document.getElementsByTagName('body')[0]
	body.innerHTML = template
}

const gotoLogin = () => {
	const gotoLoginButton = document.getElementById('inicio-sesion')
	gotoLoginButton.addEventListener('click', (e) => {
		loginPages()
	})
}

const gotoRegister = () => {
	const gotoRegisterButton = document.getElementById('registro')
	gotoRegisterButton.addEventListener('click', (e) => {
		registerPages()
	})
}

const animalPages = () => {
	loadInitialTemplate()
	addFormListener()
	getAnimals()
}

const registerPages = () => {
	loadRegisterTemplate()
	addRegisterListener()
	gotoLogin()
}

const loginPages = () => {
	loginTemplate()
	addLoginListener()
	gotoRegister()
}

window.onload = () => {
	const isLoginIn = checkLogin()
	if (isLoginIn) {
		animalPages()
	} else {
		loginPages()
	}
}
