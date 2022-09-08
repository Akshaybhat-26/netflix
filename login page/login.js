let username;
let password;
let d = document.querySelector(".incorrect");
    d.style.display = "none";

function fetchInputDetails(){
    username = document.querySelector(".username").value;
    password = document.querySelector(".password").value;
}
let button = document.querySelector(".btn")
button.addEventListener("click", function (event) {
    event.preventDefault();
    fetchInputDetails();
    storedemail();

});




function storedemail(){
let getstoredemail = JSON.parse(localStorage.getItem("Userlist"));
for( let i = 0; i < getstoredemail.length; i++)
    if( username == getstoredemail[i].username && password == getstoredemail[i].password){
       location.href='/index.html';
    }
    else{
       
        d.style.display = "block";
    }
}