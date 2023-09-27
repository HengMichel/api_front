const REGISTERFORM = $("#registerForm");
const LOGINFORM = $("#loginForm");

REGISTERFORM.on('submit', (e) => {

    // pour empêcher l'envoi du formulaire
    e.preventDefault();

    // récupérer les infos de l'user
    let pseudo = $("#pseudo").val();
    let firstName = $("#firstname").val();
    let lastName = $("#lastname").val();
    let password = $("#password").val();
    let action = $('#action').val();

    // appel de la fonction register
    register(pseudo,firstName,lastName,password,action);

});
LOGINFORM.on('submit', (e) => {

    // pour empêcher l'envoi du formulaire
    e.preventDefault();

    // récupérer les infos de l'user
    let pseudo = $("#pseudo").val();
    let password = $("#password").val();
    let action = $('#action').val();

    // appel de la fonction login
    login(pseudo,password,action);

});

// fonction register
function register(pseudo,firstName,lastName,password,action){
    let data = {

        // clé provenent de route.rest dans api_back : valeur 
        pseudo: pseudo,
        password: password,
        firstname: firstName,
        lastname: lastName,
        action : action
    }

    let dataOption = {
        method : "post",

        // stringify est une méthode qui fait parti de la class JSON et permet de convertir le code JSON(20-31) pour être lu par le language php
        body : JSON.stringify(data),
    }

    // appel de la fonction fetch est une fonction asynchrone (en back) et retourne des promesses
    fetch("http://localhost/api_back/", dataOption)
    .then(response => {
        response.json()
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log("promesse non tenue ...");
        })
    })
    .catch(error => console.log("tu me l'avais promis pourtant ..."));

}

// fonction login
function login(pseudo,password,action){
    let data = {

        // clé provenent de route.rest dans api_back : valeur 
        pseudo: pseudo,
        password: password,
        action : action
    }

    let dataOption = {
        method : "post",

        // stringify est une méthode qui fait parti de la class JSON et permet de convertir le code JSON(20-31) pour être lu par le language php
        body : JSON.stringify(data),
    }
// fetch
    fetch("http://localhost/api_back/", dataOption)
    .then(response => {
        response.json()
        .then(data => {
            console.log(data);
            localStorage.setItem("iduser",data.data.id_user);
            window.location.href("");
            localStorage.setItem("firstname",data.data.firstname);
            window.location.href("");

        })
        .catch(error =>error);
    })
    .catch(error => console.log("il y a une erreur"));
}
