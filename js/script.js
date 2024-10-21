document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    const avatar = localStorage.getItem('avatar');

    // Check if the user has both a name and avatar saved
    if (username && avatar) {
        displayUserInfo(username, avatar);
        displayPasswordScreen();
    } else {
        // Only show the reset button if the name and avatar are not set
        displayResetButtonOnly();
        displayNameStep();
    }
});

// Function to display the user info (name and avatar) in the right section
function displayUserInfo(username, avatar) {
    const usernameElement = document.getElementById('username');
    const avatarElement = document.getElementById('avatar-img');
    
    // Set the name and avatar if both are available
    if (username && avatar) {
        usernameElement.textContent = username;
        avatarElement.src = avatar;
        usernameElement.classList.remove('d-none');
        avatarElement.classList.remove('d-none');
    }
}

// Function to show only the reset button (hiding name and avatar) when user has not selected them
function displayResetButtonOnly() {
    document.getElementById('username').classList.add('d-none'); // Hide name
    document.getElementById('avatar-img').classList.add('d-none'); // Hide avatar image
}

// Display the name input step
function displayNameStep() {
    document.getElementById('name-step').classList.remove('d-none');
    document.getElementById('password-screen').classList.add('d-none');
}

// Submit the name and move to avatar selection
function submitName() {
    const nameInput = document.getElementById('name-input').value;
    if (nameInput.trim() !== '') {
        localStorage.setItem('username', nameInput);
        document.getElementById('name-step').classList.add('d-none');
        displayAvatarStep();
    } else {
        showToast('Напиши име де', 'wrong');
    }
}

// Display the avatar selection step
function displayAvatarStep() {
    document.getElementById('avatar-step').classList.remove('d-none');
}

// Select an avatar and save it, then move to password screen
function selectAvatar(avatarPath) {
    localStorage.setItem('avatar', avatarPath);
    document.getElementById('avatar-step').classList.add('d-none');
    displayUserInfo(localStorage.getItem('username'), avatarPath);
    displayPasswordScreen();
}

// Display the password screen after name and avatar are selected
function displayPasswordScreen() {
    document.getElementById('password-screen').classList.remove('d-none');
    document.getElementById('name-step').classList.add('d-none');
    document.getElementById('avatar-step').classList.add('d-none');
    document.getElementById('exam-screen').classList.add('d-none');
}

// Function to check if the selected password is correct
function checkPassword(answer) {
    if (answer === 'Рибново') {
        document.getElementById('password-screen').classList.add('d-none');
        document.getElementById('exam-screen').classList.remove('d-none');
        loadExamState();
    } else {
        showToast('Грешен отговор.', 'wrong');
        shakeElement('password-screen');
    }
}

