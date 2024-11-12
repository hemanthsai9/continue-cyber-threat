const questions = [
  {
    question: "What is phishing?",
    answers: [
      { text: "A way of catching fish online", correct: false },
      { text: "A cyber attack that tricks users into providing sensitive information", correct: true },
      { text: "A method to encrypt data", correct: false },
      { text: "A type of firewall", correct: false }
    ]
  },
  {
    question: "Which of these is a strong password?",
    answers: [
      { text: "123456", correct: false },
      { text: "password", correct: false },
      { text: "Qw!5a#9RzL", correct: true },
      { text: "user1234", correct: false }
    ]
  },
  {
    question: "What should you do if you receive an email from an unknown sender?",
    answers: [
      { text: "Open it immediately", correct: false },
      { text: "Click on any links it contains", correct: false },
      { text: "Report it as spam or delete it", correct: true },
      { text: "Forward it to your friends", correct: false }
    ]
  },
  {
    question: "What is a firewall?",
    answers: [
      { text: "An internet browser", correct: false },
      { text: "A security system that monitors and controls incoming and outgoing network traffic", correct: true },
      { text: "A type of antivirus software", correct: false },
      { text: "A method to cool down servers", correct: false }
    ]
  }
];

const questionelement = document.getElementById("question"); // Matching the lowercase "question"
const answerbutton = document.getElementById("answer");
const nextbutton = document.getElementById("next_btn");

let currentquestionindex = 0;
let score = 0;
let questionAnswered = false; // Track whether the question has been answered

function startquiz() {
  currentquestionindex = 0;
  score = 0;
  nextbutton.innerHTML = "Next";
  questionAnswered = false;
  showQuestion();
}

function showQuestion() {
  // Clear previous answers before displaying new ones
  answerbutton.innerHTML = "";

  let currentquestion = questions[currentquestionindex];
  let questionno = currentquestionindex + 1;

  // Display the current question
  questionelement.innerHTML = questionno + ". " + currentquestion.question;

  // Create buttons for each answer option
  currentquestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    button.onclick = () => selectAnswer(answer, button); // Handle the answer selection
    answerbutton.appendChild(button);
  });
}

function selectAnswer(answer, button) {
  if (questionAnswered) return; // Prevent multiple answers for the same question

  questionAnswered = true;

  // Disable all answer buttons after selection
  const allButtons = document.querySelectorAll(".btn");
  allButtons.forEach(btn => btn.disabled = true);

  // Check if the selected answer is correct
  if (answer.correct) {
    score++;
    button.style.backgroundColor = "green"; // Indicate correct answer (optional styling)
  } else {
    button.style.backgroundColor = "red"; // Indicate incorrect answer (optional styling)
  }
  
  // Show the Next button
  nextbutton.style.display = "block";
}

function nextQuestion() {
  // Go to the next question if available
  currentquestionindex++;

  if (currentquestionindex < questions.length) {
    questionAnswered = false; // Reset for the next question
    showQuestion();
    nextbutton.style.display = "none"; // Hide Next button until an answer is selected
  } else {
    // End of quiz, show the score
    questionelement.innerHTML = `Quiz Complete! Your score is ${score}/${questions.length}`;
    answerbutton.innerHTML = ""; // Clear answers
    nextbutton.innerHTML = "Restart Quiz";
    nextbutton.onclick = startquiz; // Restart the quiz on next button click
  }
}

// Attach event listener to the "Next" button
nextbutton.addEventListener("click", nextQuestion);

// Hide Next button initially
nextbutton.style.display = "none";

// Start the quiz when the page loads
startquiz();
