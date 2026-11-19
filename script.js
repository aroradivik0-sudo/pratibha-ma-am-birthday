
/* LOADING SCREEN */

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
  }, 1200);
});


/* SCROLL REVEAL ANIMATIONS */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

revealElements.forEach((element) => {
  revealObserver.observe(element);
});


/* CHOCOLATE QUIZ */

const questions = [
  {
    question: "Which chocolate is known for its rich, intense flavour?",
    options: ["White chocolate", "Dark chocolate", "Milkshake"],
    correct: 1
  },
  {
    question: "Which of these is a white chocolate favourite?",
    options: ["Milkybar", "Dark chocolate", "Coffee"],
    correct: 0
  },
  {
    question: "Which delicious treat is also on the birthday favourites list?",
    options: ["Eclairs Puff", "Popcorn", "Potato chips"],
    correct: 0
  }
];

let currentQuestion = 0;
let quizScore = 0;
let answered = false;

const quizQuestion = document.getElementById("quiz-question");
const quizOptions = document.getElementById("quiz-options");
const quizFeedback = document.getElementById("quiz-feedback");
const quizNext = document.getElementById("quiz-next");
const quizProgress = document.getElementById("progress-fill");
const quizProgressText = document.getElementById("quiz-progress-text");

function loadQuestion() {
  answered = false;

  const question = questions[currentQuestion];

  quizQuestion.textContent = question.question;
  quizOptions.innerHTML = "";
  quizFeedback.textContent = "";

  quizProgress.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  quizProgressText.textContent =
    `QUESTION ${currentQuestion + 1} OF ${questions.length}`;

  question.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.className = "quiz-option";
    button.textContent = option;

    button.addEventListener("click", () => {
      checkAnswer(index, button);
    });

    quizOptions.appendChild(button);
  });

  quizNext.hidden = true;
}

function checkAnswer(index, selectedButton) {
  if (answered) return;

  answered = true;

  const correctIndex = questions[currentQuestion].correct;
  const buttons = quizOptions.querySelectorAll(".quiz-option");

  buttons.forEach((button, buttonIndex) => {
    button.disabled = true;

    if (buttonIndex === correctIndex) {
      button.classList.add("correct");
    }
  });

  if (index === correctIndex) {
    quizScore++;
    quizFeedback.textContent = "Correct! Excellent choice.";
  } else {
    selectedButton.classList.add("wrong");
    quizFeedback.textContent = "Not quite! The highlighted answer is correct.";
  }

  quizNext.hidden = false;
}

quizNext.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    quizQuestion.textContent = "Quiz completed!";
    quizOptions.innerHTML = "";

    quizFeedback.textContent =
      `You scored ${quizScore} out of ${questions.length}. Thank you for playing!`;

    quizNext.hidden = true;
    quizProgressText.textContent = "COMPLETED";

    quizProgress.style.width = "100%";

    const restartButton = document.createElement("button");
    restartButton.className = "primary-button";
    restartButton.textContent = "Play again";

    restartButton.addEventListener("click", () => {
      currentQuestion = 0;
      quizScore = 0;
      loadQuestion();
    });

    quizOptions.appendChild(restartButton);
  }
});

loadQuestion();


/* STAR-CATCHING GAME */

const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start-game");
const gameMessage = document.getElementById("game-message");

let score = 0;
let timeLeft = 15;
let gameInterval;
let starInterval;
let gameRunning = false;

function createStar() {
  if (!gameRunning) return;

  const star = document.createElement("button");

  star.className = "game-star";
  star.textContent = "✦";
  star.setAttribute("aria-label", "Catch star");

  const maxX = Math.max(0, gameArea.clientWidth - 45);
  const maxY = Math.max(0, gameArea.clientHeight - 45);

  star.style.left = `${Math.random() * maxX}px`;
  star.style.top = `${Math.random() * maxY}px`;

  star.addEventListener("click", () => {
    if (!gameRunning) return;

    score++;
    scoreDisplay.textContent = String(score).padStart(2, "0");
    star.remove();
  });

  gameArea.appendChild(star);

  setTimeout(() => {
    star.remove();
  }, 1400);
}

function endGame() {
  gameRunning = false;

  clearInterval(gameInterval);
  clearInterval(starInterval);

  gameArea.querySelectorAll(".game-star").forEach((star) => {
    star.remove();
  });

  gameMessage.style.display = "block";

  gameMessage.innerHTML = `
    <span>✦</span>
    <h3>Wonderful effort!</h3>
    <p>You caught ${score} stars. Ready for another round?</p>
  `;

  startButton.textContent = "Play again";
}

startButton.addEventListener("click", () => {
  if (gameRunning) return;

  score = 0;
  timeLeft = 15;
  gameRunning = true;

  scoreDisplay.textContent = "00";
  timerDisplay.textContent = "15";

  gameMessage.style.display = "none";

  gameArea.querySelectorAll(".game-star").forEach((star) => {
    star.remove();
  });

  startButton.textContent = "Game in progress...";

  createStar();

  starInterval = setInterval(createStar, 550);

  gameInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = String(timeLeft).padStart(2, "0");

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
});


/* BIRTHDAY GIFT REVEAL */

const giftButton = document.getElementById("gift-button");
const giftMessage = document.getElementById("gift-message");

giftButton.addEventListener("click", () => {
  giftMessage.classList.toggle("show");

  if (giftMessage.classList.contains("show")) {
    giftButton.textContent = "Close surprise";
  } else {
    giftButton.innerHTML = '<span class="gift-icon">✧</span> Open your surprise';
  }
});


/* NAVBAR SCROLL EFFECT */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 8px 30px rgba(23, 26, 53, 0.08)";
  } else {
    navbar.style.boxShadow = "none";
  }
});
