```javascript
/* =====================================================
   SAKSHI RISE MULTIMEDIA
   EMPLOYEE MANAGEMENT SYSTEM
   LOGIN SYSTEM
===================================================== */

let currentUserType = "employee";


/* =====================================================
   EMPLOYEE ACCOUNTS
===================================================== */

const employees = [
    {
        username: "EMP001",
        email: "employee1@example.com",
        password: "employee123",
        name: "Demo Employee"
    },

    {
        username: "EMP002",
        email: "tanmay@example.com",
        password: "Tanmay@123",
        name: "Tanmay Patil"
    },

    {
        username: "EMP003",
        email: "employee3@example.com",
        password: "Employee@123",
        name: "Employee Three"
    }
];


/* =====================================================
   ADMIN ACCOUNTS
===================================================== */

const admins = [
    {
        username: "admin",
        email: "admin@example.com",
        password: "admin123",
        name: "System Administrator"
    },

    {
        username: "sakshiadmin",
        email: "sakshi@example.com",
        password: "Admin@2026",
        name: "Sakshi Kadam"
    }
];


/* =====================================================
   SELECT EMPLOYEE / ADMIN
===================================================== */

function selectUserType(type) {

    currentUserType = type;

    const employeeBtn =
        document.getElementById("employeeBtn");

    const adminBtn =
        document.getElementById("adminBtn");

    const userLabel =
        document.getElementById("userLabel");

    const usernameInput =
        document.getElementById("username");

    const loginBtnText =
        document.getElementById("loginBtnText");


    if (!employeeBtn ||
        !adminBtn ||
        !userLabel ||
        !usernameInput ||
        !loginBtnText) {

        return;
    }


    if (type === "employee") {

        employeeBtn.classList.add("active");
        adminBtn.classList.remove("active");

        userLabel.textContent =
            "Employee ID / Email";

        usernameInput.placeholder =
            "Enter Employee ID or Email";

        loginBtnText.textContent =
            "Login as Employee";

    }

    else {

        adminBtn.classList.add("active");
        employeeBtn.classList.remove("active");

        userLabel.textContent =
            "Admin Username / Email";

        usernameInput.placeholder =
            "Enter Admin Username or Email";

        loginBtnText.textContent =
            "Login as Admin";

    }

    clearMessage();

    usernameInput.focus();
}


/* =====================================================
   PASSWORD SHOW / HIDE
===================================================== */

function togglePassword() {

    const passwordInput =
        document.getElementById("password");

    const toggleButton =
        document.getElementById("passwordToggle");


    if (!passwordInput) {
        return;
    }


    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        if (toggleButton) {
            toggleButton.textContent = "🙈";
        }

    }

    else {

        passwordInput.type = "password";

        if (toggleButton) {
            toggleButton.textContent = "👁";
        }

    }
}


/* =====================================================
   FIND USER
===================================================== */

function findUser(username, password) {

    const list =
        currentUserType === "employee"
            ? employees
            : admins;


    const enteredUsername =
        username.trim().toLowerCase();


    return list.find(function (user) {

        const usernameMatch =
            user.username.toLowerCase() ===
                enteredUsername
            ||
            user.email.toLowerCase() ===
                enteredUsername;


        const passwordMatch =
            user.password === password;


        return usernameMatch && passwordMatch;
    });
}


/* =====================================================
   LOGIN
===================================================== */

function login(event) {

    if (event) {
        event.preventDefault();
    }


    const usernameInput =
        document.getElementById("username");

    const passwordInput =
        document.getElementById("password");

    const rememberInput =
        document.getElementById("rememberMe");

    const loginButton =
        document.getElementById("loginBtn");

    const loginButtonText =
        document.getElementById("loginBtnText");


    if (!usernameInput || !passwordInput) {

        alert(
            "Login form could not be found."
        );

        return;
    }


    const username =
        usernameInput.value.trim();

    const password =
        passwordInput.value;


    const rememberMe =
        rememberInput
            ? rememberInput.checked
            : false;


    /* EMPTY CHECK */

    if (!username || !password) {

        showMessage(
            "Please enter your ID/email and password.",
            "error"
        );

        return;
    }


    /* LOADING */

    if (loginButton) {
        loginButton.disabled = true;
        loginButton.classList.add("loading");
    }


    if (loginButtonText) {
        loginButtonText.textContent =
            "Checking login...";
    }


    /* CHECK ACCOUNT */

    setTimeout(function () {

        const user =
            findUser(username, password);


        /* =================================================
           SUCCESS
        ================================================= */

        if (user) {

            const loginData = {

                type: currentUserType,

                username: user.username,

                email: user.email,

                name: user.name,

                loginTime:
                    new Date().toISOString()

            };


            /* SAVE LOGIN SESSION */

            sessionStorage.setItem(
                "employeeSystemUser",
                JSON.stringify(loginData)
            );


            /* REMEMBER USERNAME */

            if (rememberMe) {

                localStorage.setItem(
                    "rememberedUsername",
                    username
                );

            }

            else {

                localStorage.removeItem(
                    "rememberedUsername"
                );

            }


            showMessage(
                "Login successful! Opening dashboard...",
                "success"
            );


            if (loginButtonText) {

                loginButtonText.textContent =
                    "Login Successful";

            }


            /* =================================================
               REDIRECT
            ================================================= */

            setTimeout(function () {

                if (currentUserType === "employee") {

                    window.location.assign(
                        "./employee.html"
                    );

                }

                else {

                    window.location.assign(
                        "./admin.html"
                    );

                }

            }, 700);

        }


        /* =================================================
           WRONG LOGIN
        ================================================= */

        else {

            showMessage(
                "Invalid ID/email or password.",
                "error"
            );


            if (loginButton) {

                loginButton.disabled = false;

                loginButton.classList.remove(
                    "loading"
                );

            }


            if (loginButtonText) {

                loginButtonText.textContent =
                    currentUserType === "employee"
                        ? "Login as Employee"
                        : "Login as Admin";

            }

        }

    }, 500);
}


/* =====================================================
   DEMO CREDENTIALS
===================================================== */

function fillDemoCredentials() {

    const user =
        currentUserType === "employee"
            ? employees[0]
            : admins[0];


    if (!user) {
        return;
    }


    const usernameInput =
        document.getElementById("username");

    const passwordInput =
        document.getElementById("password");


    if (usernameInput) {
        usernameInput.value =
            user.username;
    }


    if (passwordInput) {
        passwordInput.value =
            user.password;
    }


    showMessage(
        "Demo credentials filled. Click Login.",
        "info"
    );
}


/* =====================================================
   FORGOT PASSWORD
===================================================== */

function forgotPassword(event) {

    if (event) {
        event.preventDefault();
    }


    showMessage(
        "Password recovery will be added when real authentication is connected.",
        "info"
    );
}


/* =====================================================
   SHOW MESSAGE
===================================================== */

function showMessage(text, type) {

    const message =
        document.getElementById("message");


    if (!message) {

        alert(text);

        return;
    }


    message.textContent = text;

    message.className =
        "message " + type;
}


/* =====================================================
   CLEAR MESSAGE
===================================================== */

function clearMessage() {

    const message =
        document.getElementById("message");


    if (!message) {
        return;
    }


    message.textContent = "";

    message.className =
        "message";
}


/* =====================================================
   GET LOGGED-IN USER
===================================================== */

function getLoggedInUser() {

    const data =
        sessionStorage.getItem(
            "employeeSystemUser"
        );


    if (!data) {
        return null;
    }


    try {

        return JSON.parse(data);

    }

    catch (error) {

        console.error(error);

        return null;
    }
}


/* =====================================================
   LOGOUT
===================================================== */

function logoutUser() {

    sessionStorage.removeItem(
        "employeeSystemUser"
    );


    window.location.assign(
        "./index.html"
    );
}


/* =====================================================
   REMEMBER USERNAME
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const remembered =
            localStorage.getItem(
                "rememberedUsername"
            );


        const usernameInput =
            document.getElementById(
                "username"
            );


        const rememberCheckbox =
            document.getElementById(
                "rememberMe"
            );


        if (remembered && usernameInput) {

            usernameInput.value =
                remembered;

        }


        if (remembered &&
            rememberCheckbox) {

            rememberCheckbox.checked =
                true;

        }

    }
);
```
