//Link to html elements
const timerEl = document.getElementById('countdown');
const quizContainerEl = document.getElementById('quiz');
//const btnContainerEl = document.getElementById('button-container');
let descriptionEl = document.getElementById('description');
const messageEl = document.getElementById('msg-display');
let feedbackEl = document.getElementById('feedback');
const startbtnEl = document.getElementById('startbtn');
const highScores = document.getElementById('highScores');
const time = document.getElementById('timer');
answerDiv = document.getElementById('button-container'),
questionDiv = document.getElementById('msg-display'),
feedbackEl = document.getElementById('feedback');



//Link button to high scores
highScores.onclick = displayHighScores;
var questions = []


//Make function that can refill array, since using shift method
function resetQuestions() {
      questions= [ {
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
  ]
}


//Initial screen
function displayInitial() {
//Reset/empty questions to make game replayable
answerDiv.innerHTML = '';

//Set class attributes
startbtnEl.setAttribute('class', 'startbtn');
descriptionEl.setAttribute('class', 'description');
timerEl.setAttribute('class', 'countdown');
highScores.setAttribute('class', 'highScores');
time.setAttribute('class', 'timer');

//Set initial content
timerEl.textContent = '0';
messageEl.textContent= 'Coding Quiz Challenge';
descriptionEl.textContent = "Try to answer all of the questions within the time limit. Keep in mind an incorrect answer will deduct ten seconds from the remaining time!"
}

//Call displayInitial so it's loaded first   
displayInitial();

//Define empty variables for scoping
let timeLeft;
let timeInterval; 
let score;

//Define timer function so that it keeps score and if time runs out the game ends
function countdown() {
timeInterval = setInterval(function() {
if (timeLeft >= 0) {
timerEl.textContent = timeLeft;
timeLeft--;

} else {
//End game
displayEndMessage();
clearInterval(timeInterval);
}
}, 1000);
}

//Start function to call other functions, reset timer, and hide intial page elements
const startGame = function() {
  //hide button
  startbtnEl.setAttribute('class', 'invisible');
  descriptionEl.setAttribute('class', 'invisible');

  timeLeft = 75; //reset time
  resetQuestions(); //refill array
  countdown();
  displayQuestion(questions.shift());
}

//Link start button to start function
startbtnEl.onclick= function () {
startGame()

};

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
// the user was right display
if(id === q.answerIdx) {
 alert('correct')
//feedbackEl.textContent= 'Correct!';
} else {
//feedbackEl.textContent= 'Wrong!';
alert('wrong');
timeLeft -= 10;
}

// if there are more questions to be displayed, 
// run the function again
if(questions.length && timeLeft > 0) {
displayQuestion(questions.shift()); 
} else {
clearInterval(timeInterval);
let score = timeLeft;
//timerEl.textContent = score;
console.log(score);
displayEndMessage();

}                    
}

// add the button to the answerDiv
answerDiv.appendChild(btn);        
}
}



function displayEndMessage() {
console.log("function invoked");
descriptionEl.classList.remove("invisible");
score = timerEl.textContent;   //Save end time as the score
messageEl.textContent= 'All Done!';  
descriptionEl.textContent = "Your final score is " + score;
answerDiv.innerHTML = ''; //Clear answer options

//Create the form with input and submit
let form = document.createElement('form');
let input = document.createElement('input');
  input.setAttribute("type", "text");
  input.setAttribute("name", "Name");
  input.setAttribute("placeholder", "Name");
let submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "Submit");
answerDiv.appendChild(form);
form.appendChild(input);
form.appendChild(submit);



//Create a function that stores form input and score to local storage, and calls high scores page

submit.onclick = function() {submitForm(input, score);}
}


submitForm = function(input, score) {
localStorage.setItem("name", input.value);
localStorage.setItem("score", score);
console.log(localStorage.getItem("name"));
let highScoresArray = localStorage.getItem("highScoresArray");
if (highScoresArray) {
highScoresArray = JSON.parse(highScoresArray);
highScoresArray.push(scoreObject);

localStorage.setItem("highScoresArray", JSON.stringify(highScoresArray));
} else {
let array = [scoreObject];
localStorage.setItem("highScoresArray", JSON.stringify(array));
}
//Create object to hold score and name
let scoreObject = {
score: score,
name: input.value
};

highScoresArray.sort( (a,b) => {
return b.score - a.score;
})

highScoresArray.splice(5);

//Display highscore page
displayHighScores(); 

};




function displayHighScores() {


//Clear/hide unecessary elements
timerEl.setAttribute('class', 'invisible');
highScores.setAttribute('class', 'invisible');
time.setAttribute('class', 'invisible');
startbtnEl.setAttribute('class', 'invisible');
answerDiv.innerHTML = '';



//Set page content
messageEl.textContent= 'High Scores';
console.log(score + "some text");
let scoreContainer = document.createElement('ul');
descriptionEl.appendChild(scoreContainer);
let scoresArray = JSON.parse(localStorage.getItem("highScoresArray"));
scoresArray.forEach(element => {
let scoreItem = document.createElement('li');
scoreItem.textContent = element;
scoreContainer.appendChild(scoreItem);
});


//Create back button
back = document.createElement('button');
answerDiv.appendChild(back);
back.onclick = displayInitial;
back.textContent = "Back";

//Create clear button
clear = document.createElement('button');
answerDiv.appendChild(clear);
clear.textContent = "Clear High Scores";
clear.onclick = localStorage.clear();





}   





















