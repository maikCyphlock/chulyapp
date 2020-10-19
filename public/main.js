const usersLoad = document.querySelector("#users")
const usersHtml = ` <div  class=" spinner container text-center mt-5 pt-5">
<div  class="spinner spinner-border text-secondary mt-5 " role="status">
</div>
</div>`;





/****** SIGNUP ******/
const signupForm = document.querySelector("#signup-form")
signupForm.addEventListener('submit', (e) => {

    const NameForm = document.querySelector("#signup-name").value
    const LastNameForm = document.querySelector("#signup-lastname").value
    const birthForm = document.querySelector("#signup-date").value
    const Email = document.querySelector("#signup-email").value
    const Password = document.querySelector("#signup-password").value
    const cedula = document.querySelector("#signup-cedula").value
    const phone = document.querySelector("#signup-phone").value
    e.preventDefault()
	
/****** SIGNUP /Put on database/ ******/
    if (campos.email == true && campos.name == true && campos.lastname == true && campos.password == true && campos.confirmPassword == true && campos.phone == true && campos.birthdate == true &&campos.ci == true) {
     auth
            .createUserWithEmailAndPassword(Email, Password)
            .then(credentials => {
                signupForm.reset()
                console.log('registrado')
                $('#signup').modal('hide')
                // get runnerN
                var docRef = fs.collection("usuarios").orderBy("runnerN", "desc")
                docRef.get().then(function (querySnapshot) {
                    doc = querySnapshot.docs
                    lastOne = doc[0].data()
                    newRunnerN = lastOne.runnerN + 1

                
                    // Add a new document in collection "usuarios" 
                    fs.collection("usuarios").doc(Email).set({
                            name: NameForm,
                            lastname: LastNameForm,
                            runnerN: newRunnerN,
                            bithdate: birthForm,
                            registered: Date(),
                            CI: cedula,
                            telephone: phone
                        })
                        .catch(function (error) {
                            console.error("Error writing document: ", error);
                        });
                })



            }).catch(err => {
                console.log(err)
                alert("este correo ya ha sido registrado ")
            });
    }
    else{
    alert('te faltan algunos datos por completar o son erroneos')}

})


/****** SIGNIN ******/

const signinForm = document.querySelector("#signin-form")

signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const Email = document.querySelector("#signin-email").value
    const Password = document.querySelector("#signin-password").value
    auth
        .signInWithEmailAndPassword(Email, Password)
        .then(credentials => {
            signupForm.reset()
            console.log('logueado')
            $('#signin').modal('hide')
        })
        .catch(err => {
            alert("la contraseña y(o) el correo electronico son incorrectos")
        })

})


/****** LOGOUT ******/

const logout = document.querySelector("#logout")

logout.addEventListener('click', (e) => {
    e.preventDefault()
    auth
        .signOut().then(() => {
            let loglabel = document.querySelector('#logout')
            loglabel.innerHTML = ""
            console.log('desconectado')
        })

})


/****** DATABASE FIRESTONE  ******/


//posts


const posts = document.querySelector(".posts")
setupPosts = data => {
    if (data.length || data.runnerN == 0) {
        let html = '';
        data.forEach(doc => {

            // this is a random generator for img 
            var generate = 10 * (Math.random())
            if (generate <= 5) {
                img_link = "https://image.freepik.com/free-vector/couple-practicing-trail-run-training_74855-5474.jpg"
            }
            if (generate >= 5) {
                img_link = "https://image.freepik.com/free-vector/people-running-marathon_23-2148208187.jpg"
            }
            if (generate >= 8) {
                img_link = "https://image.freepik.com/free-vector/marathon-race_52683-9471.jpg"
            }

            const post = doc.data()

            if(post.runnerN != 0){
            const li = `
            <div class="card mt-4 animate__animated animate__fadeInUp " >
            <img loading="lazy" src="${img_link}"
             class="card-img-top" alt="">
            <div class="card-body">
              <h5 class="card-title">${post.name} ${post.lastname}</h5>
              <p class="card-text">Corredor Numero : <span class="badge badge-success">${post.runnerN}</span></p>
             
            </div>
          </div>
            `;
            html += li;
            }

        });
        posts.innerHTML = html
        usersLoad.innerHTML = []
    } else {
        posts.innerHTML = []
        usersLoad.innerHTML = `
        <hr class="bg-light" >
        <div class='text-center'><h3 class=' pt-4 white animate__animated animate__fadeIn'>Ingresa para ver las publicaciones<h3/> <img src="https://image.flaticon.com/icons/png/512/129/129517.png" alt="" class="animate__animated animate__bounce animate__delay-2s " width="150px"></div>
        
        `
    }
}

//events

auth.onAuthStateChanged(user => {
    if (user) {
        let loglabel = document.querySelector('#logout')
        loglabel.innerHTML = `Cerrar sección <span><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-box-arrow-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
      </svg></span>`
        console.log("auth: sign in")
        fs.collection('usuarios')
            .orderBy("runnerN", "asc")
            .onSnapshot((querySnapshot) => {
                setupPosts(querySnapshot.docs)
            })

    } else {

        setupPosts([])
        console.log("auth: sign out");
    }
})

























