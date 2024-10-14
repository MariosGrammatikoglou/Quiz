const listOfQuestionsAnswers = [ 
    {
        question:"Which agent has the ability: Annihilation ?",
        answers: [
            {text:"Iso",correct:false},
            {text:"Sova",correct:false},
            {text:"Gekko",correct:false},
            {text:"Deadlock",correct:true},
        ]
    },
    {
        question:"How much is the outlaw weapon ?",
        answers: [
            {text:"2200",correct:false},
            {text:"2300",correct:false},
            {text:"2400",correct:true},
            {text:"2500",correct:false},
        ]
    },
    {
        question:"Which one is Killjoy's voiceline ?",
        answers: [
            {text:"Fish in a barrel",correct:true},
            {text:"Get out of my way",correct:false},
            {text:"Resuming your termination",correct:false},
            {text:"I know exactly where you are",correct:false},
        ]
    },
    {
        question:"Which agent can't self-heal ?",
        answers: [
            {text:"Skye",correct:true},
            {text:"Sage",correct:false},
            {text:"Reyna",correct:false},
            {text:"Phoenix",correct:false},
        ]
    },
    {
        question:"Which agent country origin is Morocco ?",
        answers: [
            {text:"Raze",correct:false},
            {text:"Astra",correct:false},
            {text:"Breach",correct:false},
            {text:"Cypher",correct:true},
        ]
    },
    {
        question:"What counts as a thrifty round ?",
        answers: [
            {text:"Each player kills one enemy",correct:false},
            {text:"Round lasted less than 1 minute",correct:false},
            {text:"Team spent less credits than opponents",correct:true},
            {text:"Team won the round without anyone dying",correct:false},
        ]
    },
    {
        question:"How much credits do you get for planting spike ?",
        answers: [
            {text:"200",correct:false},
            {text:"300",correct:true},
            {text:"400",correct:false},
            {text:"500",correct:false},
        ]
    },
    {
        question:"Winning a round gives:",
        answers: [
            {text:"2500 credits to each player on your team",correct:false},
            {text:"2800 credits to each player on your team",correct:false},
            {text:"3000 credits to each player on your team",correct:true},
            {text:"3200 credits to each player on your team",correct:false},
        ]
    },
    {
        question:"How much do you earn for a single kill ?",
        answers: [
            {text:"100",correct:false},
            {text:"150",correct:false},
            {text:"200",correct:true},
            {text:"250",correct:false},
        ]
    },
    {
        question:"Who was the first Valorant agent to be created?",
        answers: [
            {text:"Jett",correct:false},
            {text:"Sage",correct:false},
            {text:"Cypher",correct:false},
            {text:"Phoenix",correct:true},
        ]
    }
]

const questionElement=document.getElementById("questionArea");
const answersArea=document.getElementById("buttonArea");
const nextButtonElement=document.getElementById("nextButton");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButtonElement.style.width="70px";
    nextButtonElement.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetData();
    let currentQuestion=listOfQuestionsAnswers[currentQuestionIndex];
    let numberOfQuestion=currentQuestionIndex +1;
    questionElement.innerHTML=numberOfQuestion +". " +currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML=answer.text ;
        button.classList.add("answerBtn");
        answersArea.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click", selectedButton);
    });
}



function resetData(){
    while(answersArea.firstChild){
        answersArea.removeChild(answersArea.firstChild);
    }
    nextButtonElement.style.display="none"; 
}

function selectedButton(e){
    const selectedButton=e.target;
    const isCorrect=selectedButton.dataset.correct==="true";
    if(isCorrect){
        selectedButton.classList.add("correctAnswer");
        score++;
    }else{
        selectedButton.classList.add("incorrectAnswer");
    }

    Array.from(answersArea.children).forEach(button => {
        if(button.dataset.correct==="true"){
            button.classList.add("correctAnswer");
        }
        button.disabled=true;
    });
    nextButtonElement.style.display="block";
}

nextButtonElement.addEventListener("click", ()=>{
    if(currentQuestionIndex<listOfQuestionsAnswers.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<listOfQuestionsAnswers.length){
        showQuestion();
    }else{
        showScore();
    }
}

function showScore(){
    resetData();
    questionElement.innerHTML=`You scored ${score} out of ${listOfQuestionsAnswers.length}!`;
    nextButtonElement.innerHTML="Play Again";
    nextButtonElement.style.display="block";
}

startQuiz();