// Sample questions data
const questions = [
    { question: "Какво означава абревиатурата HTML?", options: ['HyperText Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'], correct: 'A' },
    { question: "Кой програмен език се изпълнява в браузър?", options: ['Java', 'C', 'JavaScript'], correct: 'C' },
    { question: "Какво означава абревиатурата CSS?", options: ['Cascading Style Sheets', 'Creative Style Sheets', 'Computer Style Sheets'], correct: 'A' },
    { question: "Кой HTML елемент използваме за заглавие?", options: ['<heading>', '<h1>', '<title>'], correct: 'B' },
    { question: "Как се добавя фон в HTML страница?", options: ['text-background', 'font-color', 'background-color'], correct: 'C' },
    { question: "Как се добавя изображение в HTML?", options: ['<image src="image.jpg">', '<img src="image.jpg">', '<src img="image.jpg">'], correct: 'B' },
    { question: "Кой е правилният HTML елемент за добавяне на връзка (линк)?", options: ['<a href="url">', '<link href="url">', '<url>'], correct: 'A' },
    { question: "Как се създава таблица в HTML?", options: ['<list>', '<table>', '<tab>'], correct: 'B' },
    { question: "Кой е правилният синтаксис за добавяне на коментар в HTML?", options: ['<!-- This is a comment -->', '// This is a comment', '/* This is a comment */'], correct: 'A' },
    { question: "Какво означава абревиатурата HTTP?", options: ['Hyperlink Text Protocol', 'Home Tool Transfer Protocol', 'HyperText Transfer Protocol'], correct: 'C' },
    { question: "Кой елемент се използва за изброяване на списък с номера?", options: ['<list>', '<ul>', '<ol>'], correct: 'C' },
    { question: "Коя е правилната структура за форми в HTML?", options: ['<input>', '<button>', '<form>'], correct: 'C' },
    { question: "Какво означава абревиатурата URL?", options: ['Universal Resource Locator', 'Uniform Resource Locator', 'Universal Retrieval Link'], correct: 'B' },
    { question: "Каква е основната цел на JavaScript?", options: ['Да добави интерактивност към уебсайта', 'Да създаде база данни', 'Да създаде анимации'], correct: 'A' },
    { question: "Какъв е правилният начин за включване на JavaScript в HTML документ?", options: ['<javascript>', '<script>', '<js>'], correct: 'B' },
    { question: "Кой HTML елемент използваме за разделяне на съдържание на блокове?", options: ['<section>', '<div>', '<container>'], correct: 'B' },
    { question: "С какво най-често се задават стилове на HTML елементи?", options: ['JavaScript', 'HTML', 'CSS'], correct: 'C' },
    { question: "Кой HTML елемент използваме за добавяне на видео в уебстраница?", options: ['<video>', '<media>', '<movie>'], correct: 'A' },
    { question: "Каква е основната цел на HTML?", options: ['Да добави анимации', 'Да структурира съдържание', 'Да добави база данни'], correct: 'B' },
    { question: "Коя технология е най-подходяща за оформяне на изгледа на уебсайт?", options: ['HTML', 'JavaScript', 'CSS'], correct: 'C' },
    { question: "Кой HTML елемент използваме за параграфи?", options: ['<p>', '<para>', '<text>'], correct: 'A' },
    { question: "Какъв е правилният начин за включване на CSS в HTML документ?", options: ['<style src="stylesheet.css">', '<css>', '<link rel="stylesheet">'], correct: 'C' },
    { question: "Кой е правилният HTML елемент за добавяне на интерактивна карта в уебстраница?", options: ['<map>', '<canvas>', '<iframe>'], correct: 'C' },
    { question: "Каква е функцията на HTML елемента <head>?", options: ['Съдържа метаинформация за документа', 'Показва съдържанието на страницата', 'Съдържа главното съдържание'], correct: 'A' },
    { question: "Какво означава абревиатурата DOM в контекста на уеб разработката?", options: ['Dynamic Object Manipulation', 'Document Object Model', 'Document Overview Model'], correct: 'B' },
    { question: "Кое от следните НЕ е CSS свойство?", options: ['background-color', 'border-radius', 'run-script'], correct: 'C' },
    { question: "Какво прави CSS свойството 'margin'?", options: ['Определя разстоянието извън елемента', 'Определя разстоянието вътре в елемента', 'Определя ширината на елемента'], correct: 'A' },
    { question: "Кое е правилното CSS свойство за задаване на текстов цвят?", options: ['font-color', 'color', 'text-color'], correct: 'B' },
    { question: "Каква е целта на таговете <meta> в HTML документа?", options: ['Да показват основното съдържание', 'Да предоставят метаинформация', 'Да показват заглавията'], correct: 'B' },
    { question: "Кое CSS свойство се използва за създаване на разстояние вътре в елемент?", options: ['padding', 'spacing', 'margin'], correct: 'A' },
    { question: "Кое CSS свойство се използва за промяна на шрифта?", options: ['font-family', 'font-style', 'font-weight'], correct: 'A' },
    { question: "Какво прави HTML елементът <br>?", options: ['Добавя празно пространство', 'Прекъсва реда', 'Създава нов параграф'], correct: 'B' },
    { question: "Какво е целта на <form> елемента в HTML?", options: ['Създава таблица', 'Изпраща данни към сървър', 'Създава списък'], correct: 'B' },
    { question: "Кое CSS свойство се използва за задаване на цвят на фона?", options: ['background-color', 'background-style', 'color'], correct: 'A' },
    { question: "Какъв е правилният начин за свързване на външен CSS файл към HTML документ?", options: ['<style src="styles.css">', '<link rel="stylesheet" href="styles.css">', '<css file="styles.css">'], correct: 'B' },
    { question: "Кое CSS свойство променя дебелината на шрифта?", options: ['font-weight', 'font-style', 'font-size'], correct: 'A' },
    { question: "Какъв е правилният HTML таг за създаване на падащо меню (dropdown)?", options: ['<select>', '<option>', '<dropdown>'], correct: 'A' },
    { question: "Кое CSS свойство контролира разстоянието между буквите?", options: ['text-spacing', 'letter-spacing', 'word-spacing'], correct: 'B' },
    { question: "Какво прави HTML елементът <hr>?", options: ['Създава хоризонтална линия', 'Разделя съдържанието на секции', 'Добавя празен ред'], correct: 'A' },
    { question: "Какъв е правилният HTML елемент за създаване на списък с номера?", options: ['<ol>', '<ul>', '<list>'], correct: 'A' },
    { question: "Какво прави атрибутът 'alt' в <img> таг?", options: ['Показва алтернативен текст при липсващо изображение', 'Задава размерите на изображението', 'Задава местоположението на изображението'], correct: 'A' },
    { question: "Каква е функцията на таг <title> в HTML?", options: ['Задава заглавието на документа', 'Показва заглавия на страници', 'Създава линкове'], correct: 'A' },
    { question: "Коя е най-малката HTML заглавка?", options: ['<h1>', '<h6>', '<header>'], correct: 'B' },
    { question: "Какво представлява таг <b> в HTML?", options: ['Прави текста удебелен', 'Прави текста курсивен', 'Създава заглавие'], correct: 'A' },
    { question: "Какво представлява таг <i> в HTML?", options: ['Прави текста курсивен', 'Прави текста удебелен', 'Създава изображение'], correct: 'A' },
    { question: "Кой HTML атрибут се използва за задаване на уникален идентификатор на елемент?", options: ['class', 'name', 'id'], correct: 'C' },
    { question: "Кой HTML атрибут се използва за създаване на линкове в <a> тага?", options: ['src', 'href', 'link'], correct: 'B' },
    { question: "Кое CSS свойство задава формата на външните ъгли на елемент?", options: ['border-radius', 'corner-shape', 'border-style'], correct: 'A' }
];

