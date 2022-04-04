const login = document.getElementById("login");
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const api = "http://localhost:3000/api/user/login"

login.addEventListener('click', function (loginPost) {
    loginPost.stopPropagation();
    loginPost.preventDefault();
    console.log(email);
    console.log(password);
})