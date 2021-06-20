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
//const btnContainerEl = document.getElementById('button-container');
const descriptionEl = document.getElementById('description');
const messageEl = document.getElementById('msg-display');
//const feedbackEl = document.getElementById('feedback');
const startbtnEl = document.getElementById('startbtn');


var questions = [
     {
         question: 'Commonly used data types do NOT include:',
         options: ["Strings", "Booleans", "Numbers", "Alerts"],
         answerIdx: 3
     },
     {
         question: 'Arrays in Javascript can be used to contain the following:',
         options: ["Numbers and strings", "Booleans", "Arrays", "All of the above"],
         answerIdx: 3
     },
     {
         question:'The condition in an if/else statement is enclosed in ',
         options:["Back ticks", "Quotation Marks", "Paranthesis", "Curly brackets"],
         answerIdx: 2
    },
    {
     question:'String values must be enclosed in _______ when being assigned to variables',
     options:["Back ticks", "Quotation Marks", "Paranthesis", "Curly brackets"],
     answerIdx: 1
    },
    {
     question:'Iterating over a data set can be achieved through',
     options:["for loop", "while loop", "setInterval", "All of the above"],
     answerIdx: 3
 },

 ],
 i,
 
 numQuestions = 0,
 answerDiv = document.getElementById('button-container'),
 questionDiv = document.getElementById('msg-display'),
 feedbackEl = document.getElementById('feedback');

//Initial screen
timerEl.textContent = '0';
messageEl.textContent= 'Coding Quiz Challenge';
descriptionEl.textContent = "Try to answer all of the questions within the time limit. Keep in mind an incorrect answer will deduct ten seconds from the remaining time!"



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
startbtnEl.onclick= function () {
     startGame()
};

const startGame = function() {
     //hide button
     startbtnEl.setAttribute('class', 'invisible');
     descriptionEl.setAttribute('class', 'invisible');


     countdown();
     displayQuestion(questions.shift);
}





function displayQuestion(q) {  
     // display the question itself
     questionDiv.innerHTML = q.question;
     feedbackEl.textContent= '';
     // remove any existing buttons from answerDiv
     answerDiv.innerHTML = '';
     
     // for each option in the 'options' array, create a button
     for(i = 0; i < q.options.length; i++) {
         btn = document.createElement('button');
         btn.innerHTML = q.options[i];
         btn.setAttribute('id',i);
     
         // create the click handler for the button
         btn.onclick = function() {
             var id = parseInt(this.getAttribute('id'),10);
             
             // if the id of the button matches the answer index,
             // the user was right, so increment numRight and display it
             if(id === q.answerIdx) {
               feedbackEl.textContent= 'Correct!';
             } else {
               feedbackEl.textContent= 'Correct!';
             }
             
             // if there are more questions to be displayed, 
             // run the function again
             if(questions.length) {
                 displayQuestion(questions.shift()); 
             } else {
                 alert('Done!');
             }                    
         }
             
         // add the button to the answerDiv
         answerDiv.appendChild(btn);        
     }
 }


  //Display end message and score
 // function displayEndMessage() {
 //   messageEl.textContent= 'All Done!';
 // }
  
 //function displayQuestions() {

 //}

