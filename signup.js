let username;
let email;
let password;
let movieuserdb = [];
function fetchInputDetails(){
    username = document.querySelector(".username").value;
    email = document.querySelector(".email").value;
    password = document.querySelector(".password").value;
}
let button = document.querySelector(".btn")
button.addEventListener("click", function (event) {
    event.preventDefault();
    fetchInputDetails();
    console.log(username)

    setLocalData();

});
function setLocalData() {
    let dbObject = {
        username: username,
        email: email,
        password: password,
    };

    movieuserdb.push(dbObject)
    localStorage.setItem("Userlist", JSON.stringify(movieuserdb));
    let a= document.createElement('a');
    a.target= '_blank';
    a.href= '/login.html';
    a.click();
}





