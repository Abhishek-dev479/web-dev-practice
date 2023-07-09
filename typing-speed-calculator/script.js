let dataArray = [
    "Means of dismissal include being bowled, when the ball hits the stumps and dislodges the bails, and by the fielding side either catching the ball after it is hit by the bat, but before it hits the ground, or hitting a wicket with the ball before a batter can cross the crease in front of the wicket. When ten batters have been dismissed, the innings ends and the teams swap roles. The game is adjudicated by two umpires, aided by a third umpire and match referee in international matches.",
    "The first Best Actor awarded was Emil Jannings, for his performances in The Last Command and The Way of All Flesh. He had to return to Europe before the ceremony, so the Academy agreed to give him the prize earlier; this made him the first Academy Award winner in history. At that time, winners were recognized for the entirety of their work done in a certain category during the qualifying period, for example, Jannings received the award for two movies in which he starred.",
    "Information is an abstract concept that refers to that which has the power to inform. At the most fundamental level, information pertains to the interpretation (perhaps formally) of that which may be sensed, or their abstractions. Any natural process that is not completely random and any observable pattern in any medium can be said to convey some amount of information. Whereas digital signals and other data use discrete signs to convey information, other phenomena.",
    "In 1947, Cho Hong-jai, the Hyosung group's founder, jointly invested in a new company called Samsung Mulsan Gongsa, or the Samsung Trading Corporation, with the Samsung's founder Lee Byung-chul. The trading firm grew to become the present-day Samsung C&T Corporation. After a few years, Cho and Lee separated due to differences in management style. Cho wanted a 30 equity share. Samsung Group was separated into Samsung Group and Hyosung Group, Hankook Tire and other businesses"
]
let info = dataArray[Math.floor(Math.random()*dataArray.length)];
info = info.toLowerCase();
console.log(info);
let arr = info.split(' ');
let enter = document.getElementById('enter');
let stopTimer;
let enterPress = false; 
let timer =  parseInt(sessionStorage.getItem('time')) || 60;
updateTimer(timer);

let setTimer = document.getElementsByClassName('setTimer');

Array.from(setTimer).forEach((e, i) => {
    if((timer == 30 && i == 0) || (timer == 60 && i == 1) || (timer == 120 && i == 2)){
        e.style.backgroundColor = 'rgb(240, 240, 6)';
    } 
    e.addEventListener('click', function(event){
        // if(timerStart) return;
        if(i == 0) timer = 30;
        else if(i == 1) timer = 60;
        else{
            timer = 120;
        }
        // Save the variable value to sessionStorage
        sessionStorage.setItem('time', timer); 
        
        location.reload(true);
    })
})

function startTyping(event){
    if(event.key == 'Enter' && !enterPress){
        window.addEventListener('keydown', check);
        enter.style.visibility = 'hidden';
        console.log('hello');
        let time = timer;
        stopTimer = setInterval(function(){
            time--;
            updateTimer(time);
        }, 1000);
        setTimeout(function(){
            console.log('heyfajfa;fa');
            window.removeEventListener('keydown', check);
            clearInterval(stopTimer);
        }, 1000*(timer+1))
        enterPress = true;
    }   
}

function updateTimer(time){
    let timeElement = document.getElementById('timer');
    timeElement.innerHTML = `<h1>${time}</h1>`;
}

function loadData(){
    let dataBox = document.getElementById('data');
    info = info.toLowerCase();
    for(i=0; i<info.length; i++){
        let span = document.createElement('span');
        span.innerHTML = info.charAt(i);
        span.classList.add('char');
        dataBox.appendChild(span);
    }
}

function updateWordCount(wordCount){
    let count = document.getElementById('count');
    count.innerHTML = `<h1>${wordCount}</h1>`;
}

function updateCharacterCount(noOfCharacters){
    let char = document.getElementById('char');
    char.innerHTML = `<h1>${noOfCharacters}</h1>`
}

function updateAccuracy(correct, total){
    let accuracy = document.getElementById('accuracy');
    let acc = Math.round((correct/total)*100);
    accuracy.innerHTML = `<h1>${acc}%</h1>`
}

let wordCount = 0;
let characterCount = 0;
let index = -1;
let noOfCharacters = -1;
let words = 0;
let s = '';
let correct = true;
let letters = document.getElementsByClassName('char');

function handleSpace(){
    let temp = (noOfCharacters - index) + arr[words].length;
        if(correct && index >= arr[words].length-1) wordCount++;
        else{
            for(k=noOfCharacters+1; k<temp; k++){
                letters[k].style.textDecoration = 'underline';
                letters[k].style.textDecorationColor = 'red';
            }
        }
        noOfCharacters = temp;
        index = -1;
        words++;
        s = '';
        updateWordCount(wordCount);
        updateAccuracy(wordCount, words);
        correct = true;
}

function handleBackspace(){
    if(index >= 0){
        letters[noOfCharacters].classList.remove('correct');
        letters[noOfCharacters].classList.remove('wrong');
        if(s.substring(0, index) == arr[words].substring(0, index)){
            correct = true;
        }
        s = s.substring(0, index);
        index--;
        noOfCharacters--;
    }
}

function handleOtherkeys(event){
    if(index >= arr[words].length-1) return;
    index++;
    noOfCharacters++;
    s = s + event.key;
    if(event.key == arr[words].charAt(index)){
        letters[noOfCharacters].classList.add('correct');
        characterCount++;
    }
    else{
        if(event.key != ' '){
            letters[noOfCharacters].classList.add('wrong');
            correct = false;
        }
    }
}

function check(event){
    if(event.key == 'Enter') return;
    updateCharacterCount(characterCount);
    if(event.key == ' '){
        handleSpace()
        return;
    }
    if(event.key == 'Backspace'){
        handleBackspace();
    }
    else{
        handleOtherkeys(event);
    }
}

window.onload = () => {
    window.addEventListener('keypress', startTyping);
    loadData();
}





