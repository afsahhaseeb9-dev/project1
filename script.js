const startLearningButton = document.getElementById("startLearning");

const learningMessage = document.getElementById("learningMessage");

startLearningButton.addEventListener("click", function () {
    learningMessage.textContent =
        "Great! Your learning journey has started.";
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