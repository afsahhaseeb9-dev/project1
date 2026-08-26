const startLearningButton =
    document.getElementById("startLearning");

const learningMessage =
    document.getElementById("learningMessage");

const learnerName =
    document.getElementById("learnerName");

const learnerEmail =
    document.getElementById("learnerEmail");


startLearningButton.addEventListener("click", async function () {

    const name = learnerName.value;

    const email = learnerEmail.value;


    try {

        const response = await fetch(
            "http://localhost:5000/api/users",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            learningMessage.textContent =
                data.message;

            return;
        }


        learningMessage.textContent =
            data.message;


        learnerName.value = "";

        learnerEmail.value = "";
        loadUsers();

    }

    catch (error) {

        learningMessage.textContent =
            "Unable to connect to the server.";

        console.error(error);

    }

});

const htmlCourse = document.getElementById("htmlCourse");
const cssCourse = document.getElementById("cssCourse");
const jsCourse = document.getElementById("jsCourse");

htmlCourse.addEventListener("click", function () {
    learningMessage.textContent =
        "You selected HTML5. Let's learn about web structure!";
});

cssCourse.addEventListener("click", function () {
    learningMessage.textContent =
        "You selected CSS3. Let's learn about responsive design!";
});

jsCourse.addEventListener("click", function () {
    learningMessage.textContent =
        "You selected JavaScript. Let's learn about interactivity!";
});
async function loadUsers() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/users"
        );

        const users = await response.json();

        const usersList =
            document.getElementById("usersList");

        usersList.innerHTML = "";

        users.forEach(function (user) {

            const userDiv =
                document.createElement("div");

            userDiv.className = "user";

            userDiv.innerHTML = `
                <strong>${user.name}</strong>
                <p>${user.email}</p>
            `;

            usersList.appendChild(userDiv);

        });

    }

    catch (error) {

        console.error(error);

    }

}

loadUsers();