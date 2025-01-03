document.getElementById('loginForm').addEventListener('submit', function (event) {
    // Get the input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validate the inputs
    if (!username || !password) {
        alert("Both username and password are required!");
        event.preventDefault(); // Prevent form submission
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Show the Forgot Password form when clicked
    document.getElementById('forgotPasswordLink').addEventListener('click', function(event) {
        event.preventDefault();  // Prevent default link action
        document.querySelector('.login-card form').style.display = 'none';  // Hide the login form
        document.getElementById('forgotPasswordForm').style.display = 'block';  // Show the forgot password form
    });

    // Back to login form when clicked
    document.getElementById('backToLogin').addEventListener('click', function(event) {
        event.preventDefault();  // Prevent the button from refreshing the page
        document.querySelector('.login-card form').style.display = 'block';  // Show the login form
        document.getElementById('forgotPasswordForm').style.display = 'none';  // Hide the forgot password form
    });
});