const loginPage = document.getElementById('login-page');
const countdownPage = document.getElementById('countdown-page');
const birthdayPage = document.getElementById('birthday-page');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const countdownDisplay = document.getElementById('countdown');
const messageBtn = document.getElementById('message-btn');
const dailyMessage = document.getElementById('daily-message');
const birthdayAudio = document.getElementById('birthday-audio');

// Daily messages array (May 1 to May 15)
// const messages = [
//     "15 days to your big day! Here’s to a woman who shines brighter every year. 🖤",
//     "14 days left! Your 27th is going to be epic, just like you.",
//     "13 days to go! Get ready for a celebration as bold as your spirit.",
//     "12 days! You’re about to make 27 look absolutely stunning.",
//     "11 days left! Your birthday is coming, and it’s going to be unforgettable.",
//     "10 days to go! Here’s to a year full of love and adventure.",
//     "9 days! The countdown is on for your special day. 🖤",
//     "8 days left! You’re a star, and your 27th will shine bright.",
//     "7 days to go! One week until we celebrate YOU!",
//     "6 days! The world is better with you in it, and we’re almost there!",
//     "5 days left! Your birthday is so close, and it’s going to be amazing.",
//     "4 days to go! Get ready for a day as beautiful as you are.",
//     "3 days! The excitement is building for your 27th!",
//     "2 days left! Almost time to pop the confetti and celebrate you. 🖤",
//     "Tomorrow’s the day! Get ready for a birthday as unforgettable as you are."
// ];

const messages = [
    "15 days to your special day! Your light brightens every room you walk into — may this birthday reflect just how deeply you’re loved. 🖤",
    "14 days left! You’re stepping into 27 with grace, strength, and beauty — and I can’t wait to celebrate the incredible woman you are becoming.",
    "13 days to go! Every year, you redefine what it means to be strong, kind, and radiant. Here’s to a celebration worthy of your heart.",
    "12 days! You’re not just turning 27 — you’re stepping into a chapter full of dreams, laughter, and love you truly deserve.",
    "11 days left! Life shines a little brighter with you in it. Let’s make this birthday one for the books, just like your story so far.",
    "10 days to go! May 27 bring you peace in your soul, love in your life, and endless joy — because that’s what you give to others effortlessly.",
    "9 days! The countdown to you is on — a beautiful soul who inspires, uplifts, and loves so deeply. 🖤",
    "8 days left! There’s only one you in this world, and that alone is worth celebrating for a lifetime.",
    "7 days to go! In just one week, we’ll celebrate your presence, your journey, and all the light you bring into people’s lives.",
    "6 days! You’ve touched so many hearts just by being yourself — this birthday is a tribute to everything you are and everything still to come.",
    "5 days left! Your birthday is almost here, and I hope it reflects all the love, beauty, and kindness you carry within.",
    "4 days to go! May this year wrap around you like a warm hug — filled with joy, growth, and moments that remind you how cherished you are.",
    "3 days! Each day brings us closer to celebrating someone who brings so much meaning into the lives around her.",
    "2 days left! Let’s get ready to honor the heart, laughter, and light you bring into the world. 🖤",
    "Tomorrow’s the day! May your birthday be as unforgettable and beautiful as the soul we’re celebrating."
];


// Initialize default credentials in LocalStorage (for simplicity)
if (!localStorage.getItem('credentials')) {
    localStorage.setItem('credentials', JSON.stringify({ username: 'birthdaygirl', password: '27rocks' }));
}

// Handle login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const stored = JSON.parse(localStorage.getItem('credentials'));

    if (username === stored.username && password === stored.password) {
        loginPage.classList.add('hidden');
        updateCountdown(); // Check date and show appropriate page
    } else {
        loginError.textContent = 'Invalid username or password.';
    }
});

// Calculate days until May 16, 2025
const birthdayDate = new Date('2025-05-16T00:00:00');
function updateCountdown() {
    const now = new Date();
    const timeDiff = birthdayDate - now;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysLeft > 0) {
        countdownPage.classList.remove('hidden');
        countdownDisplay.textContent = `${daysLeft} day${daysLeft === 1 ? '' : 's'} to go!`;
        // Animate page load with GSAP
        gsap.fromTo(countdownPage, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 });
    } else if (daysLeft === 0) {
        countdownPage.classList.add('hidden');
        birthdayPage.classList.remove('hidden');
        triggerConfetti();
        gsap.fromTo(birthdayPage, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 });
    } else {
        countdownPage.classList.remove('hidden');
        countdownDisplay.textContent = "Happy Birthday!";
    }
}

// Show daily message based on current date
function showDailyMessage() {
    const now = new Date();
    const dayIndex = Math.min(15 - Math.ceil((birthdayDate - now) / (1000 * 60 * 60 * 24)), 14);
    if (dayIndex >= 0 && dayIndex < messages.length) {
        dailyMessage.textContent = messages[dayIndex];
        dailyMessage.classList.add('fade-in');
        // Reset animation for subsequent clicks
        dailyMessage.addEventListener('animationend', () => {
            dailyMessage.classList.remove('fade-in');
        }, { once: true });
    }
}

// Confetti animation for birthday splash
function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FF69B4', '#FFFFFF']
    });
}

// Play birthday audio
function playAudio() {
    birthdayAudio.play().catch(() => {
        console.log('Audio playback requires user interaction.');
    });
}

// Event listeners
messageBtn.addEventListener('click', showDailyMessage);
window.addEventListener('load', () => {
    loginPage.classList.remove('hidden');
});
