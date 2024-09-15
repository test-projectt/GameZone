let username = document.querySelector(".inemail");
let password = document.querySelector(".inpass");
let loginBtn = document.querySelector(".logiin");

loginBtn.addEventListener("click", function(e) {
    e.preventDefault();
    let storedUser = localStorage.getItem("username");
    let storedPassword = localStorage.getItem("password");

    if (username.value === "" || password.value === "") {
        alert("Please fill in all fields.");
    } else if (storedUser === username.value && storedPassword === password.value) {
        localStorage.setItem("username", username.value); 
        setTimeout(() => {
            window.location = "index.html";
        }, 1500);
    } else {
        alert("Username or password is incorrect.");
    }
});
let guest = document.querySelector (".gg")

