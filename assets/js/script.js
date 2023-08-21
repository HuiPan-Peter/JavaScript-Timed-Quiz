
//empty string var to hold user inputted answer
var answer = '';

//final score variable
score = 0;

//var to break startTimer function. Must match Timer var. 
timeLeft = 60;

//created an array of objects containing questions, options, and answers
var questions = [
{question: "How does a WHILE loop start?",
options: ['a. while (i <= 10)','b. while i = 10','c. while (i <=10; i++)'],
answer: 'a'}, 
{question: "How does a FOR loop start?",
options: ['a. for (i = 0; i <= 5)','b. for i = [1, 5]','c. for (i = 0; i <= 5; i++)', 'd. for (i <=5; i++)'],
answer: 'c'}, 
{question: "How can you add a comment in a JavaScript?",
options: ['a. "this is a comment','b. //this is a comment','c. <!--this is a comment-->', 'd. /* this is a comment*/'],
answer: 'b'}, 
{question: "What is the correct way to write a JavaScript array?",
options: ['a. colors = 1 = ("red"), 2 = ("green"), 3 = ("blue)','b. colors = ["red", "green", "blue"]','c. colors = "red","blue","green"', 'd. colors = (1:"red", 2:"green", 3:"blue"'],
answer: 'b'}, 
{question: "Which event occurs when the user clicks on an HTML element?",
options: ['a. onChange','b. onMouseClick','c. onMouseOver', 'd. onClick'], 
answer: 'd'}, 
];

//after user clicks on homepage start button, new question is loaded and timer started
window.onload = function() {
    startTimer();
    newQuestion();
    // localStorage.clear();
};

//create a function to start Timer
function startTimer() {
    //seconds to start countdown, can be set to any non negative integer
    timer = 60;

    //set variable to function for stop Quiz
    var stopTime = setInterval(function(){


        //if the timer runs out, runs final functions
        if (timer == 0) {  
            clearInterval(stopTime); 
            endGame();
        } else {
            timer--;
            document.getElementById("count").innerText = timer;
        }
        //once timer get below 11 the integer appears red to alert the user
        if (timer < 11) {
            document.getElementById("count").innerHTML = '<span id="count" style="color: red;">' + timer + '</span>';
        }
        return timeLeft--;
    }, 1000)

    //once timeLeft(and timer) are 0, break set interval function
    if (timeLeft === 0) {
        clearInterval(stopTime)
    }
};

//load a new question to appending on the page 
function newQuestion() {    
    //check if questions array is now empty. Run end game func if so 
    if (questions.length === 0) {
        timeLeft = 0;
        endGame();
    }

    //access html div for answers and empty it
    document.getElementById("answer-holder").innerHTML='';

    //create random index var so questions are randomized 
    var index = Math.floor(Math.random() * questions.length);
    // console.log(index);

    //access the questions object 
    var question = questions[index].question;

    //set a var to the array of answer options to iterate over
    var options = questions[index].options;

    //set var to the correct answer's letter assignment to compare against user's input
    var answerLetter = questions[index].answer;

    //remove answered question from the array
    questions.splice(index, 1);
  
    //set text on page to queation variable
    document.getElementById("question").innerText = question;

    //iterate over the options array     
    for (var j = 0; j < options.length; j++) {
        //create HTML button
        var button = document.createElement("button");
        //set button's class for styling
        button.className = "answer-btn";
        //set button text to iterate option text
        button.innerText = options[j];
        //append button to answer containing div 
        document.getElementById("answer-holder").appendChild(button);
    };
    //set outside answer var to correct answer of current question
    answer = answerLetter;
};

//function for checking User's answer and calculate score 
function checkAnswer(answer, userAnswer) {

    //if question array is empty, end the quiz 
    if (questions.length === 0) {
        endGame();
    }

    //compare user input with the correct answer. 
    if (answer === userAnswer) {
        //if answer is correct,set result text to 'Correct' and colored green
        document.getElementById('results').innerHTML = '<p id="results" style="color: green;">' + "CORRECT" + '</p>';
        //after 1 seconds removing the 'correct', clear the div content
        setTimeout(function() {
            document.getElementById('results').innerHTML = '';
        }, 1000);
        
        //add score with 20 points if the answer is correct
        score += 20;

        //append a new question to the screen
        newQuestion();
    } else {
        //if answer is wrong,display "WRONG!" and text been styled red
        document.getElementById('results').innerHTML = '<p id="results" style="color: red;">' + "WRONG!" + '</p>';

        setTimeout(function() {
            document.getElementById('results').innerHTML = '';
        }, 1000);

        //remove 5 seconds from timer as penalty 
        timer -= 5;
        
        //append new question to screen
        newQuestion();
    }
};