let currentQuestionIndex = 0;
let wrongGuesses = 0;
let userAnswers = [];

// Function to display the current question
function displayQuestion() {
    const questionElement = document.getElementById('question-text');
    const options = document.querySelectorAll('#exam-screen button');

    if (questions[currentQuestionIndex]) {
        document.getElementById('current-question').textContent = currentQuestionIndex + 1;
        document.getElementById('total-questions').textContent = questions.length;

        questionElement.textContent = questions[currentQuestionIndex].question;
        options.forEach((btn, index) => {
            btn.textContent = questions[currentQuestionIndex].options[index];
        });
    }
}

function answerQuestion(option) {
    const correctAnswer = questions[currentQuestionIndex].correct;

    if (option === correctAnswer) {
        showToast('Браво!', 'correct');
        userAnswers.push({ question: questions[currentQuestionIndex].question, answer: option, correct: true });
        currentQuestionIndex++;
        saveExamState();

        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            showResults();
        }
    } else {
        wrongGuesses++;
        userAnswers.push({ question: questions[currentQuestionIndex].question, answer: option, correct: false });
        showToast('Грешен отговор.', 'wrong');
        shakeElement('exam-screen');
    }
}

function saveExamState() {
    const state = {
        currentQuestionIndex: currentQuestionIndex,
        wrongGuesses: wrongGuesses,
        userAnswers: userAnswers
    };
    localStorage.setItem('examState', JSON.stringify(state));
}

