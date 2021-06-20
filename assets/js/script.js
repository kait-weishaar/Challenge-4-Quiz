//TODO
// make view high scores a button
//Time display using set interval time loop
//intial message display and initial button display
//event listener for initial button displays initial question object
//array of question objects
//
//event listener for question if/else statement 
     //if correct: display correct, next question.
     //if incorrect: display wrong!, next question
const timerEl = document.getElementById('countdown');
const quizContainerEl = document.getElementById('quiz');
const btnContainerEl = document.getElementById('button-container');
const descriptionEl = document.getElementById('description');
const messageEl = document.getElementById('msg-display');
const answersEl = document.getElementById('answers');

//Initial screen
timerEl.textContent = '0';
messageEl.textContent= 'Coding Quiz Challenge';
descriptionEl.textContent = "Try to answer all of the questions within the time limit. Keep in mind an incorrect answer will deduct ten seconds from the remaining time!"

var startButton = document.createElement("button");
startButton.textContent = 'Start';
startButton.className = "centered-button"
btnContainerEl.appendChild(startButton);

function countdown() {
  let timeLeft = 75;

  const timeInterval = setInterval(function() {
   if (timeLeft >= 0) {
      timerEl.textContent = timeLeft;
    timeLeft--;
      console.log(timeLeft)
    } else {
      //displayEndMessage();
      clearInterval(timeInterval);
    }
  }, 1000);
}
startButton.onclick= function () {countdown()};

  //Display end message and score
 // function displayEndMessage() {
 //   messageEl.textContent= 'All Done!';
 // }
  
 //function displayQuestions() {

 //}

