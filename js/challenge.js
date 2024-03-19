// Declare variables to store the state of the counter, likes, and comments
let counter = 0;
let likes = {};
let comments = [];

// Get references to the necessary HTML elements
const counterDisplay = document.getElementById('counter');
const plusButton = document.getElementById('plus');
const minusButton = document.getElementById('minus');
const likeButtons = document.getElementsByClassName('heart');
const pauseButton = document.getElementById('pause');
const resumeButton = document.getElementById('pause');
const commentInput = document.getElementById('comment-input');
const commentList = document.getElementById('list');

// Function to update the counter display
function updateCounterDisplay() {
  counterDisplay.textContent = counter;
}

// Function to increment the counter
function incrementCounter() {
  counter++;
  updateCounterDisplay();
}

// Function to decrement the counter
function decrementCounter() {
  counter--;
  updateCounterDisplay();
}

// Function to handle "like" button clicks
function handleLikeButtonClick(event) {
  const number = counterDisplay.textContent;
  if (likes[number]) {
    likes[number]++;
  } else {
    likes[number] = 1;
  }
  // Update the display of the like count for the specific number
  const likeCountDisplay = document.getElementById(`like-count-${number}`);
  if (likeCountDisplay) {
    likeCountDisplay.textContent = likes[number];
  } else {
    const likeItem = document.createElement('li');
    likeItem.innerHTML = `${number} has been liked <span id="like-count-${number}">${likes[number]}</span> time(s)`;
    document.getElementsByClassName('likes')[0].appendChild(likeItem);
  }
}

// Function to handle pause button click
function handlePauseButtonClick() {
  if (timer) {
    clearInterval(timer);
    plusButton.disabled = true;
    minusButton.disabled = true;
    for (const button of likeButtons) {
      button.disabled = true;
    }
    pauseButton.textContent = 'Resume';
    pauseButton.removeEventListener('click', handlePauseButtonClick);
    pauseButton.addEventListener('click', handlePauseButtonClick);
    timer = null;
  } else {
    timer = setInterval(incrementCounter, 1000);
    plusButton.disabled = false;
    minusButton.disabled = false;
    for (const button of likeButtons) {
      button.disabled = false;
    }
    pauseButton.textContent = 'Pause';
    pauseButton.removeEventListener('click', handlePauseButtonClick);
    pauseButton.addEventListener('click', handlePauseButtonClick);
  }
}

// Function to handle comment form submission
function handleCommentFormSubmit(event) {
  event.preventDefault();
  console.log('Form submitted!');
  const commentText = commentInput.value;
  comments.push(commentText);
  // Clear the input field
  commentInput.value = '';
  // Update the display of comments
  commentList.innerHTML = '';
  for (const comment of comments) {
    const commentItem = document.createElement('li');
    commentItem.textContent = comment;
    commentList.appendChild(commentItem);
  }
}

// Add event listeners to buttons
plusButton.addEventListener('click', incrementCounter);
minusButton.addEventListener('click', decrementCounter);
for (const button of likeButtons) {
  button.addEventListener('click', handleLikeButtonClick);
}
pauseButton.addEventListener('click', handlePauseButtonClick);

// Start the timer
let timer = setInterval(incrementCounter, 1000);
