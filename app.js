
/* =========================================
   EMPLOYEE MANAGEMENT SYSTEM
   STEP 1 - LOGIN SYSTEM
   MULTIPLE EMPLOYEES + ADMINS
========================================= */


/* =========================================
   CURRENT USER TYPE
========================================= */

let currentUserType = "employee";


/* =========================================
   EMPLOYEE ACCOUNTS
   Add as many employees as you want.
========================================= */

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


/* =========================================
   ADMIN ACCOUNTS
   Add as many admins as you want.
========================================= */

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


/* =========================================
   SELECT USER TYPE
========================================= */

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


/* =========================================
   PASSWORD SHOW / HIDE
========================================= */

function togglePassword() {

    const passwordInput =
        document.getElementById("password");

    const toggleButton =
        document.getElementById("passwordToggle");


    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        toggleButton.textContent = "🙈";

    }

    else {

        passwordInput.type = "password";

        toggleButton.textContent = "👁";

    }

}


/* =========================================
   FIND USER
========================================= */

function findUser(username, password) {

    const userList =
        currentUserType === "employee"
            ? employees
            : admins;


    return userList.find(function (user) {

        const usernameMatch =
            username.toLowerCase() ===
                user.username.toLowerCase()
            ||
            username.toLowerCase() ===
                user.email.toLowerCase();


        const passwordMatch =
            password === user.password;


        return usernameMatch && passwordMatch;

    });

}


/* =========================================
   LOGIN
========================================= */

function login(event) {

    event.preventDefault();


    const username =
        document
            .getElementById("username")
            .value
            .trim();


    const password =
        document
            .getElementById("password")
            .value;


    const rememberMe =
        document
            .getElementById("rememberMe")
            .checked;


    const loginButton =
        document.getElementById("loginBtn");


    const loginButtonText =
        document.getElementById("loginBtnText");


    /* =====================================
       EMPTY FIELD CHECK
    ===================================== */

    if (!username || !password) {

        showMessage(
            "Please enter your username/email and password.",
            "error"
        );

        return;

    }


    /* =====================================
       LOADING
    ===================================== */

    loginButton.disabled = true;

    loginButton.classList.add("loading");

    loginButtonText.textContent =
        "Checking login...";


    /* =====================================
       FIND ACCOUNT
    ===================================== */

    setTimeout(function () {

        const user =
            findUser(username, password);


        /* =================================
           LOGIN SUCCESS
        ================================= */

        if (user) {


            const loginData = {

                type: currentUserType,

                username: user.username,

                email: user.email,

                name: user.name,

                loginTime:
                    new Date().toISOString()

            };


            /* =============================
               SAVE SESSION
            ============================= */

            sessionStorage.setItem(
                "employeeSystemUser",
                JSON.stringify(loginData)
            );


            /* =============================
               REMEMBER USERNAME
            ============================= */

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


            /* =============================
               SUCCESS MESSAGE
            ============================= */

            showMessage(
                "Login successful! Redirecting...",
                "success"
            );


            loginButtonText.textContent =
                "Login Successful";


            /* =============================
               REDIRECT
            ============================= */

            setTimeout(function () {


                if (currentUserType === "employee") {

                    window.location.href =
                        "employee.html";

                }

                else {

                    window.location.href =
                        "admin.html";

                }


            }, 900);


        }


        /* =================================
           LOGIN FAILED
        ================================= */

        else {


            showMessage(
                "Invalid login details. Please check your username/email and password.",
                "error"
            );


            loginButton.disabled = false;

            loginButton.classList.remove("loading");


            loginButtonText.textContent =
                currentUserType === "employee"
                    ? "Login as Employee"
                    : "Login as Admin";


        }


    }, 600);

}


/* =========================================
   DEMO CREDENTIAL BUTTON
========================================= */

function fillDemoCredentials() {

    let user;


    if (currentUserType === "employee") {

        user = employees[0];

    }

    else {

        user = admins[0];

    }


    if (!user) {

        showMessage(
            "No demo account is available.",
            "error"
        );

        return;

    }


    document.getElementById(
        "username"
    ).value = user.username;


    document.getElementById(
        "password"
    ).value = user.password;


    showMessage(
        "Demo credentials filled. Click Login to continue.",
        "info"
    );

}


/* =========================================
   FORGOT PASSWORD
========================================= */

function forgotPassword(event) {

    event.preventDefault();


    showMessage(
        "Password recovery will be connected to the real authentication system later.",
        "info"
    );

}


/* =========================================
   SHOW MESSAGE
========================================= */

function showMessage(text, type) {

    const message =
        document.getElementById("message");


    message.textContent = text;


    message.className =
        "message " + type;

}


/* =========================================
   CLEAR MESSAGE
========================================= */

function clearMessage() {

    const message =
        document.getElementById("message");


    message.textContent = "";

    message.className = "message";

}


/* =========================================
   GET CURRENT LOGGED-IN USER
   Useful for employee.html/admin.html
========================================= */

function getLoggedInUser() {

    const userData =
        sessionStorage.getItem(
            "employeeSystemUser"
        );


    if (!userData) {

        return null;

    }


    try {

        return JSON.parse(userData);

    }

    catch (error) {

        console.error(
            "Unable to read login session:",
            error
        );

        return null;

    }

}


/* =========================================
   LOGOUT
========================================= */

function logoutUser() {

    sessionStorage.removeItem(
        "employeeSystemUser"
    );


    window.location.href =
        "index.html";

}


/* =========================================
   LOAD REMEMBERED USERNAME
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        const rememberedUsername =
            localStorage.getItem(
                "rememberedUsername"
            );


        if (rememberedUsername) {

            const usernameInput =
                document.getElementById(
                    "username"
                );


            const rememberCheckbox =
                document.getElementById(
                    "rememberMe"
                );


            if (usernameInput) {

                usernameInput.value =
                    rememberedUsername;

            }


            if (rememberCheckbox) {

                rememberCheckbox.checked = true;

            }

        }

    }
);
```
