var users = [];
var usersString = localStorage.getItem("users");
if (usersString == null) {

} else {
    users = JSON.parse(usersString);
}

var usernameElement = document.getElementById('username');
var passwordElement = document.getElementById('password');
var loginErrorAlertElement = document.getElementById('login-error-alert');
var loginSuccessAlertElement = document.getElementById('login-success-alert');

function onLogin(event) {
    event.preventDefault();
    var username = usernameElement.value;
    var password = passwordElement.value;

    var userLoggedIn = false;

    for (let index = 0; index < users.length; index++) {
        const user = users[index];
        if (user.username === username && user.password === password) {
            userLoggedIn = true;
            localStorage.setItem("logged-in-user-id", user.id);
            localStorage.setItem("logged-in-user-name", user.username);
            break;
        }

    }

    if (userLoggedIn) {
        localStorage.setItem("show-success-login-message", '');

        loginSuccessAlertElement.innerHTML = 'Данные верны';

        loginErrorAlertElement.style.display = 'none';
        loginSuccessAlertElement.style.display = 'block';
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);


    } else {
        localStorage.removeItem("logged-in-user-id");
        localStorage.removeItem("logged-in-user-name");
        showLoginErrorMessage();
    }

}

function showLoginErrorMessage() {
    loginErrorAlertElement.innerHTML = 'Данные неверны';
    loginErrorAlertElement.style.display = 'block';
}