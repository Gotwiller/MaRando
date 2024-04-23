document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const newUserCheckbox = document.getElementById("new-user");
    const errorMessage = document.getElementById("error-message");

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Empeche l'envoi du formulaire par défaut

        const username = usernameInput.value;
        const password = passwordInput.value;
        const isNewUser = newUserCheckbox.checked;

        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password,
                    isNewUser
                })
            });

            const data = await response.json();

            if (data.success) {
                window.location.href = "/";
            } else {
                errorMessage.textContent = data.message;
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la connexion:", error);
            errorMessage.textContent = "Une erreur s'est produite. Veuillez réessayer.";
        }
    });
});
