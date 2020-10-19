const formulario = document.querySelector('#signup');
const inputs = document.querySelectorAll('#signup input')

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{8,18}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/, // 7 a 14 numeros.
	ci: /^\d{6,8}$/ // 8 numeros.
}


const campos = {

name:false,
email:false,
password:false,
confirmPassword:false,
phone:true,
ci:false,
birthdate: false,
lastname: false
}



const validarForm = function(e) {

	switch (e.target.name) {
		case "email":
			if(expresiones.correo.test(e.target.value) && e.target.value.length >1){
				document.getElementById('signup-email').classList.remove("is-invalid")
				document.getElementById('signup-email').classList.add("is-valid")
				campos['email'] = true
			}else{
				document.getElementById('signup-email').classList.remove("is-valid")
				document.getElementById('signup-email').classList.add("is-invalid")
				campos['email'] = false
			}

		break;
		case "name":
			if(expresiones.nombre.test(e.target.value) && e.target.value.length >1){
				document.getElementById('signup-name').classList.remove("is-invalid")
				document.getElementById('signup-name').classList.add("is-valid")
				campos['name'] = true
			}else{
				document.getElementById('signup-name').classList.remove("is-valid")
				document.getElementById('signup-name').classList.add("is-invalid")
				campos['name'] = false
			}

		break;
		case "lastname":
			if(expresiones.nombre.test(e.target.value)&& e.target.value.length >1 ){
				document.getElementById('signup-lastname').classList.remove("is-invalid")
				document.getElementById('signup-lastname').classList.add("is-valid")
				campos['lastname'] = true
			}else{
				document.getElementById('signup-lastname').classList.remove("is-valid")
				document.getElementById('signup-lastname').classList.add("is-invalid")
				campos['lastname'] = false
			}


		break;
		case "ci":
			if(expresiones.ci.test(e.target.value)&& e.target.value.length >1 ){
				document.getElementById('signup-cedula').classList.remove("is-invalid")
				document.getElementById('signup-cedula').classList.add("is-valid")
				campos['ci'] = true

			}else{
				document.getElementById('signup-cedula').classList.remove("is-valid")
				document.getElementById('signup-cedula').classList.add("is-invalid")
				campos['ci'] = false
			}

		break;
		case "birthdate":
			if (parseInt(e.target.value) > 1900 && parseInt(e.target.value) <= new Date().getFullYear() ) {
				document.getElementById('signup-date').classList.remove("is-invalid")
				document.getElementById('signup-date').classList.add("is-valid")
				 campos['birthdate'] = true
			} else {
				document.getElementById('signup-date').classList.add("is-invalid")
				document.getElementById('signup-date').classList.remove("is-valid")
				campos['birthdate'] = false
			}

		break;
		case "password":
			if(expresiones.password.test(e.target.value)&& e.target.value.length >1 ){
				document.getElementById('signup-password').classList.remove("is-invalid")
				document.getElementById('signup-password').classList.add("is-valid")
				campos['password'] = true
			}else{
				document.getElementById('signup-password').classList.remove("is-valid")
				document.getElementById('signup-password').classList.add("is-invalid")
				campos['password'] = false
			}

			confirmPassword = document.getElementById('signup-confirm-password').value
			if(expresiones.password.test(confirmPassword)&& confirmPassword == e.target.value ){
				document.getElementById('signup-confirm-password').classList.remove("is-invalid")
				document.getElementById('signup-confirm-password').classList.add("is-valid")
				 campos['confirmPassword'] = true
			}else{
				document.getElementById('signup-confirm-password').classList.remove("is-valid")
				document.getElementById('signup-confirm-password').classList.add("is-invalid")
				 campos['confirmPassword'] = false
		}
		break; 
		case "confirmPassword":
		password = document.getElementById('signup-password').value

		if(expresiones.password.test(e.target.value)&& e.target.value == password ){
		document.getElementById('signup-confirm-password').classList.remove("is-invalid")
		document.getElementById('signup-confirm-password').classList.add("is-valid")
		 campos['confirmPassword'] = true

		}else{
		document.getElementById('signup-confirm-password').classList.remove("is-valid")
		document.getElementById('signup-confirm-password').classList.add("is-invalid")
		 campos['confirmPassword'] = false
		}

		break;
		case "phone":
		if (e.target.value.trim() == 0) {
		document.getElementById('signup-phone').classList.remove("is-invalid")
		document.getElementById('signup-phone').classList.remove("is-valid")
		campos['phone'] = true
		}
		else{

			if(expresiones.telefono.test(e.target.value) && e.target.value.length >1){
				document.getElementById('signup-phone').classList.remove("is-invalid")
				document.getElementById('signup-phone').classList.add("is-valid")
				campos['phone'] = true
			}

			else{
				document.getElementById('signup-phone').classList.remove("is-valid")
				document.getElementById('signup-phone').classList.add("is-invalid")
				campos['phone'] = false
			}
		}

		break;
	}


}

inputs.forEach((input)=>{
	input.addEventListener('keyup',validarForm)
	input.addEventListener('blur',validarForm)
})

/*
formulario.addEventListener('submit' (e)=>{
	e.preventDefault();
});
*/