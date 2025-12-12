// Quiz Questions Data
const quizQuestions = [
    {
        question: "1. What sound does a cat make?",
        answers: ["Bhau-Bhau", "Meow-Meow", "Oink-Oink"],
        correctAnswer: 1
    },
    {
        question: "2. What would you probably find in your fridge?",
        answers: ["Shoes", "Ice Cream", "Books"],
        correctAnswer: 1
    },
    {
        question: "3. What color are bananas?",
        answers: ["Blue", "Yellow", "Red"],
        correctAnswer: 1
    },
    {
        question: "4. How many stars are in the sky?",
        answers: ["Two", "Infinite", "One Hundred"],
        correctAnswer: 1
    }
];

// Quiz State
let currentQuestionIndex = 0;
let userAnswers = [];
let quizStarted = false;
let visitedQuestions = new Set();
let scoreTimer = null;
let scoreTimeout = null;

// Initialize Quiz
function initQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    quizStarted = true;
    visitedQuestions = new Set([0]); // Mark first question as visited
    displayQuestion();
    updateProgressIndicator();
    updateNavigationButtons();
}

// Display Current Question
function displayQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    const questionText = document.getElementById('questionText');
    const answersContainer = document.getElementById('answersContainer');
    const speechBubble = document.getElementById('speechBubble');
    const catPawGif = document.getElementById('catPawGif');
    
    // Mark current question as visited
    visitedQuestions.add(currentQuestionIndex);
    
    // Show decorative elements only on first question (index 0)
    if (currentQuestionIndex === 0) {
        speechBubble.style.display = 'flex';
        catPawGif.style.display = 'block';
    } else {
        speechBubble.style.display = 'none';
        catPawGif.style.display = 'none';
    }
    
    questionText.textContent = question.question;
    
    answersContainer.innerHTML = '';
    
    // Initialize userAnswers for this question if it doesn't exist
    if (!userAnswers[currentQuestionIndex]) {
        userAnswers[currentQuestionIndex] = [];
    }
    
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'answer-button';
        if (userAnswers[currentQuestionIndex].includes(index)) {
            button.classList.add('selected');
        }
        button.textContent = answer;
        button.addEventListener('click', () => selectAnswer(index));
        answersContainer.appendChild(button);
    });
}

// Select Answer (Once clicked, cannot be unclicked - allows multiple selections)
function selectAnswer(answerIndex) {
    // Initialize userAnswers for this question if it doesn't exist
    if (!userAnswers[currentQuestionIndex]) {
        userAnswers[currentQuestionIndex] = [];
    }
    
    // Only add selection if not already selected (no deselection allowed)
    const selectedAnswers = userAnswers[currentQuestionIndex];
    if (!selectedAnswers.includes(answerIndex)) {
        selectedAnswers.push(answerIndex);
        
        // Update button styles
        const buttons = document.querySelectorAll('.answer-button');
        buttons[answerIndex].classList.add('selected');
    }
    
    updateNavigationButtons();
}

// Update Progress Indicator
function updateProgressIndicator() {
    const progressIndicator = document.getElementById('progressIndicator');
    progressIndicator.innerHTML = '';
    
    quizQuestions.forEach((_, index) => {
        const line = document.createElement('div');
        line.className = 'progress-line';
        
        // If it's the current question, show partial fill (active)
        if (index === currentQuestionIndex) {
            line.classList.add('active');
        }
        // If it's a visited question (but not current), show fully black (completed)
        else if (visitedQuestions.has(index)) {
            line.classList.add('completed');
        }
        // Unvisited questions remain #E6E6E6 (default)
        
        progressIndicator.appendChild(line);
    });
}

// Update Navigation Buttons
function updateNavigationButtons() {
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const submitButton = document.getElementById('submitButton');
    
    // On the last question, hide previous button and show only submit
    if (currentQuestionIndex === quizQuestions.length - 1) {
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
        submitButton.style.display = 'flex';
        submitButton.disabled = false;
    } else {
        // Show previous button (disabled on first question)
        prevButton.style.display = 'flex';
        prevButton.disabled = currentQuestionIndex === 0;
        nextButton.style.display = 'flex';
        nextButton.disabled = false;
        submitButton.style.display = 'none';
    }
}

// Next Question
function nextQuestion() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        // Mark current question as visited before moving to next
        visitedQuestions.add(currentQuestionIndex);
        currentQuestionIndex++;
        // Mark new current question as visited
        visitedQuestions.add(currentQuestionIndex);
        displayQuestion();
        updateProgressIndicator();
        updateNavigationButtons();
    }
}

