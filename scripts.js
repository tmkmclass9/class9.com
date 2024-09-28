// Import the functions you need from the Firebase SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getDatabase, ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACna9upt6rq1mOiAPEtcTOtrjCO4qgZJ4",
  authDomain: "reactions-e67ce.firebaseapp.com",
  projectId: "reactions-e67ce",
  storageBucket: "reactions-e67ce.appspot.com",
  messagingSenderId: "483152588425",
  appId: "1:483152588425:web:86fb3632ca5ebb97b76058",
  measurementId: "G-1ZZP6QEDHG",
  databaseURL: "https://reactions-e67ce-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Reaction counts
let reactions = {
  like: 0,
  heart: 0,
  care: 0,
  angry: 0
};

let currentReaction = null;

// Firebase reference for reactions
const reactionsRef = ref(db, 'reactions');

// Fetch and display reactions on page load
onValue(reactionsRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    reactions.like = data.like || 0;
    reactions.heart = data.heart || 0;
    reactions.care = data.care || 0;
    reactions.angry = data.angry || 0;
    updateAllReactionCounts();
  }
});

// Function to toggle reaction and update the count
window.toggleReaction = function (reaction) {
  if (currentReaction === reaction) {
    // Remove current reaction
    reactions[reaction]--;
    updateReactionCount(reaction);
    saveReactionsToDB();
    currentReaction = null;
  } else {
    // Remove previous reaction if any
    if (currentReaction) {
      reactions[currentReaction]--;
      updateReactionCount(currentReaction);
    }
    // Add new reaction
    reactions[reaction]++;
    updateReactionCount(reaction);
    saveReactionsToDB();
    currentReaction = reaction;
  }
};

// Save reactions to Firebase database
function saveReactionsToDB() {
  set(reactionsRef, reactions);
}

// Update the reaction count display
function updateReactionCount(reaction) {
  document.getElementById(`${reaction}-count`).textContent = reactions[reaction];
}

// Update all reaction counts
function updateAllReactionCounts() {
  updateReactionCount('like');
  updateReactionCount('heart');
  updateReactionCount('care');
  updateReactionCount('angry');
}

// Toggle navigation menu for mobile view
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

window.onload = function() {
  if (!sessionStorage.getItem('audioPlayed')) {
      const audio = document.getElementById('pageAudio');
      
      // Attempt to play the audio
      audio.play().then(() => {
          // Audio is playing
          sessionStorage.setItem('audioPlayed', 'true');
      }).catch(error => {
          // Log the error for debugging
          console.error('Audio playback failed:', error);
      });
  }
};

