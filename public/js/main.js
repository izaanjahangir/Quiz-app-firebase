
// Start quiz, take parameter container name of quiz
// Decide if the user already take the quiz or not
function startQuiz(name){
    var questions;
    var quizName = name;
    var loader = document.getElementById('loader');
    loader.style.display = 'block';

    quizName = name;
    
    // if user haven't taken the quiz, fetch questions
    // else fetch scores
    database.ref(`scores/${userInfo.uid}/${quizName}`).once('value')
        .then((data)=>{
            data=data.val();
            if(data){
                localStorage.setItem('score',data.score);
                localStorage.setItem('resultQuizName',quizName);
                window.location.assign('result.html');
            }
            else{
                fetchQuiz(quizName);
            }
        })
}


// Shows the result, if quiz is completed fetch scores from local storage and render
// else render quiz is not completed
function showResult(){
    var scoreBoard = document.getElementById('scoreboard');
    var quizName = localStorage.getItem('resultQuizName');
    var quizTitle = document.getElementById('quiz-title');
    quizTitle.innerText = quizName;
    // if(JSON.parse(localStorage.getItem('questions')).length <= 0){
    //     var score = localStorage.getItem('score');
    //     scoreBoard.innerText = `Your score: ${score}`;
    // }else{
    //     scoreBoard.innerText = 'Quiz is not completed yet';
    // }
    if(localStorage.getItem('score')){
        var score = localStorage.getItem('score');
        scoreBoard.innerText = `Your score: ${score}`;
    }else{
        scoreBoard.innerText = 'Quiz is not completed yet';        
    }
}

// if quiz is not completed, show the user about the quiz on the main page
function loadMainPage(){
    var outputEl = document.getElementById('output');
    // if(JSON.parse(localStorage.getItem('questions')).length > 0){
    //     outputEl.style.display = 'block';                     
    // }

    if(localStorage.getItem('isDone') === 'false'){
        outputEl.style.display = 'block';                             
    }


}


// Fetch the quiz from firebase
function fetchQuiz(quizName){

    // fetch questions and save everything in the local storage
    database.ref(`Quiz/${quizName}`).once('value')
        .then((snapshot)=>{
            questions = snapshot.val();
            localStorage.setItem('quizName',quizName);
            localStorage.setItem('resultQuizName',quizName);
            localStorage.setItem('questions',JSON.stringify(questions));
            localStorage.setItem('score',0)
            localStorage.setItem('isDone',false)
            localStorage.setItem('questionDone',0)
            window.location.assign('quiz.html');
        
        })
        .catch((err)=>{
            console.log(err);
        });
}

function retakeQuiz(){
    var quizName = localStorage.getItem('resultQuizName')
    database.ref(`scores/${userInfo.uid}/${quizName}`).remove();
    fetchQuiz(quizName);
}
