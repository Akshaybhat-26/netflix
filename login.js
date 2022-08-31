let username;
let password;
let d = document.querySelector(".danger");
function fetchInputDetails(){
    username = document.querySelector("#floatingInput").value;
    password = document.querySelector("#floatingPassword").value;
}
let button = document.querySelector(".btn")
button.addEventListener("click", function (event) {
    event.preventDefault();
    fetchInputDetails();
    storedemail();

});

document.querySelector("#floatingInput").addEventListener("keyup", function (event) {
    d.style.display = "none";
});


function storedemail(){
let getstoredemail = JSON.parse(localStorage.getItem("Userlist"));
for( let i = 0; i < getstoredemail.length; i++)
    if( username == getstoredemail[i].username && password == getstoredemail[i].password){
       location.href="https://www.google.com";
    }
    else{
       
        d.style.display = "block";
    }
}