var quizButtons = document.createElement("ul");
quizContainerEl.appendChild(btnContainerEl)
var startButton = document.createElement("button");
startButton.textContent = 'Start';
startButton.className = "centered-button"
btnContainerEl.appendChild(startButton);


function countdown() {
  
  if (timeLeft > 0) {
     const timeInterval = setInterval(function() {
          timerEl.textContent = timeLeft;
          timeLeft--;
       }, 1000);
     console.log(timeLeft)
   } else {
     //displayEndMessage();
     clearInterval(timeInterval);
     displayEndMessage();
   }
  
}


 const answersEl = document.getElementById('answers');

const myQuestions=[
    {question:'Commonly used data types do NOT include:',
      answers: {
          a: "Strings",
          b: "Booleans",
          c: "Numbers",
          d: "Alerts"
      },
      correctAnswer: "d"
},

{question:'Arrays in Javascript can be used to contain the following:',
      answers: {
          a: "Numbers and strings",
          b: "Booleans",
          c: "Arrays",
          d: "All of the above"
      },
      correctAnswer: "d"
},

{question:'The condition in an if/else statement is enclosed in ',
      answers: {
          a: "Back ticks",
          b: "Quotation Marks",
          c: "Paranthesis",
          d: "Curly brackets"
      },
      correctAnswer: "c"
},

{question:'String values must be enclosed in _______ when being assigned to variables',
      answers: {
        a: "Back ticks",
        b: "Quotation Marks",
        c: "Paranthesis",
        d: "Curly brackets"
      },
      correctAnswer: "b"
},

{question:'Iterating over a data set can be achieved through',
      answers: {
        a: "for loop",
        b: "while loop",
        c: "setInterval",
        d: "All of the above"
      },
      correctAnswer: "d"
},
]
myQuestions.forEach(question => {
  console.log(question);
  const answer = question.question;
  if (answer === question.answer) {
      correctionEl.textContent= "Correct!";
  } else {
    correctionEl.textContent= "Wrong!";
    timeLeft -= 10;
  }
});

function buildQuiz(){
    // variable to store the HTML output
    const output = [];
  
    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
  
        // variable to store the list of possible answers
        const answers = [];
  
        // and for each available answer...
        for(letter in currentQuestion.answers){
  
          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }
  
        // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join('')} </div>`
      );
    }
  );

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join('');
}