// Previous Question
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
        updateProgressIndicator();
        updateNavigationButtons();
    }
}

// Submit Quiz
function submitQuiz() {
    // Calculate Score
    // For multiple answers, check if the correct answer is included in the selected answers
    let correctAnswers = 0;
    quizQuestions.forEach((question, index) => {
        const selectedAnswers = userAnswers[index] || [];
        if (selectedAnswers.includes(question.correctAnswer)) {
            correctAnswers++;
        }
    });
    
    const score = Math.round((correctAnswers / quizQuestions.length) * 100);
    
    // Show Results
    showResults(score);
}

// Show Results Page
function showResults(score) {
    const quizContainer = document.querySelector('.quiz-container');
    const resultsContainer = document.getElementById('resultsContainer');
    const scoreNumber = document.getElementById('scoreNumber');
    const scorePercent = document.querySelector('.score-percent');
    
    // Clear any existing timers
    if (scoreTimer) {
        clearInterval(scoreTimer);
        scoreTimer = null;
    }
    if (scoreTimeout) {
        clearTimeout(scoreTimeout);
        scoreTimeout = null;
    }
    
    // Set initial score to 0
    scoreNumber.textContent = '0';
    // Hide percent sign when score is 0
    scorePercent.style.display = 'none';
    
    // Remove any existing animation classes
    quizContainer.classList.remove('slide-in-from-bottom');
    resultsContainer.classList.remove('slide-up', 'slide-in-from-bottom');
    
    // Show results container (positioned below viewport initially)
    resultsContainer.style.display = 'flex';
    resultsContainer.classList.add('slide-in-from-bottom');
    
    // Animate quiz container sliding up
    quizContainer.classList.add('slide-up');
    
    // Always show 62% fixed
    const fixedScore = 62;
    
    // Wait 1 second before starting animation
    scoreTimeout = setTimeout(() => {
        // Animate score from 0 to 35 very quickly, then jump to 62
        let currentScore = 0;
        scoreTimer = setInterval(() => {
            currentScore += 1;
            
            // Show percent sign when score is greater than 0
            if (currentScore > 0) {
                scorePercent.style.display = 'inline';
            }
            
            // If we reach 35, jump directly to 62
            if (currentScore === 35) {
                currentScore = fixedScore;
                scoreNumber.textContent = currentScore;
                clearInterval(scoreTimer);
                scoreTimer = null;
            } else if (currentScore < 35) {
                // Show numbers 1-35 with % - changing very fast so users can't see individual numbers
                scoreNumber.textContent = currentScore;
            }
        }, 20); // Very fast interval (20ms) - numbers change too quickly to see individually
    }, 1000);
    
    // Hide quiz container after animation completes
    setTimeout(() => {
        quizContainer.style.display = 'none';
        quizContainer.classList.remove('slide-up');
    }, 1200);
}

// Start Again
function startAgain() {
    const quizContainer = document.querySelector('.quiz-container');
    const resultsContainer = document.getElementById('resultsContainer');
    const scoreNumber = document.getElementById('scoreNumber');
    const scorePercent = document.querySelector('.score-percent');
    
    // Clear any running score animation timers
    if (scoreTimer) {
        clearInterval(scoreTimer);
        scoreTimer = null;
    }
    if (scoreTimeout) {
        clearTimeout(scoreTimeout);
        scoreTimeout = null;
    }
    
    // Reset all quiz state
    currentQuestionIndex = 0;
    userAnswers = [];
    quizStarted = false;
    visitedQuestions = new Set();
    
    // Reset score display
    scoreNumber.textContent = '0';
    scorePercent.style.display = 'none';
    
    // Remove any existing animation classes
    resultsContainer.classList.remove('slide-in-from-bottom');
    quizContainer.classList.remove('slide-up', 'slide-in-from-bottom', 'slide-in-from-top');
    
    // Show quiz container (positioned above viewport initially)
    quizContainer.style.display = 'flex';
    quizContainer.classList.add('slide-in-from-top');
    
    // Animate results container sliding up
    resultsContainer.classList.add('slide-up');
    
    // Hide results container after animation completes
    setTimeout(() => {
        resultsContainer.style.display = 'none';
        resultsContainer.classList.remove('slide-up');
        quizContainer.classList.remove('slide-in-from-top');
    }, 1200);
    
    // Reinitialize quiz from the beginning
    initQuiz();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initQuiz();
});

