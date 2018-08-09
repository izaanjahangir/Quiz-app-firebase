var quizTitleEl = document.getElementById('quiz-title');
var quizName = localStorage.getItem('quizName');
var questions = JSON.parse(localStorage.getItem('questions'));
var quizContainerEl = document.getElementById('quiz-container');
var rand;
var score = 0;
var questionDone = localStorage.getItem('questionDone');
var userSelected;
var progress = document.getElementById('progress');
var loader = document.getElementById('loader');
progress.style.width = questionDone + '%';



// Render quiz title on DOM & fetch scores from local storage
// This function will run when the body loads
window.addEventListener('load',()=>{
    quizTitleEl.innerText = quizName;

    if(localStorage.getItem('score') !== null){
        score = localStorage.getItem('score');
    }

    loadQuestion();
});



// Each time render random question on DOM
// This function will run when next question button is pressed
function loadQuestion(){
    rand = Math.floor(Math.random()*questions.length);
    var choices = '';


    // Iteration to generate choices elements
    questions[rand].choice.forEach(el => {
        choices += `
            <li class="choice" onClick="selectOption(this)">${el}</li>
        `
    })

    // Render question and choices on DOM
    quizContainerEl.innerHTML = `
            <div id="question">${questions[rand].question}</div>
            <ul id="choice-list">${choices}</ul>
            <button class="btn" id="btn-next" onClick="nextQuestion()">Next Question</button>
    `
    
}


// enable user to select choice
function selectOption(el){
    var choiceEl = document.querySelectorAll('.choice');
    for(var i = 0; i < choiceEl.length; i++){
        choiceEl[i].style.background = 'none'; 
    }
    el.style.backgroundColor = "rgba(120, 224, 143,1.0)";
    userSelected = el.innerText;
}



// render next question
// if no question left, generate the result
function nextQuestion(){

    if(questions[rand].correct === userSelected){
        score++;
    }
    questions.splice(rand,1);
    questionDone = parseInt(questionDone) + 10;
    progress.style.width = parseInt(questionDone) + '%';
    localStorage.setItem('questions',JSON.stringify(questions));
    localStorage.setItem('score',score);
    localStorage.setItem('questionDone',questionDone);


    if(questions.length < 1){
        loader.style.display = 'block';
        score = ((score/10)*100) + '%';
        localStorage.setItem('score',score);
        localStorage.setItem('isDone',true)
        database.ref(`scores/${userInfo.uid}/${quizName}`).set({score:score});      
        window.location.assign('result.html');
        return false;
    }
    loadQuestion();
}
