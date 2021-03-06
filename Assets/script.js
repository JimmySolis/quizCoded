let question = [
    {
        question: 'What is the fastest car?',
        answers: [
            {option: "TESLA" , correct: false},
            {option: "FERARRI" , correct: false},
            {option: "LAMBORGINI" , correct: false},
            {option: "BULGATTI" , correct: true}
        ]
    },
    {
        question: 'What is the most expensive car?',
        answers: [
            {option: "TESLA" , correct: false},
            {option: "FERARRI" , correct: false},
            {option: "LAMBORGINI" , correct: false},
            {option: "BULGATTI" , correct: true}
        ]
    },
    {
        question: 'Which car is all Electric?',
        answers: [
            {option: "TESLA" , correct: true},
            {option: "FERARRI" , correct: false},
            {option: "LAMBORGINI" , correct: false},
            {option: "BULGATTI" , correct: false}
        ]
    },
    {
        question: 'Which car is American?',
        answers: [
            {option: "TESLA" , correct: true},
            {option: "FERARRI" , correct: false},
            {option: "LAMBORGINI" , correct: false},
            {option: "BULGATTI" , correct: false}
        ]
    },
    {
        question: 'Which car is had the most f1 titles?',
        answers: [
            {option: "TESLA" , correct: false},
            {option: "FERARRI" , correct: true},
            {option: "LAMBORGINI" , correct: false},
            {option: "BULGATTI" , correct: false}
        ]
    },
    {
        question: 'Which car logo has a Bull?',
        answers: [
            {option: "TESLA" , correct: false},
            {option: "FERARRI" , correct: false},
            {option: "LAMBORGINI" , correct: true},
            {option: "BULGATTI" , correct: false}
        ]
    },
    {
        question: 'Finish the movie title: Ford vs _______?',
        answers: [
            {option: "TESLA" , correct: false},
            {option: "FERARRI" , correct: true},
            {option: "LAMBORGINI" , correct: false},
            {option: "BULGATTI" , correct: false}
        ]
    },
    
]

const startButton = document.getElementById('startButton')
const nextButton  = document.getElementById('nextButton')
const doneButton  = document.getElementById('doneButton')
const timer       = document.getElementById('timer')
const scoreTracker = document.getElementById('scoreTracker')
const questionsContainerEl = document.getElementById('question-container')
const questionElement = document.getElementById('questions')
const answersButton = document.getElementById('answer-buttons')
const finalScore = document.getElementById('finalScore')
const inputIni = document.getElementById('initials')
const listLeaderborad = document.getElementById('highscore')
const head = document.getElementById('head')

let shuffelQuestion, currentQuestionIndex, currentScore;

var pledding = false;





let secondsLeft = 5 * question.length;


startButton.addEventListener('click', startQuiz)
doneButton.addEventListener('click', endQuiz)

nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    randomQuestion();
    
})

function startQuiz(){
      startButton.classList.add('hide');
      shuffelQuestion = question.sort(() => Math.random() - .5)
      currentQuestionIndex = 0 ;
      currentScore = 0;
      nextButton.classList.remove('hide');
      questionsContainerEl.classList.remove('hide');
      timer.classList.remove('hide')
      scoreTracker.classList.remove('hide')
      head.classList.add('hide');
      
      randomQuestion();
      startTimer();
}

function startTimer(){

var timeInterval =  setInterval(function() {
            
    secondsLeft--;
          
    timer.innerHTML = `Timer : ${secondsLeft}`;
    if(secondsLeft <= 0){
        clearInterval(timeInterval)
        endQuiz();
        console.log("1 from StartTimer")
       }else if (pledding){
        clearInterval(timeInterval)
        endQuiz();
        console.log("2 from StartTimer")
       }else{
        console.log("3 from StartTimer")
       }
    },1000)}


function randomQuestion(){
    restartState();
    showQuestion(shuffelQuestion[currentQuestionIndex]);
}


function showQuestion(question){
    questionElement.innerText = question.question; 
    question.answers.forEach(answers => {
    const button = document.createElement('button')
    button.innerHTML = answers.option
    button.classList.add('btn')
    if(answers.correct){
        button.dataset.correct = answers.correct;
    }
    button.addEventListener('click', selectAnswer)
    answersButton.append(button);
    })

}

function restartState(){
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while(answersButton.firstChild){
        answersButton.removeChild(answersButton.firstChild)

    }

}

function selectAnswer(e){
    const selecetedButton = e.target
    const correct = selecetedButton.dataset.correct
     setStatusClass(document.body, correct)
    Array.from(answersButton.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffelQuestion.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide')
    } else {
        doneButton.classList.remove('hide')
    }

    shuffelQuestion[currentQuestionIndex].answers.forEach(answer => {
        if (selecetedButton.innerText === answer.option) {
            if (answer.correct) {
                secondsLeft += 5;
                currentScore += 5;
                scoreTracker.innerHTML = `Socre : ${currentScore}`;
            } else {
                secondsLeft -= 5;
                currentScore -= 5;
                scoreTracker.innerHTML = `Score : ${currentScore}`;
                if (secondsLeft < 0) {
                    secondsLeft = 0;
                }
                
            }
        }
    })
}


function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
    }else{
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}


function endQuiz(){
    pledding = true;
    console.log("Quiz done!");
    timer.innerHTML = ` Time ${secondsLeft}`;
    inputIni.classList.remove('hide');
    listLeaderborad.classList.remove('hide');
    doneButton.classList.add('hide');
    nextButton.classList.add('hide');
    timer.classList.remove('time');
    timer.classList.add('endTimer');
    scoreTracker.classList.remove('scoreTrac');
    scoreTracker.classList.add('endScoreTrac');
    questionsContainerEl.classList.add('hide'); 
    head.classList.remove('hide');  
   

}

inputIni.addEventListener('change', scores)

function scores(){
    localStorage.setItem( `${inputIni.value}`, currentScore);
}

function pullScores(){
    for (let i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i)
        var value = localStorage[key];
        console.log(key)
    var leaderborad = document.createElement('li');
    leaderborad.innerHTML = `${key}  |  ${value} `;
    listLeaderborad.append(leaderborad);

    }    
}


pullScores();