//let scores = document.createElement('p');
//answerDiv.appendChild(scores)
//scores.textContent= localStorage.getItem('name')
///checkHighScore(account.score);



//Display end message and score
// function displayEndMessage() {
//   messageEl.textContent= 'All Done!';
// }

//function displayQuestions() {

//}


//function checkHighScore(score) {
//const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
// const lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.score ?? 0;

// if (score > lowestScore) {
//   saveHighScore(score, highScores); // TODO
//   showHighScores(); // TODO
//   }
// }

// const newScore = { score, name };

// function saveHighScore(score, highScores) {
//   const name = prompt('You got a highscore! Enter name:');
//   const newScore = { score, name };

//   // 1. Add to list
//   highScores.push(newScore);

//   // 2. Sort the list
//   highScores.sort((a, b) => b.score - a.score);

//   // 3. Select new list
//   highScores.splice(NO_OF_HIGH_SCORES);

//   // 4. Save to local storage
//   localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));
// };

// const highScoreList = document.getElementById(HIGH_SCORES);

// highScoreList.innerHTML = highScores.map((score) => 
//   `<li>${score.score} - ${score.name}`
// );

// function showHighScores() {
//   const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
//   const highScoreList = document.getElementById(HIGH_SCORES);

//   highScoreList.innerHTML = highScores
//     .map((score) => `<li>${score.score} - ${score.name}`)
//     .join('');
// }

 // localStorage.setItem("name", input.value);
        // localStorage.setItem("score", score);
        // console.log(localStorage.getItem("name"));
        // let highScoresArray = localStorage.getItem("highScoresArray");
        // if (highScoresArray) {
        //   highScoresArray = JSON.parse(highScoresArray);
        //   highScoresArray.push(score);
        
        //   localStorage.setItem("highScoresArray", JSON.stringify(highScoresArray));
        // } else {
        //   let array = [score];
        //   localStorage.setItem("highScoresArray", JSON.stringify(array));
        // }
         //Create object to hold score and name
        //  let scoreObject = {
        //    score: score,
         // name: input.value
        // };

        // highScoresArray.sort( (a,b) => {
        //   return b.score - a.score;
        // })

        // highScoresArray.splice(5);


        // let submitFormHandler = function(event) {
  //   event.preventDefault();
  //   localStorage.setItem("name", input.value);
  //   localStorage.setItem("score", score);
  //   //console.log(localStorage.getItem("name"));
  //   let highScoresArray = localStorage.getItem("highScoresArray");
  //   if (highScoresArray) {
  //     highScoresArray = JSON.parse(highScoresArray);
  //     highScoresArray.push(scoreObject);
    
  //     localStorage.setItem("highScoresArray", JSON.stringify(highScoresArray));
  //   } else {
  //     let array = [scoreObject];
  //     localStorage.setItem("highScoresArray", JSON.stringify(array));
  //   }
  //   //Create object to hold score and name
  //   let scoreObject = {
  //     score: score,
  //     name: input.value
  //   };

  //   highScoresArray.sort( (a,b) => {
  //     return b.score - a.score;
  //   })

//     highScoresArray.splice(5);

//       //Display highscore page
//       displayHighScores(); 

// };

 //let scores = document.createElement('p');
     //answerDiv.appendChild(scores)
     //scores.textContent= localStorage.getItem('name')
     ///checkHighScore(account.score);



  //Display end message and score
 // function displayEndMessage() {
 //   messageEl.textContent= 'All Done!';
 // }
  
 //function displayQuestions() {

 //}
 

//function checkHighScore(score) {
  //const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
  // const lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.score ?? 0;
  
  // if (score > lowestScore) {
  //   saveHighScore(score, highScores); // TODO
  //   showHighScores(); // TODO
//   }
// }

// const newScore = { score, name };

// function saveHighScore(score, highScores) {
//   const name = prompt('You got a highscore! Enter name:');
//   const newScore = { score, name };
  
//   // 1. Add to list
//   highScores.push(newScore);

//   // 2. Sort the list
//   highScores.sort((a, b) => b.score - a.score);
  
//   // 3. Select new list
//   highScores.splice(NO_OF_HIGH_SCORES);
  
//   // 4. Save to local storage
//   localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));
// };

// const highScoreList = document.getElementById(HIGH_SCORES);

// highScoreList.innerHTML = highScores.map((score) => 
//   `<li>${score.score} - ${score.name}`
// );

// function showHighScores() {
//   const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
//   const highScoreList = document.getElementById(HIGH_SCORES);
  
//   highScoreList.innerHTML = highScores
//     .map((score) => `<li>${score.score} - ${score.name}`)
//     .join('');
// }