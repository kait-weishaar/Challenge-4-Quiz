//Link to html elements
              const timerEl = document.getElementById('countdown');
              const quizContainerEl = document.getElementById('quiz');
              let descriptionEl = document.getElementById('description');
              const messageEl = document.getElementById('msg-display');
              let feedbackEl = document.getElementById('feedback');
              const startbtnEl = document.getElementById('startbtn');
              const highScores = document.getElementById('highScores');
              const time = document.getElementById('timer');
              answerDiv = document.getElementById('button-container'),
              questionDiv = document.getElementById('msg-display'),
              



 //Link button to high scores
      highScores.onclick = function() {displayHighScores();};
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
            
            // remove any existing buttons from answerDiv
            answerDiv.innerHTML = '';
            feedbackEl.classList.remove("invisible");
  
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
                  feedbackEl.textContent= 'Correct!';
                } else {
                  feedbackEl.textContent= 'Wrong!';
                  timeLeft -= 10;
                }
          
          // if there are more questions to be displayed, 
          // run the function again
          if(questions.length && timeLeft > 0) {
              displayQuestion(questions.shift()); 
          } else {
            clearInterval(timeInterval);
              let score = timeLeft;
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
          feedbackEl.setAttribute('class', 'invisible');

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
          
          form.addEventListener('submit', function(e) {
            e.preventDefault();
            submitForm(input, score)
          })
}

function getLocalStorage() {
  return JSON.parse(localStorage.getItem('highScoresArray')) || []
}

function setLocalStorage(stuffToAdd) {
  var currentLS = getLocalStorage(); // [{}] || [] 
  currentLS.push(stuffToAdd);
  currentLS.sort((a, b) => b.score - a.score);
  currentLS.splice(5);
  localStorage.setItem('highScoresArray', JSON.stringify(currentLS));
  return;
}

function submitForm(input, score) {
    // construct onject to be stringified and added to local storage
    let tempObj = {name: input.value, score: score};
    

    // when we set localstorage it overwrites everything there so instead of just writing to local storage, first we get whats in the storage and then add our element to the parsed array, then stringify it all and put it in the ls
    setLocalStorage(tempObj);
       

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
     descriptionEl.textContent='';

     //Set page content
     messageEl.textContent= 'High Scores';
     console.log(score + "some text");
     let scoreContainer = document.createElement('ul');
     scoreContainer.classList.add("unstyled");
     descriptionEl.appendChild(scoreContainer);
     let scoresArray = getLocalStorage();
     scoresArray.forEach(element => {
     let scoreItem = document.createElement('li');
     scoreItem.textContent = `${element.name}: ${element.score}`
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
     clear.onclick = function() {
       localStorage.clear()
       displayHighScores();
      };
  
}   