function loadExamState() {
    const state = JSON.parse(localStorage.getItem('examState'));
    if (state) {
        currentQuestionIndex = state.currentQuestionIndex || 0;
        wrongGuesses = state.wrongGuesses || 0;
        userAnswers = state.userAnswers || [];
        
        // Check if the user has completed the exam
        if (currentQuestionIndex >= questions.length) {
            // Redirect to results screen if the exam is complete
            showResults();
        } else {
            displayQuestion();
        }
    } else {
        displayQuestion();
    }
}


function resetExam() {
    // Show a confirmation dialog
    const confirmation = window.confirm("Тва изтрива текущите ти отговори. Сигурна ли си?");

    if (confirmation) {
        localStorage.clear();
        location.reload(); // Reload the page to reset the state
    }
}


// Shake animation handler
function shakeElement(elementId) {
    const element = document.getElementById(elementId);
    element.classList.add('animate__animated', 'animate__shakeX');
    setTimeout(() => {
        element.classList.remove('animate__animated', 'animate__shakeX');
    }, 1000); // Remove class after animation
}

// Show toast notifications for correct/wrong answers
function showToast(message, type) {
    const toastElement = document.getElementById('toast');
    const toastBody = document.getElementById('toast-body');

    toastBody.textContent = message;
    toastElement.classList.remove('correct', 'wrong');

    if (type === 'correct') {
        toastElement.classList.add('correct');
    } else if (type === 'wrong') {
        toastElement.classList.add('wrong');
    }

    const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
    toast.show();
}

function showResults() {
    document.getElementById('exam-screen').classList.add('d-none');
    document.getElementById('results-screen').classList.remove('d-none');

    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = ''; // Clear previous results
    const examStatus = document.getElementById('exam-status');
    examStatus.textContent = `Завърши го с общо ${wrongGuesses} грешни опита.`;

    userAnswers.forEach((answer, index) => {
        // Safeguard: Check if the question for this index exists
        if (!questions[index]) return;

        // Create a new div for each question
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question-result', 'p-3', 'mb-3', 'cursor-pointer'); // Added cursor-pointer for better UX

        // Add border color based on whether the answer was correct on the first try
        if (answer.correct) {
            questionDiv.classList.add('border');
        } else {
            questionDiv.classList.add('border');
        }

        // Create a header for the question
        const questionHeader = document.createElement('h5');
        questionHeader.classList.add('question-header', 'mb-0');
        questionHeader.textContent = `Въпрос ${index + 1}: ${questions[index].question}`;

        // Append header to the question div
        questionDiv.appendChild(questionHeader);

        // Create a hidden details div that will show the options and wrong guesses
        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('question-details', 'd-none', 'mt-3');
        
        // Add the answer options as buttons
        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('options-buttons');

        questions[index].options.forEach((option, optionIndex) => {
            const optionButton = document.createElement('button');
            optionButton.classList.add('btn', 'btn-exam', 'me-2', 'mb-2');

            // Mark the correct answer with green color
            if (String.fromCharCode(65 + optionIndex) === questions[index].correct) {
                optionButton.classList.add('btn-success');
            } else {
                optionButton.classList.add('btn-secondary');
            }

            // Set the button text to display the option letter and the option itself
            optionButton.textContent = `${String.fromCharCode(65 + optionIndex)}: ${option}`;
            optionsDiv.appendChild(optionButton);
        });

        detailsDiv.appendChild(optionsDiv);

        // Append details to the question div
        questionDiv.appendChild(detailsDiv);

        // Add click event to the entire question div to toggle showing the details
        questionDiv.addEventListener('click', () => {
            detailsDiv.classList.toggle('d-none');
        });

        // Append the question div to the results list
        resultsList.appendChild(questionDiv);
    });
}