//stop quiz function for displaying score 
function endGame() {
    //access current timer text 
    var timeScore = document.getElementById("count").innerText;
    timer = 0;
    
    //change text of timeScore and score to integers, and calculate score 
    timeScore = parseInt(timeScore);
    score = parseInt(score);
    //Only correct answer at lease one question can be rewarded with an extra time Score.
    if(score>0){
        score += timeScore;
    } else if(score<=0){
        //if no question been answered correctly, finial score is '0'.
        score = score;
    }
    
    //access main container 
    var bigBox = document.getElementById('big-box');

    //clear div of content
    bigBox.innerHTML = "<h1 id='question' style='text-decoration: underline'> Score </h1>";

    //create score text 
    var scoreDisplay = document.createElement("h1");
    scoreDisplay.className = 'header-content';
    scoreDisplay.innerText = score;
    
    //create input field
    var usernameInput = document.createElement("div");
    usernameInput.innerHTML = "<h2>Please enter a name to record your score: <input id='scoreUsername'></input></h2>"
   

    //create submit button that will save info to local storage 
    var scoreSubmit = document.createElement("button");
    scoreSubmit.id = "scoreSubmit";
    scoreSubmit.innerText = 'Submit';
    scoreSubmit.className = "submit-btn";


    //append all to score container div 
    document.getElementById("big-box").appendChild(scoreDisplay);
    document.getElementById("big-box").appendChild(usernameInput);
    document.getElementById("big-box").appendChild(scoreSubmit);
};

function displayHighScores() {

    let logScores = JSON.parse(localStorage.getItem("yourScores"));

    var bigBox = document.getElementById('big-box');

    bigBox.innerHTML = '';
    
    bigBox.innerHTML = "<h1 id='question' style='text-decoration: underline'> HIGH SCORES </h1";

    for (var i = 0; i < logScores.length; i++) {

        var scoreDiv = document.createElement('h2');

        scoreDiv.innerText = logScores[i].userName + ': ' + logScores[i].Score; 
        bigBox.appendChild(scoreDiv);
    }

    var retryBtn = document.createElement('button');
    retryBtn.innerText = "Retry?"
    retryBtn.className = 'answer-btn';
    retryBtn.id = 'retry'
    bigBox.appendChild(retryBtn);
};
function displayYourScore() {

    let logScores = JSON.parse(localStorage.getItem("yourScores"));

    var bigBox = document.getElementById('big-box');

    bigBox.innerHTML = '';
    
    bigBox.innerHTML = "<h2 style='padding: 30px; text-decoration: underline;'> Your sumbition had been recorded, <br> please click &quot;View Highscores&quot; to check! </h2>";
 
    var retryBtn = document.createElement('button');
    retryBtn.innerText = "Retry?"
    retryBtn.className = 'answer-btn';
    retryBtn.id = 'retry'
    bigBox.appendChild(retryBtn);
};

//events and buttons
var highScoreBtn = document.getElementById('high-score');

highScoreBtn.addEventListener('click', displayHighScores);

//set variable to score display submit button and add event listener
document.addEventListener( "click", someListener);

//once username is submitted, high scores will be displayed
function someListener(event){
    var element = event.target;
    if(element.id === 'scoreSubmit'){
        var userName = document.getElementById("scoreUsername").value;

        let logScores = JSON.parse(localStorage.getItem("yourScores")) || [];

        console.log(logScores);

        var scoreObj = {'userName': userName, 'Score': score};

        logScores.push(scoreObj);

        localStorage.setItem("yourScores", JSON.stringify(logScores))

        displayYourScore();
    }

    if(element.id === 'retry'){
        window.location.reload()
    }
};

//access answer option container div
var answerHolder = document.getElementById("answer-holder");

//on click, retrieves user answer and runs checkAnswer function
answerHolder.addEventListener('click', function() {
    //access text of user chosen option 
    var textAnswer = event.target.innerHTML;  
    //set variable to first letter of option (a, b, c, or d)
    var userAnswer = textAnswer[0];
    //run answer checking function\
    checkAnswer(answer, userAnswer);
});