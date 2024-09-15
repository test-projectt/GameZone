let username = document.querySelector(".inname");
let email = document.querySelector(".inemail");
let password = document.querySelector(".inpass");
let registerBtn = document.querySelector(".logiin");

registerBtn.addEventListener("click", function(e) {
    e.preventDefault();
    if (username.value === "" || email.value === "" || password.value === "") {
        alert("Please fill in all fields.");
    } else {
        localStorage.setItem("username", username.value);
        localStorage.setItem("email", email.value);
        localStorage.setItem("password", password.value);

        setTimeout(() => {
            window.location = "Log in.html";
        }, 1500);
    }
});

