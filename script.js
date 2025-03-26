document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const splashScreen = document.getElementById('splash-screen');
    const splashText = document.getElementById('splash-text');
    const gameContainer = document.getElementById('game-container');
    const nameInputScreen = document.getElementById('name-input-screen');
    const gameScreen = document.getElementById('game-screen');
    const scoreboardScreen = document.getElementById('scoreboard-screen');
    const playerNameInput = document.getElementById('player-name');
    const startGameBtn = document.getElementById('start-game-btn');
    const currentPlayerSpan = document.getElementById('current-player');
    const currentLevelSpan = document.getElementById('current-level');
    const currentScoreSpan = document.getElementById('current-score');
    const numberDisplay = document.getElementById('number-display');
    const userInput = document.getElementById('user-input');
    const submitBtn = document.getElementById('submit-btn');
    const feedback = document.getElementById('feedback');
    const scoreboardBtn = document.getElementById('scoreboard-btn');
    const backToGameBtn = document.getElementById('back-to-game-btn');
    const scoreboardTable = document.getElementById('scoreboard-table').querySelector('tbody');
    const correctSound = document.getElementById('correct-sound');
    const wrongSound = document.getElementById('wrong-sound');

    // Game Variables
    let playerName = '';
    let currentNumber = '';
    let currentLevel = 1;
    let score = 0;
    let gameStartTime = 0;
    let gameActive = false;
    let displayTimeout = null;

    // Initialize splash screen sequence
    setTimeout(() => {
        splashText.textContent = "Loading.....";
    }, 500);

    setTimeout(() => {
        splashScreen.style.opacity = '0';
        setTimeout(() => {
            splashScreen.classList.add('hidden');
            gameContainer.classList.remove('hidden');
        }, 500);
    }, 1000);

    // Initialize local storage for scores if not exists
    if (!localStorage.getItem('memoryGameScores')) {
        localStorage.setItem('memoryGameScores', JSON.stringify([]));
    }

    // Event Listeners
    startGameBtn.addEventListener('click', startGame);
    submitBtn.addEventListener('click', checkAnswer);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
    scoreboardBtn.addEventListener('click', showScoreboard);
    backToGameBtn.addEventListener('click', () => {
        scoreboardScreen.classList.add('hidden');
        if (gameActive) {
            gameScreen.classList.remove('hidden');
        } else {
            nameInputScreen.classList.remove('hidden');
        }
    });

    // Game Functions
    function startGame() {
        playerName = playerNameInput.value.trim();
        if (!playerName) {
            alert('Please enter your name');
            return;
        }

        currentPlayerSpan.textContent = playerName;
        nameInputScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        gameActive = true;
        gameStartTime = Date.now();
        startRound();
    }

    function startRound() {
        currentNumber = generateNumber(currentLevel);
        numberDisplay.textContent = currentNumber;
        userInput.value = '';
        userInput.disabled = true;
        submitBtn.disabled = true;
        feedback.textContent = '';

        if