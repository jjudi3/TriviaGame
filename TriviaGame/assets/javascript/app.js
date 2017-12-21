

var curPage = 0,
    correct = 0;
var myAnswers = [];
var myQuiz = [
    ["Who wrote Gone with the Wind?", 1, "Margaret Mitchell", "Mary Kay Andrews", "Pat Conroy", "Melissa Fay Green"],
    ["How many streets have the name Peachtree in Atlanta Metro area?", 2, '2l','55', '42', '11'],
    ["What other cities in Georgia were the capital prior to Atlanta?", 3, "Valdosta", "Conyers", " Augusta", "Athens"], 
    ["What popular location sells more Coca-Cola than anywhere else in the world?",  1, "the Varsity", "The World of Coke", "the Aquarium", "The Atlanta Zoo"]
];
var myHeader = document.getElementById("quizHeader");
var classname = document.getElementsByClassName("answer");
var myQuestion = document.getElementById("questions");
var progressBar = document.getElementById("progressBar");
var btnNext = document.getElementById("btnNext");
var btnPrevious = document.getElementById("btnPrevious");
var btnFinish = document.getElementById("finishQuiz");
checkPage();


var audio = new Audio("assets/audio/angels.mp3");
setTimeout(tenSeconds, 1000 * 10);
function tenSeconds() {

  // in the element with an id of time-left add an h2 saying About 5 Seconds Left!
  // console log 5 seconds left
  $("#time-left").append("<h3>About 5 Seconds Left!</h3>");
  console.log("5 seconds left");
}

function timeUp() {
    console.log("done");
  $("#time-left").append("<h1>Time's Up!</h1>");
  console.log("time is up");

  //  The following line will play the audio file we linked to above:
  audio.play();
}


btnNext.addEventListener("click", moveNext);
btnPrevious.addEventListener("click", moveBack);
btnFinish.addEventListener("click", endQuiz);
for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', myAnswer, false);
}

function myAnswer() {
    var idAnswer = this.getAttribute("data-id");
    /// check for correct answer
    myAnswers[curPage] = idAnswer;
    if (myQuiz[curPage][1] == idAnswer) {
        console.log('Correct Answer');
    } else {
        console.log('Wrong Answer');
    }
    addBox();
}

function addBox() {
    for (var i = 0; i < myQuestion.children.length; i++) {
        var curNode = myQuestion.children[i];
        if (myAnswers[curPage] == (i + 1)) {
            curNode.classList.add("selAnswer");
        } else {
            curNode.classList.remove("selAnswer");
        }
    }
}

function moveNext() {
    ///check if an answer has been made
    if (myAnswers[curPage]) {
        console.log('okay to proceed');
        if (curPage < (myQuiz.length - 1)) {
            curPage++;
            checkPage(curPage);
        } else {
            ///check if quiz is completed
           console.log(curPage + ' ' + myQuiz.length);
            if (myQuiz.length >= curPage) {
                endQuiz();
            } else {
                //console.log('end of quiz Page ' + curPage);
            }
        }
    } else {
        console.log('not answered');
    }
}

function endQuiz() {
    if (myAnswers[2]) {
        var output = "<div class='output'>Quiz Results<BR>";
        var questionResult = "NA";
        console.log('Quiz Over');
        for (var i = 0; i < myAnswers.length; i++) {
            if (myQuiz[i][1] == myAnswers[i]) {
                questionResult = '<span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>';
                correct++;
            } else {
                questionResult = '<span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>';
            }
            output = output + '<p>Question ' + (i + 1) + ' ' + questionResult + '</p> ';
        }
        output = output + '<p>You scored ' + correct + ' out of ' + myQuiz.length + '</p></div> ';
        document.getElementById("quizContent").innerHTML = output;
    } else {
        console.log('not answered');
    }
}

function checkPage(i) {
    /// add remove disabled buttons if there are no more questions in que
    if (curPage == 0) {
        btnPrevious.classList.add("hide");
    } else {
        btnPrevious.classList.remove("hide");
    }
    if ((curPage + 1) < (myQuiz.length)) {
        btnNext.classList.remove("hide");
    } else {
        btnNext.classList.add("hide");
        btnFinish.classList.remove("hide");
    }
    myHeader.innerHTML = myQuiz[curPage][0];
    for (var i = 0; i < myQuestion.children.length; i++) {
        var curNode = myQuestion.children[i];
        curNode.childNodes[1].innerHTML = capitalise(myQuiz[curPage][(i + 2)]);
        //check if answered already
        if (myAnswers[curPage] == (i + 1)) {
            curNode.classList.add("selAnswer");
        } else {
            curNode.classList.remove("selAnswer");
        }
    }
    ///update progress bar
    var increment = Math.ceil((curPage) / (myQuiz.length) * 100);
    progressBar.style.width = (increment) + '%';
    progressBar.innerHTML = (increment) + '%';
}

function moveBack() {
    if (curPage > 0) {
        curPage--;
        checkPage(curPage);
    } else {
        //console.log('end of quiz Page ' + curPage);
    }
}

function capitalise(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}
