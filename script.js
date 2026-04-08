const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");
const signupBtn = document.getElementById("signup-btn");
const signupSection = document.getElementById("signup-section");
const signupError = document.getElementById("signup-error");

const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginBtn = document.getElementById("login-btn");
const loginSection = document.getElementById("login-section");
const loginError = document.getElementById("login-error")

const welcome = document.getElementById("welcome");
const logoutBtn = document.getElementById("logout-btn");
const themeToggle = document.getElementById("theme-toggle");


logoutBtn.style.display = "none";

signupBtn.addEventListener("click", () => {
    const email = signupEmail.value.trim();
    const password = signupPassword.value.trim();

    signupError.textContent = "";

    if (!email || !password) {
        signupError.textContent = "Please enter email and password";
        return;
    }

    if (!isValidEmail(email)) {
        signupError.textContent = "Please enter a valid email";
        return;
    }

    if (password.length < 6) {
        signupError.textContent = "Password must be at least 6 characters";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some(user => user.email === email);
    if (userExists) {
        signupError.textContent = "This email is already registered";
        return;
    }

    const newUser = {
        email,
        password
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    signupError.textContent = "Signup succesful!";

    signupEmail.value = "";
    signupPassword.value = "";
});

signupPassword.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        signupBtn.click();
    }
});

loginBtn.addEventListener("click", () => {
    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    loginError.textContent = "";

    if (!email || !password) {
        loginError.textContent = "Please enter email and password";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(
        user => user.email === email && user.password === password
    );

    if (!matchedUser) {
        loginError.textContent = "Invalid email or password";
        return;
    }

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("currentUser", matchedUser.email);

    showWelcome(matchedUser.email);

    loginEmail.value = "";
    loginPassword.value = "";
});

loginPassword.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        loginBtn.click();
    }
});

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");

    welcome.textContent = "";
    logoutBtn.style.display = "none";
    signupSection.style.display = "block";
    loginSection.style.display = "block";
    loginError.textContent = "";
    signupError.textContent = "";
});

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", dark);
    } else {
        localStorage.setItem("theme", "light");
    }
})

function showWelcome(email) {
    welcome.textContent = `Welcome, ${email}`;
    logoutBtn.style.display = "block";
    signupSection.style.display = "none";
    loginSection.style.display = "none";
}

const isLoggedIn = localStorage.getItem("loggedIn");
const currentUser = localStorage.getItem("currentUser");

if (isLoggedIn === "true" && currentUser) {
    showWelcome(currentUser);
}

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
}

function isValidEmail(email) {
    return email.includes("@") && email.includes(".");
}